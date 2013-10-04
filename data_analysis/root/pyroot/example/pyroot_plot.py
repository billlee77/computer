#!/usr/bin/python

from ROOT import gROOT, TCanvas, TF1, TGraph, TH1F

# # Read file Method
# 
# #******************************************************
# 
# # Method 1 whole read
# #with open('data.dat', 'r') as f:
# with open('data.dat', 'r') as f:
#     read_data = f.read()
# f.closed
# print read_data
# 
# # Method 2 whole read
# f = open('data.dat', 'r')
# read_data = f.read()
# print read_data
# f.closed
# 
# #******************************************************
# 
# # Method 3 line read
# f = open('data.dat', 'r')
# data1 = f.readline()
# print data1
# f.closed

#print "Method 4!!!!!!!!!!!!!!!!!!!!!!!!!"

import numpy


try:
	# Method 4 line read
	x = numpy.ndarray([5.])
	y = numpy.ndarray([5.])
	e=0

	f = open('data.dat', 'r')
	for data2 in f:
	
#		print e
# 

# Output 3rd line of the file

# 		if e == 3:
# 			print data2,			
# 		else:
# 			pass
	
		# print data2,
		num = data2.split()

		print num

#		print num[0], num[1]
		a = float(num[0])
		b = float(num[1])
# 		x.append(a)
# 		y.append(b)

		print a
		print b

		x[e] = a
		y[e] = b
		e = e+1 	
	f.closed

except IndexError, z:
	pass

print x
print y

# import sys
# sys.exit()

# # # ROOT plot 
c1 = TCanvas( 'c1', 'Example with Formula', 200, 10, 700, 500 )


gr1=TGraph(e+1, x, y)
gr1.Draw("AP")


