#!/usr/bin/python

from ROOT import TCanvas

# Read file Method

#******************************************************

# Method 1 whole read
#with open('data.dat', 'r') as f:
with open('data.dat', 'r') as f:
    read_data = f.read()
f.closed
print read_data

# Method 2 whole read
f = open('data.dat', 'r')
read_data = f.read()
print read_data
f.closed

#******************************************************

# Method 3 line read
f = open('data.dat', 'r')
data1 = f.readline()
print data1
f.closed

#print "Method 4!!!!!!!!!!!!!!!!!!!!!!!!!"

try:
	# Method 4 line read
	x = []
	y = []
	f = open('data.dat', 'r')
	for data2 in f:
		# print data2,
		num = data2.split()
#		print num[0], num[1]
		a = float(num[0])
		b = float(num[1])
		x.append(a)
		y.append(b)
	f.closed

except IndexError, e:
	pass

# print 'asdasdasdas'


#********************************************
#Array represantation

for l in range(0, 5, 1):
	print x[l],'  ',  y[l]


for l in x, y:
	print l
	
	c= 0 
for l in x: 
	print l
	c= c + l

print c
# Method 


#read_date = f.readlines()

