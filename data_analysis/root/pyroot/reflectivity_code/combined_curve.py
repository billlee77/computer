from numpy import *
from math import *

import numpy, sys, math
from ROOT import TCanvas, TGraphErrors, TF1, TMultiGraph, TLegend, TFile, TGraph
import commands

f1 = TFile("center_left.root")
f2 = TFile("center_right.root")
f3 = TFile("center.root")
f4 = TFile("center_top.root")
f5 = TFile("center_bottom.root")
f6 = TFile("top_right.root")


c1 = f1.Get("c2")
c2 = f2.Get("c2")
c3 = f3.Get("c2")
c4 = f4.Get("c2")
c5 = f5.Get("c2")
c6 = f6.Get("c2")

gr1   = c1.GetListOfPrimitives().FindObject("graph2");
gr2   = c2.GetListOfPrimitives().FindObject("graph2");
gr3   = c3.GetListOfPrimitives().FindObject("graph2");
gr4   = c4.GetListOfPrimitives().FindObject("graph2");
gr5   = c5.GetListOfPrimitives().FindObject("graph2");
gr6   = c6.GetListOfPrimitives().FindObject("graph2");

gr1.SetMarkerStyle(5)
gr2.SetMarkerStyle(5)
gr3.SetMarkerStyle(5)
gr4.SetMarkerStyle(5)
gr5.SetMarkerStyle(5)
gr6.SetMarkerStyle(5)


gr1.SetMarkerColor(1)	
gr1.SetLineColor(1)
gr2.SetMarkerColor(2)	
gr2.SetLineColor(2)
gr3.SetMarkerColor(4)	
gr3.SetLineColor(4)
gr4.SetMarkerColor(6)	
gr4.SetLineColor(6)
gr5.SetMarkerColor(8)	
gr5.SetLineColor(8)
gr6.SetMarkerColor(48)	
gr6.SetLineColor(48)


d1 = TCanvas('d1', 'Combined % Reflectivity', 800, 600)
mg = TMultiGraph()

mg.SetTitle("Mirror #8 % Reflectivity")
mg.Draw("AP")

mg.Add(gr1)
mg.Add(gr2)
mg.Add(gr3)
mg.Add(gr4)
mg.Add(gr5)
mg.Add(gr6)

mg.GetXaxis().SetTitle("Wavelength (nm)")
mg.GetYaxis().SetTitle("% Reflectivity")
mg.GetYaxis().SetTitleOffset(1.2)
mg.GetXaxis().CenterTitle()
mg.GetYaxis().CenterTitle()

d1.Update()

legend=TLegend(0.75,0.2,0.9,0.6)
legend.SetBorderSize(1)
legend.SetTextFont(32)
legend.SetTextSize(0.03)

legend.AddEntry(gr1,"Left %R",   "p")
legend.AddEntry(gr2,"Right %R",  "p")
legend.AddEntry(gr3,"Center %R", "p")
legend.AddEntry(gr4,"Top %R",    "p")
legend.AddEntry(gr5,"Bottom %R", "p")
legend.AddEntry(gr6,"Corner %R", "p")

legend.Draw()
legend.SetFillColor(0)

d1.Modified()
d1.Update()



d2 = TCanvas('d2', 'Spectrum Response', 800, 600)
mg2 = TMultiGraph()

# c3 = f1.Get("c1")
# c4 = f2.Get("c1")
# #
# 
# #spectrum02 = TGraph()
# #spectrum18 = TGraph()


rgr1 = f1.Get("reference;1")
rgr2 = f2.Get("reference;1")
rgr3 = f3.Get("reference;1")
rgr4 = f4.Get("reference;1")
rgr5 = f5.Get("reference;1")
rgr6 = f6.Get("reference;1")

mgr1 = f1.Get("measurement;1")
mgr2 = f2.Get("measurement;1")
mgr3 = f3.Get("measurement;1")
mgr4 = f4.Get("measurement;1")
mgr5 = f5.Get("measurement;1")
mgr6 = f6.Get("measurement;1")

rgr1.SetMarkerColor(1)	
rgr1.SetLineColor(1)
rgr2.SetMarkerColor(2)	
rgr2.SetLineColor(2)
rgr3.SetMarkerColor(4)	
rgr3.SetLineColor(4)
rgr4.SetMarkerColor(6)	
rgr4.SetLineColor(6)
rgr5.SetMarkerColor(8)	
rgr5.SetLineColor(8)
rgr6.SetMarkerColor(48)	
rgr6.SetLineColor(48)

mgr1.SetMarkerColor(1)	
mgr1.SetLineColor(1)
mgr2.SetMarkerColor(2)	
mgr2.SetLineColor(2)
mgr3.SetMarkerColor(4)	
mgr3.SetLineColor(4)
mgr4.SetMarkerColor(6)	
mgr4.SetLineColor(6)
mgr5.SetMarkerColor(8)	
mgr5.SetLineColor(8)
mgr6.SetMarkerColor(48)	
mgr6.SetLineColor(48)

mg2.SetTitle("Detector Response at FMR and M8R Mode")
mg2.Draw("AP")

mg2.Add(rgr1)
mg2.Add(rgr2)
mg2.Add(rgr3)
mg2.Add(rgr4)
mg2.Add(rgr5)
mg2.Add(rgr6)

mg2.Add(mgr1)
mg2.Add(mgr2)
mg2.Add(mgr3)
mg2.Add(mgr4)
mg2.Add(mgr5)
mg2.Add(mgr6)

mg2.GetXaxis().SetTitle("Wavelength (nm)")
mg2.GetYaxis().SetTitle("Signal (10^{-4}V)")
mg2.GetYaxis().SetTitleOffset(1.2)
mg2.GetXaxis().CenterTitle()
mg2.GetYaxis().CenterTitle()

d2.Update()
 
legend1=TLegend(0.55,0.5,0.9,0.9)
legend1.SetBorderSize(1)
legend1.SetTextFont(32)
legend1.SetTextSize(0.03)
legend1.SetTextAlign(12)
legend1.SetMargin(0.1)

legend1.AddEntry(rgr1,"Left FMR & M8R Mode Respose","p")
legend1.AddEntry(rgr2,"Right FMR & M8R Mode Respose","p")
legend1.AddEntry(rgr3,"Center FMR & M8R Mode Respose","p")
legend1.AddEntry(rgr4,"Top FMR & M8R Mode Respose",  "p")
legend1.AddEntry(rgr5,"Bottom FMR & M8R Mode Respose", "p")
legend1.AddEntry(rgr6,"Corner FMR & M8R Mode Respose","p")

legend1.Draw()
legend1.SetFillColor(0)

d2.Modified()
d2.Update()




 


# 
# spectrum02 = c3.GetListOfPrimitives().FindObject("graph1")
# spectrum18 = c4.GetListOfPrimitives().FindObject("graph1")
# # 
# 
# # spectrum02.SetMarkerColor(4)	
# # spectrum02.SetLineColor(4)	
# # 
# # spectrum18.SetMarkerColor(2)	
# # spectrum18.SetLineColor(2)	
# # spectrum18.SetMarkerStyle(3)	
# # # 
# 
# d2 = TCanvas('d2', 'Combined efficiency', 800, 600)
# mg2 = TMultiGraph()
# # 
# mg2.SetTitle("Spectrum Responds")
# mg2.Draw("AP")
# 
# mg2.Add(spectrum02)
# mg2.Add(spectrum18)
# # 
# mg2.GetXaxis().SetTitle("Wavelength (nm)")
# mg2.GetYaxis().SetTitle("Signal (V)")
# mg2.GetYaxis().SetTitleOffset(1.2)
# mg2.GetXaxis().CenterTitle()
# mg2.GetYaxis().CenterTitle()
# # 
# d2.Update()
# # 
# legend1=TLegend(0.7,0.3,0.9,0.45)
# legend1.SetBorderSize(1)
# legend1.SetTextFont(32)
# legend1.SetTextSize(0.03)
# 
# legend1.AddEntry(detector18," Measurement","l")
# legend1.AddEntry(detector02," Reference","l")
# 
# legend1.Draw()
# legend1.SetFillColor(0)
# 
# d2.Modified()
# d2.Update()




