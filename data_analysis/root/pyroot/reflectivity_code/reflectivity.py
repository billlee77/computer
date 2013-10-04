#!/usr/bin/python

from numpy import *
from math import *

import numpy, sys, math, string
from ROOT import TCanvas, TGraphErrors, TF1, TMultiGraph, TLegend, TFile
import commands


try:
 
	wavelength=[]
	signal_ref=[]
	signal_measurement=[]

	#sig=[[] for i in range(9) ]

	#eff = []
	#eff=[[] for i in range(9) ]


	#file_name = "efficiency02.dat"
	#file_name = "efficiency18_recheck.dat"
	#file_name = "efficiency02.dat"
	#file_name = "purge_vs_nopurge.dat"

	file_name = "center.dat"
	#file_name = "center_top.dat"
	#file_name = "center_bottom.dat"
	#file_name = "center_left.dat"
	#file_name = "center_right.dat"

	#file_name = "top_right.dat"

	error_file = "error.dat"



	file_var = file_name.split('.')[0]+".root"

	# print file_var

	file_out = open(file_name)
	error_out = open(error_file)

	file_out.readline()
	for line in file_out:
 		num = line.split()

		if (num[0] != '!'):
			wave_len = float(num[0])
			sig_1 = float(num[1])
			sig_2 = float(num[2])


			wavelength.append(wave_len)
			signal_ref.append(sig_1)
			signal_measurement.append(sig_2)


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

# 
# #print wavelength,"\n", ref, "\n", sig[0],  sig[1]
# 

#print wavelength, signal_18, signal_02, err
 
# 
c1 = TCanvas('c1', 'reflectivity_measurement', 800, 600)

plot_flie = TFile(file_var, "RECREATE")

# c1.SetLeftMargin(0.1709302)
# c1.SetRightMargin(0.02906977)

mg = TMultiGraph()

gr1 = TGraphErrors()
gr2 = TGraphErrors()

gr1.SetName("reference")
gr2.SetName("measurement")

mg.SetName("graph1")
mg.SetTitle("Spectrum Response")

for wl, sig in zip(wavelength, signal_ref):
	n = gr1.GetN()
	gr1.SetPoint(n,wl,sig*10000)
gr1.SetMarkerStyle(5)

for wl, sig in zip(wavelength, signal_measurement):
	n = gr2.GetN()
	gr2.SetPoint(n,wl,sig*10000)
gr2.SetMarkerStyle(5)

plot_flie.cd()
c1.cd()
#
gr1.SetMarkerColor(2)	
gr1.SetLineColor(2)
gr2.SetMarkerColor(4)	
gr2.SetLineColor(4)
mg.Draw("AP")
 
mg.Add(gr1)
mg.Add(gr2)
#gr1.Draw("AP")
 
c1.Update()

  
legend=TLegend(0.7,0.75,0.9,0.9)
legend.SetBorderSize(1)
legend.SetTextFont(32)
legend.SetTextSize(0.03)

# if (file_name == "purge_vs_nopurge.dat"):
# 	legend.AddEntry(gr1,"No Purge","l")
# 	legend.AddEntry(gr2,"Purge","l")
# else: 
# 	legend.AddEntry(gr1," Detector 18","l")
# 	legend.AddEntry(gr2," Detector 02","l")

legend.AddEntry(gr1," Reference","l")
legend.AddEntry(gr2," Measurement","l")

legend.Draw()
legend.SetFillColor(0)
c1.Modified()
c1.Update()
# 
mg.GetXaxis().SetTitle("Wavelength (nm)")
mg.GetYaxis().SetTitle("Signal (10^{-4}V)")
#mg.GetYaxis().SetTitleOffset(2)
mg.GetXaxis().CenterTitle()
mg.GetYaxis().CenterTitle()

c1.Update()
c1.Write()

gr1.Write()
gr2.Write()

effiency=[]
for i in range(0, size(signal_measurement)):
	if signal_ref[i]>0 :
		effiency.append(signal_measurement[i]/signal_ref[i]*100.0)


c2 = TCanvas('c2', 'Reflectivity', 800, 600)
gr3 = TGraphErrors()

gr3.SetName("graph2")


eff_graph = TGraphErrors()
for wl, ef, er in zip(wavelength, effiency, error):
	n = gr3.GetN()
	gr3.SetPoint(n,wl,ef)
	gr3.SetPointError(n, 0, er)
	gr3.SetMarkerStyle(5)



gr3.SetMarkerColor(2)	
gr3.SetLineColor(2)

gr3.SetTitle("Reflectivity")
gr3.GetXaxis().SetTitle("Wavelength (nm)")
gr3.GetYaxis().SetTitle("% Reflectivity")

gr3.GetXaxis().CenterTitle()
gr3.GetYaxis().CenterTitle()

#gr3.GetXaxis().SetRangeUser(140, 400)

gr3.GetXaxis().SetLimits(140, 450)
gr3.GetYaxis().SetRangeUser(0, 100)

gr3.Draw("AP")
c2.Update()


c2.Update()
c2.Write()

#for i in range(2,13):
#	print gr3.GetX()[i], gr2.GetY()[i]


