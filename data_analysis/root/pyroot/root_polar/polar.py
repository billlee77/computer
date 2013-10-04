from ROOT import gROOT, TCanvas, TF1, TGraphPolar, TGraphPolargram
from math import *
import numpy, sys, math

c1=TCanvas("part1","TGraphPolar Examples",500,500)
c2=TCanvas("part2","TGraphPolar Examples",500,500)
rmin=0
rmax=2*pi
#r[1000]
#theta[1000]
#print rmin, rmax

  
p1=TF1("fplot","sin(x)^2",rmin,rmax)
#p1=TF1("fplot","sin(x)*sin(x)",rmin,rmax)
p1.SetParameter(0, 1)
p1.SetParameter(1, 2)
p1.SetParameter(2, 8*pi)

#print p1

r=numpy.ndarray([100.])
theta=numpy.ndarray([100.]) 
r1=numpy.ndarray([100.])
theta1=numpy.ndarray([100.]) 


for i in range(0,100):
#	print i
	r[i] =  i*(rmax-rmin)/100.
#	r[i] =  i + 1
#	r[i]=i*(rmax-rmin)/1000. + rmin
#	print r[i]	
#	r[ipt] = ipt*(rmax-rmin)/1000+rmin
	theta[i] = p1.Eval(r[i])
#	print theta[i]
	print r[i], theta[i]

#r1 = numpy.array(r)
#theta1 = numpy.array(theta)

#print type(r1)#, type(r)


#print r1, theta1

c1.cd()
gr1=TGraphPolar(100,r,theta)
gr1.SetLineColor(2)
gr1.SetTitle()
#gr1.SetMaximum(1)
#gr1.GetYaxis().SetLimits(0,1)
#gr1.GetYaxis().SetLimits(0,100)
#gr1.SetMaximum(1)
gr1.Draw("AOL")
c1.Update()
gr1.GetPolargram().SetNdivPolar(8)
gr1.GetPolargram().SetNdivRadial(2)
gr1.GetPolargram().SetRangeRadial(0,1)
c1.Update()




#c2.Update()
c2.cd()
p2=TF1("fplot","cos(x)*cos(x) +1",rmin,rmax)
for i in range(0,100):
#	print i
	r1[i] =  i*(rmax-rmin)/100.
#	r[i] =  i + 1
#	r[i]=i*(rmax-rmin)/1000. + rmin
#	print r[i]	
#	r[ipt] = ipt*(rmax-rmin)/1000+rmin
	theta1[i] = p2.Eval(r[i])
#	print theta[i]
	print r1[i], theta[i]
gr2=TGraphPolar(100,r1,theta1)
gr2.SetLineColor(2)
gr2.SetTitle()
#gr1.SetMaximum(1)
#gr1.GetYaxis().SetLimits(0,1)
#gr1.GetYaxis().SetLimits(0,100)
#gr1.SetMaximum(1)
gr2.Draw("AOL")

c2.Update()
gr2.GetPolargram().SetRangeRadial(0,2)
gr2.GetPolargram().SetNdivPolar(8)
gr2.GetPolargram().SetNdivRadial(2)
c2.Update()

c1.SaveAs("part1.eps")
c2.SaveAs("part2.eps")
