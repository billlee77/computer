#!/usr/bin/python

#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# This program is written to visualize the radius measurement using 
# milling machine and dia indicator.
#
# Program using ROOT to perform 2D plot, and compare with theoritical 
# pridiction of a perfect sphere
#
# Note that the plotted image is the mirror reflection at xy plane
#
# Author: Wenliang(Bill) Li
# Date  : 17/01/2011
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

from numpy import *
from ROOT import TCanvas, TGraph2D, gStyle, TF2, TPad, TFitResult
from math import *
import numpy, sys, math


# Data read in
try:

	coor_x = []
	coor_y = []
	
	coor_out = open("coordinate.dat")
	data_out = open("radius.dat")

# Read in x, y coordinate from file
	read_x = coor_out.readline().split()
	read_y = coor_out.readline().split()

# Data convert list type from string list to float list
	coor_x = [float(b) for b in read_x]
	coor_y = [float(b) for b in read_y]

#   print len(coor_x), len(coor_y)

# Create 2D list 
	raw_data = [[0 for col in range(len(coor_x))] for row in range(len(coor_y))]

#	print coor_x
#	print coor_y	
#	print raw_data
#	for line in data_out:
#	num = line.split()


#	for i in range(3):
#		raw_data[1][i] = i

# Read in the radius measurement
	r = 0 	
	for line in data_out:
		num = line.split()
		for i in range(len(num)):
# 			print i
			raw_data[r][i]=float(num[i])
		r=r+1
	
#		print line
	
	coor_out.closed	
	data_out.closed	

except IndexError, e:
	pass

# print type(coor_x), type(coor_y), type(raw_data)

x1 = numpy.array(coor_x)
y1 = numpy.array(coor_y)
depth1 = numpy.array(raw_data)

#print type(dat_x)

#print type(x1), type(x1[0])
x2 = x1+1

arr_x = (x1 + 8.34)*2.54
arr_y = y1*2.54
#depth = ((depth1 + 92)/1000)*2.54 +0.32
depth = ((depth1 + 92)/1000)*2.54
 
#print arr_y


print coor_x	
print coor_y	
for row in depth:
	print row

#sys.exit() 

c1 = TCanvas('c1', '2D Plot for Test Mirror ', 1400,1000)
c1.Divide(1,3)

gr1 = TGraph2D()
gr2 = TGraph2D()
gr3 = TGraph2D()

gr1.SetTitle("Real Measurement")
#gr1.GetXaxis().SetTitle("y")

gr2.SetTitle("Theoritical Prediction")
gr3.SetTitle("Difference")

#gr1.SetPoint(1,1,1,1)
#gr1.SetPoint(2,2,2,2)

#print arr_x[0]

# #print depth
# #print len(coor_x), len(coor_y), len(depth[0])


# Plot the measured radius
c1.cd(1)
n=0
for i in range(len(coor_y)):
	for r in range(len(coor_x)):
#  		x = (x1[i]+8.34)*2.54
#  		y = y1[r]*2.54

		x =arr_x[r] 
		y =arr_y[i] 
		z = float(depth[i][r])
#		z = 1
#		print n, x, y, z
#		print type(n), type(x), type(y), type(z)
		gr1.SetPoint(n, x, y, z)
		n = n+1

gStyle.SetPalette(1)
gr1.Draw("surf1")
print gr1.GetXaxis()

gr1.GetXaxis().SetTitle("x")
gr1.GetYaxis().SetTitle("y")
gr1.GetZaxis().SetTitle("Height")
gr1.GetXaxis().CenterTitle()
gr1.GetYaxis().CenterTitle()
gr1.GetZaxis().CenterTitle()

gr2.SetTitle("Theoritical Prediction")
gr3.SetTitle("Difference")

#gr1.SetPoint(1,1,1,1)
#gr1.SetPoint(2,2,2,2)

#print arr_x[0]

# #print depth
# #print len(coor_x), len(coor_y), len(depth[0])


# Plot the measured radius
c1.cd(1)
n=0
for i in range(len(coor_y)):
	for r in range(len(coor_x)):
#  		x = (x1[i]+8.34)*2.54
#  		y = y1[r]*2.54

		x =arr_x[r] 
		y =arr_y[i] 
		z = float(depth[i][r])
#		z = 1

#gr1.Draw("surf4")
c1.Update()
# gr1.GetXaxis().SetTitle("x")
# gr1.GetXa
# gr1.GetYaxis().SetTitle("y")
# c1.Update()
# 
# Fit
#fun1 = TF2( 'fun1', 'sqrt([0]**2 - x**2 - y**1) - sqrt([0]**2 - [1]**2 - x**2)', 0, 2000 )


# Set data and plot the theoritical prediction and difference 
c1.cd(2)
n=0
r=40
totol_diff=0


f1 = TF2("f1", "(sqrt([0]**2 - x**2 -y**2)-[1])*2.54", -100, 100, -100, 100)
d = sqrt(40**2 -7.8945**2 - 8.34**2)
f1.SetParameter(0, 40)
f1.SetParameter(1, d)


for i in range(len(coor_y)):
	for r in range(len(coor_x)):
#  		x = (x1[i]+8.34)*2.54
#  		y = y1[r]*2.54

		xx = arr_x[r]
		x  = x1[r]
		yy = arr_y[i]
		y  = (y1[i] - 7.8945)
#		z = float(depth[r][i])
#		z = 1
#		print type(n), type(x), type(y), type(z)
#		value=2 *sqrt(1600 - 7.8945**2 - 8.34**2)
#		value=2*  sqrt(1600 - 8.34**2)
#		z1 = (sqrt(1600 - x**2 - y**2)+sqrt(1600 - x**2)-value) *2.54


# The theoritical equation for the points height on the surface is h = sqrt(r**2# - x**2 - y**2) - d)  

#		d = sqrt(40**2 -7.8945**2 - 8.34**2 )
#		z1 = (sqrt(40**2 - y**2 -x**2) - d)*2.54

		z1 = f1.Eval(x,y)
		z2 = float(depth[i][r])
		z3 = z1 - z2
#		print n, xx, yy, z1 ,z2 , z3

		totol_diff = totol_diff + z3	

		gr2.SetPoint(n, xx, yy, z1)
		gr3.SetPoint(n, xx, yy, z3)
		n = n+1


mean_diff = totol_diff / n

#print mean_diff, totol_diff, n 

print "The average difference between theoritical prediction is :", mean_diff, "cm"
gr2.Draw("surf1")
c1.Update()

gr2.GetXaxis().SetTitle("x")
gr2.GetYaxis().SetTitle("y")
gr2.GetZaxis().SetTitle("Height")
gr2.GetXaxis().CenterTitle()
gr2.GetYaxis().CenterTitle()
gr2.GetZaxis().CenterTitle()

c1.cd(3)
gr3.Draw("surf1")

gr3.GetXaxis().SetTitle("x")
gr3.GetYaxis().SetTitle("y")
gr3.GetZaxis().SetTitle("Height")
gr3.GetXaxis().CenterTitle()
gr3.GetYaxis().CenterTitle()
gr3.GetZaxis().CenterTitle()

c1.Update()
c1.cd()

gr1.Fit("f1","S")

chi2 = f1.GetChisquare()
ndf = f1.GetNDF()
print chi2/ndf
# print f2.GetParameter(0)
# print f2.GetParameter(1)
# at=fun1.GetChisquare()
# ndf=fun1.GetNDF()
# 
# print at, ndf
# 

