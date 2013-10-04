from ROOT import gROOT, TCanvas, TF1, TGraphPolar, TGraphPolargram
from math import *
import numpy, sys, math

c1=TCanvas("CPol","TGraphPolar Examples",500,500)
rmin=0
rmax=2*pi

  
p1=TF1("fplot","2-2*sin(x)+sin(x)*sqrt(abs(cos(x)))/(sin(x)+1.4)",rmin,rmax)
#p1=TF1("fplot","sin(x)*sin(x)",rmin,rmax)
p1.SetParameter(0, 1)
p1.SetParameter(1, 2)
p1.SetParameter(2, 8*pi)

r=numpy.ndarray([100.])
theta=numpy.ndarray([100.]) 

for i in range(0,100):
	r[i] =  i*(rmax-rmin)/100.
	theta[i] = p1.Eval(r[i])
	print r[i], theta[i]

gr1=TGraphPolar(100,r,theta)
gr1.SetLineColor(2)
gr1.SetTitle()
gr1.Draw("AOL")
c1.Update()
gr1.GetPolargram().SetRangeRadial(0,4)
gr1.GetPolargram().SetNdivPolar(8)
gr1.GetPolargram().SetNdivRadial(4)
#gr1.GetPolargram().SetRangeRadial(0,1)
c1.Update()
