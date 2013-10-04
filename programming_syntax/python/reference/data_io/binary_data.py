#!/usr/bin/python
myfile = open("testit.txt", "wb")
for c in range(50, 70):
	print c
	myfile.write(chr(c))
myfile.close()
myfile = open("testit.txt")

print myfile.read()
myfile.close()

