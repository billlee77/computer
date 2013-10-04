#!/usr/bin/python


#************************************************************
# Program name: flexibility_ploit.py
# Author: Wenliang Li
# Date: 25/May/2011 
# Purpose: this is program is created to analyse the data for the torsion and rigidity test of the carbon fiber mirror backing
#
#************************************************************




from numpy import *
from math import *

import numpy, sys, math
from ROOT import TCanvas, TGraphErrors, TF1, TMultiGraph, TLegend
import commands

# Data read in
try:
 
	mass = []
	inner_carve = []
	outer_carve = []
	inner_orig_pos = []
	outer_orig_pos = []

# Capture the output from the command
	sh_output = commands.getoutput('ls data_analysis | grep 3')
	sh_output = sh_output.split()
	print sh_output, len(sh_output)

	file_name = "data_analysis/3_clamp_BeforeRibs.dat"
#	file_name = "data_analysis/3_clamp_AfterRibs.dat"
#	file_name = "data_analysis/3_clamp_AfterSideSupport.dat"

#	print file_name
#	sys.exit(0)


#	data_out = open("data_analysis/1_clamp_AfterRibs.dat")
#	data_out = open("data_analysis/1_clamp_BeforeRibs.dat")
	data_out = open(file_name)
#	data_out = open("data_analysis/3_clamp_AfterRibs.dat")
#	data_out = open("data_analysis/3_clamp_AfterSideSupport.dat")
#	data_out = open("radius.dat")

	da = data_out.readline()
	det = da.split()
	print det, type(det), len(det)

	position = data_out.seek(0, 0);

	for i in data_out:

		if len(det) == 3:
			num = i.split()
			a = round(float(num[0]))
			b = round(float(num[1]))
			c = round(float(num[2]))
			mass.append(a)
			inner_carve.append(b)
			outer_carve.append(c)
			print a, b, c
		else:
			num = i.split()
			a = round(float(num[0]))
			b = round(float(num[1]))
			c = round(float(num[2]))
			d = round(float(num[3]))	
			e = round(float(num[4]))
			mass.append(a)
			inner_carve.append(b)
			inner_orig_pos.append(c)
			outer_carve.append(d)
			outer_orig_pos.append(e)
			print a, b, c

	data_out.closed	

except IndexError, e:
	pass




# *************************************************************
# Data Refinement
# print mass, inner_carve, outer_carve
# print type(mass), type(mass[1])

# ROOT plot

# Refind Raw data

if (len(det) == 3):
	inner_origin = inner_carve[0]
	outer_origin = outer_carve[0]
	for i in range(len(mass)):
		inner_carve[i] = inner_carve[i] - inner_origin
		outer_carve[i] = outer_carve[i] - outer_origin
else:
	for i in range(len(mass)):
		inner_carve[i] = inner_carve[i] - inner_orig_pos[i]
		outer_carve[i] = outer_carve[i] - outer_orig_pos[i]

print inner_carve, outer_carve


# Defining the size of error list
error = [0]*len(mass)


# *************************************************************
# Error Handling 
# Here is to introduce a restoration factor
restore_factor = 1.05 * 10 ** -3 

print restore_factor

for i in range(len(error)):

#	error[i] = "%.2f" % (mass[i] * restore_factor)
	tmp = mass[i]*restore_factor
	error[i] = sqrt(tmp**2 + (1)**2)

# 	error[i] = stand_error
# 	stand_error = stand_error + 0.5
print error
 
# *************************************************************

#sys.exit(0)

# Start Plotting

# Create Canvas
c1 = TCanvas('c1', 'Flexibility Study ', 800,600)

# Create graph
mg = TMultiGraph()

# Select graph title
#	file_name = "data_analysis/3_clamp_BeforeRibs.dat"
#	file_name = "data_analysis/3_clamp_AfterRibs.dat"
#	file_name = "data_analysis/3_clamp_AfterSideSupport.dat"

if (file_name == "data_analysis/3_clamp_BeforeRibs.dat" ):
	mg.SetTitle("Deflection with Original Setup")
elif (file_name == "data_analysis/3_clamp_AfterRibs.dat"):
	mg.SetTitle("Deflection After 1st Upgrade")
elif (file_name == "data_analysis/3_clamp_AfterSideSupport.dat"):
	mg.SetTitle("Deflection After 2nd Upgrade")
else:
	pass


# *************************************************************
# Convex Mirror & Function Fit
gr1 = TGraphErrors()
for xe,ye,err in zip(mass, inner_carve,error):
	print xe, ye
# print type(xe)
	n = gr1.GetN()
	gr1.SetPoint(n,xe,ye)
	gr1.SetPointError(n, 0, err)


# Function Fit with range
# Method 1
#fun1 = TF1("fun1","pol1",0,600)
#gr1.Fit("fun1","R")

#fun1 = TF1("fun1","pol1")
#gr1.Fit("fun1")

# Method 2



if (file_name == "data_analysis/3_clamp_BeforeRibs.dat" ):
	fun1 = TF1()
	gr1.Fit('pol1', 'R+', '', 0, 1400)
	fun1=gr1.GetFunction('pol1')
	fun1.SetNpx(100)

	fun3 = TF1()
	gr1.Fit('pol1', 'R+', '', 1400, 2200)
	fun3=gr1.GetFunction('pol1')
	fun3.SetNpx(100)

else:
	fun1 = TF1()
	xmin=0 
	xmax=1400
	gr1.Fit('pol1')
	#gr1.Fit('pol1','R','',xmin,xmax)
	fun1=gr1.GetFunction('pol1')
	fun1.SetNpx(100)




# *************************************************************
# Concave Mirror & Function Fit


gr2 = TGraphErrors()
for xe,ye,err in zip(mass, outer_carve, error):
 	print xe, ye
# # print type(xe)
	n = gr2.GetN()
	gr2.SetPoint(n,xe,ye)
	gr2.SetPointError(n, 0, err)
	gr2.SetMarkerColor(2)
	gr2.SetLineColor(2)
	gr2.SetMarkerStyle(5)


fun2 = TF1()
gr2.Fit('pol1')
fun2=gr2.GetFunction('pol1')
fun2.SetNpx(100)
fun2.SetLineColor(2)



# if (file_name == "data_analysis/3_clamp_BeforeRibs.dat" ):
# 	fun2 = TF1()
# 	gr2.Fit('pol1', 'R+', '', 0, 1400)
# 	fun2=gr2.GetFunction('pol1')
# 	fun2.SetNpx(100)
# 	fun2.SetLineColor(2)
# 
# 	fun3 = TF1()
# 	gr2.Fit('pol1', 'R+', '', 1400, 2200)
# 	fun3=gr2.GetFunction('pol1')
# 	fun3.SetNpx(100)
# 
# else:
# 	fun2 = TF1()
# 	gr2.Fit('pol1')
# 	fun2=gr2.GetFunction('pol1')
# 	fun2.SetNpx(100)
# 	fun2.SetLineColor(2)

#***********************************************************************
# Draw everthing 



mg.Add(gr1)
mg.Add(gr2)

mg.Draw("AP")

c1.Update()


#***********************************************************************
# Define legend

legend=TLegend(0.65,0.2,0.85,0.4)
legend.SetBorderSize(1)
legend.SetTextFont(72)
legend.SetTextSize(0.04)
legend.AddEntry(gr1,"Convex","p")
legend.AddEntry(gr2,"Concave","p")
legend.Draw()
legend.SetFillColor(0)


c1.Modified()
c1.Update()

#**********************************************************************
# Define Axis
mg.GetXaxis().SetTitle("Mass (g)")
mg.GetYaxis().SetTitle("Movement (mm)")
mg.GetXaxis().CenterTitle()
mg.GetYaxis().CenterTitle()

# 
c1.Update()


# End
#**********************************************************************
