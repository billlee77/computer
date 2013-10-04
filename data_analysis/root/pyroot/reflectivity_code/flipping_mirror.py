#!/usr/bin/python

from numpy import *
from math import *

import numpy, sys, math
from ROOT import TCanvas, TGraphErrors, TF1, TMultiGraph, TLegend, TFile
import commands


try:
 
	wavelength=[]
	signal_ref=[]
	signal_measurement1=[]
	signal_measurement2=[]
	signal_measurement3=[]
	signal_measurement4=[]
	signal_measurement5=[]
	signal_measurement6=[]
	signal_measurement7=[]
	signal_measurement8=[]
	signal_measurement9=[]
	error = []

	#sig=[[] for i in range(9) ]

	#eff = []
	#eff=[[] for i in range(9) ]


	file_name = "flipping.dat"
	#file_name = "efficiency18_recheck.dat"
	#file_name = "efficiency02.dat"
	#file_name = "purge_vs_nopurge.dat"

	file_out = open(file_name)

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
			sig_7 = float(num[7])
			sig_8 = float(num[8])
			sig_9 = float(num[9])
			#error = float(num[3])


			wavelength.append(wave_len)
			signal_ref.append(sig_1)
			signal_measurement1.append(sig_2)
			signal_measurement2.append(sig_3)
			signal_measurement3.append(sig_4)
			signal_measurement4.append(sig_5)
			signal_measurement5.append(sig_6)
			signal_measurement6.append(sig_7)
			signal_measurement7.append(sig_8)
			signal_measurement8.append(sig_9)
			#error.append(0)


	file_out.closed

except IndexError, e:
	pass

# 
# #print wavelength,"\n", ref, "\n", sig[0],  sig[1]
# 

#print wavelength, signal_18, signal_02, err
 
# 
c1 = TCanvas('c1', 'reflectivity_measurement', 800, 600)

plot_flie = TFile("plot.root", "RECREATE")

#c1.SetLeftMargin(0.1709302)
#c1.SetRightMargin(0.02906977)

mg = TMultiGraph()

gr1 = TGraphErrors()
gr2 = TGraphErrors()
gr3 = TGraphErrors()
gr4 = TGraphErrors()
gr5 = TGraphErrors()
gr6 = TGraphErrors()
gr7 = TGraphErrors()
gr8 = TGraphErrors()
gr9 = TGraphErrors()

mg.SetName("graph1")
mg.SetTitle("Detector Response With and Without Flipper Mirror Reflection")

#for wl, ef, er in zip(wavelength, signal_ref, err):
for i in range(0, size(wavelength)):
	n = gr1.GetN()
	gr1.SetPoint(n,wavelength[i],signal_ref[i]*10000)
	gr2.SetPoint(n,wavelength[i],signal_measurement1[i]*10000)
	gr3.SetPoint(n,wavelength[i],signal_measurement2[i]*10000)
	gr4.SetPoint(n,wavelength[i],signal_measurement3[i]*10000)
	gr5.SetPoint(n,wavelength[i],signal_measurement4[i]*10000)
	gr6.SetPoint(n,wavelength[i],signal_measurement5[i]*10000)
	gr7.SetPoint(n,wavelength[i],signal_measurement6[i]*10000)
	gr8.SetPoint(n,wavelength[i],signal_measurement7[i]*10000)
	gr9.SetPoint(n,wavelength[i],signal_measurement8[i]*10000)
	#gr1.SetPointError(n, 0, er)
gr1.SetMarkerStyle(3)
gr2.SetMarkerStyle(5)
gr3.SetMarkerStyle(5)
gr4.SetMarkerStyle(5)
gr5.SetMarkerStyle(5)
gr6.SetMarkerStyle(5)
gr7.SetMarkerStyle(5)
gr8.SetMarkerStyle(5)
gr9.SetMarkerStyle(5)



# for wl, ef, er in zip(wavelength, signal_measurement2, err):
# 	n = gr3.GetN()
# 	gr3.SetPoint(n,wl,ef)
# 	#gr1.SetPointError(n, 0, er)
# gr3.SetMarkerStyle(5)
# 
# 



plot_flie.cd()
c1.cd()
#
gr1.SetMarkerColor(3)	
gr1.SetLineColor(3)
gr2.SetMarkerColor(29)	
gr2.SetLineColor(29)
gr3.SetMarkerColor(41)	
gr3.SetLineColor(41)
gr4.SetMarkerColor(1)	
gr4.SetLineColor(1)
gr5.SetMarkerColor(2)	
gr5.SetLineColor(2)
gr6.SetMarkerColor(4)	
gr6.SetLineColor(4)
gr7.SetMarkerColor(6)	
gr7.SetLineColor(6)
gr8.SetMarkerColor(8)	
gr8.SetLineColor(8)
gr9.SetMarkerColor(48)	
gr9.SetLineColor(48)


mg.Draw("AP")
 
mg.Add(gr1)
mg.Add(gr2)
mg.Add(gr3)
mg.Add(gr4)
mg.Add(gr5)
mg.Add(gr6)
mg.Add(gr7)
mg.Add(gr8)
mg.Add(gr9)
#gr1.Draw("AP")
 
c1.Update()
#  
legend=TLegend(0.55,0.55,0.9,0.9)
legend.SetBorderSize(1)
legend.SetTextFont(32)
legend.SetTextSize(0.03)
legend.SetTextAlign(12)
legend.SetMargin(0.1)


# if (file_name == "purge_vs_nopurge.dat"):
# 	legend.AddEntry(gr1,"No Purge","l")
# 	legend.AddEntry(gr2,"Purge","l")
# else: 
# 	legend.AddEntry(gr1," Detector 18","l")
# 	legend.AddEntry(gr2," Detector 02","l")

legend.AddEntry(gr1,"No Reflection","p")
legend.AddEntry(gr2,"Flipper Mirror Reflection (FMR) 1","p")
legend.AddEntry(gr3,"Flipper Mirror Reflection (FMR) 2","p")
legend.AddEntry(gr4,"Left FMR","p")
legend.AddEntry(gr5,"Right FMR","p")
legend.AddEntry(gr6,"Center FMR","p")
legend.AddEntry(gr7,"Top FMR","p")
legend.AddEntry(gr8,"Bottom FMR","p")
legend.AddEntry(gr9,"Corner FMR","p")


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
# 
effiency1=[]
effiency2=[]
effiency3=[]
effiency4=[]
effiency5=[]
effiency6=[]
effiency7=[]
effiency8=[]
effiency_ave=[]

for i in range(0, size(signal_measurement1)):
	if signal_ref[i]>0 :
		effiency1.append(signal_measurement1[i]/signal_ref[i]*100.0)
		effiency2.append(signal_measurement2[i]/signal_ref[i]*100.0)
		effiency3.append(signal_measurement3[i]/signal_ref[i]*100.0)
		effiency4.append(signal_measurement4[i]/signal_ref[i]*100.0)
		effiency5.append(signal_measurement5[i]/signal_ref[i]*100.0)
		effiency6.append(signal_measurement6[i]/signal_ref[i]*100.0)
		effiency7.append(signal_measurement7[i]/signal_ref[i]*100.0)
		effiency8.append(signal_measurement8[i]/signal_ref[i]*100.0)
		
#		average = (signal_measurement1[i]/signal_ref[i] + signal_measurement2[i]/signal_ref[i] + signal_measurement3[i]/signal_ref[i] + signal_measurement4[i]/signal_ref[i] + signal_measurement5[i]/signal_ref[i] + signal_measurement6[i]/signal_ref[i] + signal_measurement7[i]/signal_ref[i] + signal_measurement8[i]/signal_ref[i])/8

#		err = math.sqrt(((signal_measurement1[i]/signal_ref[i]-average)**2 + (signal_measurement2[i]/signal_ref[i]-average)**2 + (signal_measurement3[i]/signal_ref[i]-average)**2 + (signal_measurement4[i]/signal_ref[i]-average)**2 + (signal_measurement5[i]/signal_ref[i] - average)**2 + (signal_measurement6[i]/signal_ref[i] -average)**2 + (signal_measurement7[i]/signal_ref[i] -average)**2 + (signal_measurement8[i]/signal_ref[i]-average)**2)/8)

		average = (effiency1[i] + effiency2[i] + effiency3[i] + effiency4[i] + effiency5[i]+ effiency6[i] + effiency7[i] + effiency8[i])/8

		err = math.sqrt(((effiency1[i]-average)**2 + (effiency2[i]-average)**2 + (effiency3[i]-average)**2 + (effiency4[i]-average)**2 + (effiency5[i] -average)**2 + (effiency6[i] -average)**2 + (effiency7[i] -average)**2 + (effiency8[i]-average)**2)/8)

		error.append(err)	
		effiency_ave.append(average)


c2 = TCanvas('c2', 'Efficiency_plot', 800, 600)


mg2 = TMultiGraph()

egr1 = TGraphErrors()
egr2 = TGraphErrors()
egr3 = TGraphErrors()
egr4 = TGraphErrors()
egr5 = TGraphErrors()
egr6 = TGraphErrors()
egr7 = TGraphErrors()
egr8 = TGraphErrors()

egrAve = TGraphErrors()



mg2.SetName("graph2")

eff_graph = TGraphErrors()
#for wl, ef1, ef2, er in zip(wavelength, effiency1, effiency2, err):

for i in range(0, size(wavelength)):

	n1 = egr1.GetN()
	egr1.SetPoint(n1,wavelength[i],effiency1[i])
	egr2.SetPoint(n1,wavelength[i],effiency2[i])
	egr3.SetPoint(n1,wavelength[i],effiency3[i])
	egr4.SetPoint(n1,wavelength[i],effiency4[i])
	egr5.SetPoint(n1,wavelength[i],effiency5[i])
	egr6.SetPoint(n1,wavelength[i],effiency6[i])
	egr7.SetPoint(n1,wavelength[i],effiency7[i])
	egr8.SetPoint(n1,wavelength[i],effiency8[i])
	egrAve.SetPoint(n1,wavelength[i],effiency_ave[i])
	
	egrAve.SetPointError(n1, 0, error[i])

egr1.SetMarkerStyle(5)
egr2.SetMarkerStyle(5)
egr3.SetMarkerStyle(5)
egr4.SetMarkerStyle(5)
egr5.SetMarkerStyle(5)
egr6.SetMarkerStyle(5)
egr7.SetMarkerStyle(5)
egr8.SetMarkerStyle(5)

egrAve.SetMarkerStyle(22)

egr1.SetMarkerColor(29)	
egr1.SetLineColor(29)
egr2.SetMarkerColor(41)	
egr2.SetLineColor(41)
egr3.SetMarkerColor(1)	
egr3.SetLineColor(1)
egr4.SetMarkerColor(2)	
egr4.SetLineColor(2)
egr5.SetMarkerColor(4)	
egr5.SetLineColor(4)
egr6.SetMarkerColor(6)	
egr6.SetLineColor(6)
egr7.SetMarkerColor(8)	
egr7.SetLineColor(8)
egr8.SetMarkerColor(48)	
egr8.SetLineColor(48)

mg2.Draw("AP")

mg2.Add(egr1)
mg2.Add(egr2)
mg2.Add(egr3)
mg2.Add(egr4)
mg2.Add(egr5)
mg2.Add(egr6)
mg2.Add(egr7)
mg2.Add(egr8)
mg2.Add(egrAve)

mg2.SetTitle("Flipping Mirror %R at 47.5 Degree Incidence Angle")
mg2.GetXaxis().SetTitle("Wavelength (nm)")
mg2.GetYaxis().SetTitle("% Reflectivity")

mg2.GetXaxis().CenterTitle()
mg2.GetYaxis().CenterTitle()
#mg2.GetYaxis().SetTitleOffset(2)

c2.Update()

legend1=TLegend(0.52,0.55,0.9,0.9)
legend1.SetBorderSize(1)
legend1.SetTextFont(32)
legend1.SetTextSize(0.03)
legend1.SetTextAlign(12)
legend1.SetMargin(0.1)


# if (file_name == "purge_vs_nopurge.dat"):
# 	legend.AddEntry(gr1,"No Purge","l")
# 	legend.AddEntry(gr2,"Purge","l")
# else: 
# 	legend.AddEntry(gr1," Detector 18","l")
# 	legend.AddEntry(gr2," Detector 02","l")

#legend1.AddEntry(gr1," Reference","l")
legend1.AddEntry(egr1,"Flipper Mirror Reflection (RMF) 1 %R","p")
legend1.AddEntry(egr2,"Flipper Mirror Reflection (RMF) 2 %R","p")
legend1.AddEntry(egr3,"Left FMR %R","p")
legend1.AddEntry(egr4,"Right FMR %R","p")
legend1.AddEntry(egr5,"Center FMR %R","p")
legend1.AddEntry(egr6,"Top FMR %R","p")
legend1.AddEntry(egr7,"Bottom FMR %R","p")
legend1.AddEntry(egr8,"Corner FMR %R","p")
legend1.AddEntry(egrAve,"Averaged Flipper Mirror %R","p")

legend1.Draw()
legend1.SetFillColor(0)


c2.Update()
c2.Write()

#print error

for i in range(0,size(error)):

	print wavelength[i], error[i]

