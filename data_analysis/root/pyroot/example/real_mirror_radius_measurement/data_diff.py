#!/usr/bin/python

from numpy import *
from ROOT import TCanvas, TGraph2D, gStyle, TF2, TPad, TFitResult
from math import *
import numpy, sys, math

mirror_thickness = 0.3
total_diff=0 

# Data read in
try:

	coor_x_1 = []
	coor_y_1 = []

	coor_x_2 = []
	coor_y_2 = []


	coor_out_1 = open("hand_measurement/mirror_1.coord")
	data_out_1 = open("hand_measurement/mirror_1.dat")

	coor_out_2 = open("hand_measurement/mirror_2.coord")
	data_out_2 = open("hand_measurement/mirror_2.dat")

	read_x_1 = coor_out_1.readline().split()
	read_y_1 = coor_out_1.readline().split()

	read_x_2 = coor_out_2.readline().split()
	read_y_2 = coor_out_2.readline().split()

	coor_x_1 = [float(b) for b in read_x_1]
	coor_y_1 = [float(b) for b in read_y_1]

	coor_x_2 = [float(b) for b in read_x_2]
	coor_y_2 = [float(b) for b in read_y_2]

	raw_data_1 = [[0 for col in range(len(coor_x_1))] for row in range(len(coor_y_1))]
	raw_data_2 = [[0 for col in range(len(coor_x_2))] for row in range(len(coor_y_2))]

	r = 0 	
	for line in data_out_1:
		num = line.split()
		for i in range(len(num)):
# 			print i
			raw_data_1[r][i]=float(num[i])
		r=r+1

	coor_out_1.closed	
	data_out_1.closed	


	r = 0 	
	for line in data_out_2:
		num = line.split()
		for i in range(len(num)):
# 			print i
			raw_data_2[r][i]=float(num[i])
		r=r+1

except IndexError, e:
	pass


x_out_1= numpy.array(coor_x_1)
y_out_1 = numpy.array(coor_y_1)
z_out_1 = numpy.array(raw_data_1)

x_out_2= numpy.array(coor_x_2)
y_out_2 = numpy.array(coor_y_2)
z_out_2 = numpy.array(raw_data_2)


#print x_out_1, y_out_1, z_out_1
#print x_out_2, y_out_2, z_out_2

arr_x_1 = x_out_1 * 2.54
arr_y_1 = y_out_1 * 2.54 
arr_z_1 = (z_out_1/1000)*2.54
#arr_z_1 = z_out_1


arr_x_2 = x_out_2 * 2.54
arr_y_2 = y_out_2 * 2.54 
arr_z_2 = (z_out_2/1000)*2.54
#arr_z_2 = z_out_2

#print arr_z_1[1][1]18

c1 = TCanvas('c1', '2D Plot for Test Mirror ', 1400,1000)
gr1 = TGraph2D()
gr1.SetTitle("Difference Between Mirror 1 and 2")

c1.cd()
n=0
for i in range (len(coor_y_1)):
	for r in range (len(coor_x_1)):
		if (coor_y_1[i] == coor_y_2[i]):
			#print m, n
			#print arr_z_1[n][m]

			x = arr_x_1[r] 
			y = arr_y_1[i]
		
			# print x, y
			d = arr_z_1[i][r] - arr_z_2[i][r]		
			#diff.append(d)
			print d
			gr1.SetPoint(n, x, y, d)
			n = n+1
					

#print diff

print n

gStyle.SetPalette(1)

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




