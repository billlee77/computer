#!/usr/bin/python

import numpy, sys

try:

	coor_x = []
	coor_y = []
	
	coor_out = open("coordinate.dat")
	data_out = open("radius.dat")

	coor_x = coor_out.readline().split()
	coor_y = coor_out.readline().split()

	print len(coor_x), len(coor_y)

	raw_data = [[0 for col in range(len(coor_x))] for row in range(len(coor_y))]

#	print coor_x
#	print coor_y	
#	print raw_data
#	for line in data_out:
#	num = line.split()


#	for i in range(3):
#		raw_data[1][i] = i

	r = 0 
	
	for line in data_out:
		num = line.split()
		for i in range(len(num)):
# 			print i
			raw_data[r][i]=num[i]
		r=r+1
	
#		print line
	

	coor_out.closed	
	data_out.closed	

	print coor_x	
	print coor_y	
	for row in raw_data:
		print row

except IndexError, e:
	pass

print type(coor_x), type(coor_y), type(raw_data)

x=numpy.array(coor_x)
y=numpy.array(coor_y)
depth=numpy.array(raw_data)

print x, y, depth 
print type(x), type(y), type(depth)





