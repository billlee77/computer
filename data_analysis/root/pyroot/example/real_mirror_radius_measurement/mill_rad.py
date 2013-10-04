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
from ROOT import TCanvas, TGraph2D, gStyle, TF2, TPad, TFitResult, TGraph2DErrors
from math import *
import numpy, sys, math

mirror_thickness = 0.3
total_diff=0 

# Data read in
try:

	coor_x = []
	coor_y = []
	
	coor_out = open("hand_measurement/mirror_1.coord")
	data_out = open("hand_measurement/mirror_1.dat")

# Read in x, y coordinate from file
	read_x = coor_out.readline().split()
	read_y = coor_out.readline().split()

# Data convert list type from string list to float list
	coor_x = [float(b) for b in read_x]
	coor_y = [float(b) for b in read_y]


# Create 2D list 
	raw_data = [[0 for col in range(len(coor_x))] for row in range(len(coor_y))]


# Read in the radius measurement
	r = 0 	
	for line in data_out:
		num = line.split()
		for i in range(len(num)):
# 			print i
			raw_data[r][i]=float(num[i])
		r=r+1
	
	coor_out.closed	
	data_out.closed	

except IndexError, e:
	pass


x_out = numpy.array(coor_x)
y_out = numpy.array(coor_y)
z_out = numpy.array(raw_data)

x_max = x_out[len(x_out)-1] * 2.54
x_min = 0 
y_max = y_out[len(y_out)-1] * 2.54
y_min = 0

arr_x = x_out * 2.54
arr_y = y_out * 2.54 
arr_z = (z_out/1000)*2.54
 

#sys.exit() 

# ********************************************************************
# ROOT plot
#
#
c1 = TCanvas('c1', '2D Plot for Test Mirror ', 1400,1000)
c1.Divide(1,2)

gr1 = TGraph2DErrors()
gr3 = TGraph2D()

gr1.SetTitle("Real Measurement")


x_error = 0.001*2.54
y_error = 0.001*2.54
z_error = 0.005*2.54


# Plot the measured radius
c1.cd(1)
n=0
for i in range(len(coor_y)):
	for r in range(len(coor_x)):

		x =arr_x[r] 
		y =arr_y[i] 
		z = float(arr_z[i][r])

		gr1.SetPoint(n, x, y, z)
		gr1.SetPointError(n, x_error, y_error, z_error)

		n = n+1

print "Number of Points: ", n
gStyle.SetPalette(1)
#print gr1.GetXaxis()

gr1.Draw("surf1")
gr1.GetXaxis().SetTitle("x (cm)")
gr1.GetYaxis().SetTitle("y (cm)")
gr1.GetZaxis().SetTitle("Height (cm)")
gr1.GetXaxis().CenterTitle()
gr1.GetYaxis().CenterTitle()
gr1.GetZaxis().CenterTitle()

gr1.GetXaxis().SetTitleOffset(1.2)
gr1.GetXaxis().SetTitleSize(0.06)
gr1.GetYaxis().SetTitleSize(0.06)



c1.Update()


# /*--------------------------------------------------

f2 = TF2("f2", "-(((x-[0])**2 + (y-[1])**2)/([2] + sqrt([2]**2 - (1-[3])* ((x-[0])**2 + (y-[1])**2))) + [5]*(x-[0]) + [6]*(y-[1]) -[4])", x_min, x_max, y_min, y_max)


# X offset
f2.SetParameter(0, 30)
# Y offset
f2.SetParameter(1, 27)
# Radius of curvature at center
f2.SetParameter(2, 110)
# Conic constant
f2.SetParameter(3, 0)
# Z Offset
f2.SetParameter(4, 5)
# Tilt in X 
f2.SetParameter(5, 0)
# Tilt in Y
f2.SetParameter(6, 0)





gr1.Fit("f2", "WR")

chi2=f2.GetChisquare()
ndf=f2.GetNDF()
print "The fitted Chi2 is: ", chi2
print "The number of degree of freedom: ", ndf
print "The Chi2/ndf: ", chi2/ndf

est_0 = f2.GetParameter(0)
est_1 = f2.GetParameter(1)
est_2 = f2.GetParameter(2)
est_3 = f2.GetParameter(3)
est_4 = f2.GetParameter(4)
est_5 = f2.GetParameter(5)
est_6 = f2.GetParameter(6)

#est_0 = 110
#est_1 = 30
# est_2 = f2.GetParameter(2)
# est_3 = f2.GetParameter(3)



fit2=gr1.FindObject("f2")
fit2.SetParameters(est_0, est_1, est_2, est_3, est_4, est_5, est_6)
fit2.SetTitle("Pefect Sphere")



c1.cd(2)

n=0
for i in range(len(coor_y)):
	for r in range(len(coor_x)):

		x  = arr_x[r]
		y  = arr_y[i]

		z_fit = fit2.Eval(x,y)
		z_measurement = arr_z[i][r]	

# Difference is obtained by subtracting real data from the prediction
		z_diff = z_fit - z_measurement
 		total_diff = total_diff + abs(z_diff)	
		gr3.SetPoint(n, x, y, z_diff)
		n=n+1

mean_diff = total_diff / n

gr3.SetTitle("Fit - Data ")
gr3.Draw("surf1")
gr3.GetXaxis().SetTitle("x (cm)")
gr3.GetYaxis().SetTitle("y (cm)")
gr3.GetZaxis().SetTitle("Height (cm)")
gr3.GetXaxis().CenterTitle()
gr3.GetYaxis().CenterTitle()
gr3.GetZaxis().CenterTitle()

gr3.GetXaxis().SetTitleOffset(1.2)
gr3.GetXaxis().SetTitleSize(0.06)
gr3.GetYaxis().SetTitleSize(0.06)


c1.Update()

c1.SaveAs("final_plot.eps")
c1.cd()

# print "The proposed radius is : ", 110
# print "The fitted radius is: ", f2.GetParameter(0) + mirror_thickness
# print "Total difference is:", total_diff
# print "Mean difference is:", mean_diff
# 
