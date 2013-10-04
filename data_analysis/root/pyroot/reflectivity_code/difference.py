#!/usr/bin/python

from numpy import *
from math import *

import numpy, sys, math, string
from ROOT import TCanvas, TGraphErrors, TF1, TMultiGraph, TLegend, TFile
import commands


try:
 
	wavelength = []

	center_we  = []
	center_eci = []

	corner_we  = []
	corner_eci = []

	left_we    = []
	left_eci   = []		
 

	#err = []

	#sig=[[] for i in range(9) ]

	#eff = []
	#eff=[[] for i in range(9) ]

	file_name = "difference.dat"
	error_file = "error.dat"

	file_var = file_name.split('.')[0]+".root"

	# print file_var

	file_out = open(file_name)
	error_out = open(error_file)


	file_out.readline()
	for line in file_out:
 		num = line.split()

		if (num[0] != '!'):
			#print line, "sadfsadfa"
			wave_len = float(num[0])
			sig_1 = float(num[1])
			sig_2 = float(num[2])
			sig_3 = float(num[3])
			sig_4 = float(num[4])
			sig_5 = float(num[5])
			sig_6 = float(num[6])
			#error = float(num[3])


			wavelength.append(wave_len)
			center_we.append(sig_1)
			center_eci.append(sig_2)

			corner_we.append(sig_3)
			corner_eci.append(sig_4)

			left_we.append(sig_5)
			left_eci.append(sig_6)

			#err.append(0)


	error = []	


	for line in error_out:
 		num = line.split()

		if (num[0] != '!'):
			sig_1 = float(num[1])
			error.append(sig_1)

	file_out.closed
	error_out.closed







except IndexError, e:
	pass


print error
	
for i in range(0, size(error)):
	#print i
	print wavelength[i]
	if (wavelength[i] < 230):
		error[i] = sqrt(error[i]**2 + 1)
	else:
		error[i] = sqrt(error[i]**2 + 0.5**2)

print error

#print center_we-center_eci

center_diff = []
corner_diff = []
left_diff = []

for i in range(0,size(wavelength)):
	diff_1 = center_we[i] - center_eci[i]
	diff_2 = corner_we[i] - corner_eci[i] 
	diff_3 = left_we[i] - left_eci[i]
	#print diff_1, diff_2, diff_3

	center_diff.append(diff_1)
	corner_diff.append(diff_2)
	left_diff.append(diff_3)

	


#print wavelength, center_we, center_eci, corner_we,  corner_eci

# 
# #print wavelength,"\n", ref, "\n", sig[0],  sig[1]
# 

#print wavelength, signal_18, signal_02, err
 
# # 
c1 = TCanvas('c1', 'reflectivity_measurement', 800, 600)
# 

# plot_flie = TFile(file_var, "RECREATE")
# 
# c1.SetLeftMargin(0.1709302)
# c1.SetRightMargin(0.02906977)
# 
mg = TMultiGraph()
# 
gr1 = TGraphErrors()
gr2 = TGraphErrors()
gr3 = TGraphErrors()

for i in range(0, size(wavelength)):
 	n = gr1.GetN()
	gr1.SetPoint(n,wavelength[i],center_diff[i])
	gr1.SetPointError(n,0,error[i])

	gr2.SetPoint(n,wavelength[i],corner_diff[i])
	gr2.SetPointError(n,0,error[i])

	gr3.SetPoint(n,wavelength[i],left_diff[i])
	gr3.SetPointError(n,0,error[i])


gr1.SetMarkerStyle(5)
gr2.SetMarkerStyle(5)
gr3.SetMarkerStyle(5)
 
gr1.SetMarkerColor(2)	
gr1.SetLineColor(2)
gr2.SetMarkerColor(4)	
gr2.SetLineColor(4)
gr3.SetMarkerColor(3)	
gr3.SetLineColor(3)


mg.Draw("AP")
mg.Add(gr1)
mg.Add(gr2)
mg.Add(gr3)

mg.SetTitle("Mirror #8 Reflectivity - ECI Witness Sample Reflectivity")
mg.GetXaxis().SetTitle("Wavelength (nm)")
mg.GetYaxis().SetTitle("Mirror #8 - ECI Witness Sample %Reflectivity  ")
mg.GetXaxis().CenterTitle()
mg.GetYaxis().CenterTitle()
mg.SetMaximum(10)


c1.Update()

legend=TLegend(0.25,0.75,0.9,0.9)
legend.SetBorderSize(1)
legend.SetTextFont(32)
legend.SetMargin(0.1)
legend.SetTextSize(0.03)

# if (file_name == "purge_vs_nopurge.dat"):
# 	legend.AddEntry(gr1,"No Purge","l")
# 	legend.AddEntry(gr2,"Purge","l")
# else: 
# 	legend.AddEntry(gr1," Detector 18","l")
# 	legend.AddEntry(gr2," Detector 02","l")

legend.AddEntry(gr1," Center Mirror #8 Reflectivity - ECI Witness Sample #5 Reflectivity","p")
legend.AddEntry(gr2," Corner Mirror #8 Reflectivity - ECI Witness Sample #7 Reflectivity","p")
legend.AddEntry(gr3," Left Mirror #8 Reflectivity - ECI Witness Sample #4 Reflectivity","p")

legend.Draw()
legend.SetFillColor(0)

c1.Modified()
c1.Update()

