from numpy import *
from ROOT import gROOT, TCanvas, TF1, TGraph, TH1F, gStyle, TLegend, TPave, TMultiGraph, TAxis
from math import *
import numpy, sys, math


try:
	x=[]
	y=[]
	w=[]
	z=[]

	data_out = open('data.dat', 'r')
	print data_out
	Num_p=0	

	for line in data_out:
		num = line.split()
		x.append(float(num[0]))
		y.append(float(num[1]))
		w.append(float(num[2]))
		z.append(float(num[3]))

#		e = len(num)
#		for l in range(0,e):
#			bet = 'c' + str(l)
#			bet = []
#			bet.append(num[l])		
		Num_p=Num_p+1
	data_out.close()

except IndexError:
	pass

# print bet

x1 = numpy.array(x)
y1 = numpy.array(y)
w1 = numpy.array(w)
z1 = numpy.array(z)	

# print x	
# print y
# print x1
# print y1
#print type(x)
#print type(x1)

#print abs(x1-180) 
print y1/600
#print w1/600
#print z1/600

yconst = y1[len(x1)-1]/600
#print yconst
fin = y1/(600* yconst)
print fin

#print type(x1)
#print type(fin)
#print type(x1[1])
#print type(fin[0])

#sys.exit()



# # # ROOT plot 
c1 = TCanvas( 'c1', 'Compton Scattering', 200, 10, 700, 500 )

# gStyle.SetTitleX(0.5)
# gStyle.SetTitleAlign(23)
# 

# TMultiGraph *mg new TMultiGraph()

gr1=TGraph(Num_p,x1,fin)
gr1.SetTitle("C(#theta)/C(90#circ) vs #theta")
#gr1.SetTitle().CenterTitle()
gr1.GetXaxis().SetTitle("Angle #theta Between Detectors (#circ)")
gr1.GetYaxis().SetTitle("C(#theta)/C(90#circ)")
gr1.GetXaxis().CenterTitle()
gr1.GetYaxis().CenterTitle()
gr1.GetYaxis().SetLimits(1,1.2)
gr1.GetYaxis().SetLimits(0,100)
gr1.SetMaximum(1.18)
gr1.SetMinimum(1)
gr1.Draw("AP")


# mg=TMultiGraph()
# mg.SetName("")
# mg.SetTitle("")
# 
# mg.Add(gr1,"")
# mg.SetMaximum(1.16)
# mg.SetMinimum(1)
# # mg.TAxis.GetXaxis().CenterTitle()
# # mg.TAxis.GetYaxis().CenterTitle()
# mg.Draw("AP")
# mg.TAxis.GetXaxis().SetTitle("Angle #theta Between Detectors (#circ)")
# mg.TAxis.GetYaxis().SetTitle("C(#theta)/C(90#circ)")
# c1.Modified()
# c1.cd()
# c1.SetSelected(c1)

# # Electron rest mass 0.505 MeV/c^2 or 505 keV/c^2
# m  = 0.5
# E1 = 0.662
# A = 1/E1

#fun1 = TF1( 'fun1', 'abs(sin(x)/x)', 0, 10 )
fun1 = TF1( 'fun1', '[0]+[1]*cos(3.14*x/180)*cos(3.14*x/180) + [2]*cos(3.14*x/180)^4', 0, 2000 )
fun1.SetParameter(0, 1)
fun1.SetParameter(1, 0.125)
fun1.SetParameter(2, 0.042)
fun1.SetLineColor(2)
fun1.Draw("psame")

gr1.Fit('fun1')


legend=TLegend(0.6,0.2,0.8,0.4)
legend.SetBorderSize(2)
legend.SetTextFont(72)
legend.SetTextSize(0.04)
legend.AddEntry(gr1,"Experiment","p")
legend.AddEntry(fun1,"Theory","l")
legend.Draw()
legend.SetFillColor(0)
#TPave.SetBorderSize(0)
   
c1.SaveAs("graph.eps")
c1.cd()


