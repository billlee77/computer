#!/usr/bin/python

from ROOT import gROOT, TCanvas, TF1, TGraph, TH1F, gStyle
import numpy, sys

try:
	# Method 4 line read
	x = numpy.ndarray([5.])
	y = numpy.ndarray([5.])
	e = 0

	f = open('data.dat', 'r')
	for data2 in f:

		num = data2.split()
		a = float(num[0])
		b = float(num[1])

		x[e] = a
		y[e] = b
		e = e+1 	
	f.closed

except IndexError, z:
	pass

print x
print y

print type(x)
print type(x[1])

t=[]
o=[]

t[:]=x
o[:]=y

# #
# print t 
# print o 
# 
# h= numpy.ndarray([5.])
# 
# 


h = numpy.array(t[:])

# print type(x[1])
# print type(t[1])
# 
# print type(t)
# print type(h)

print type(x)
print type(h)

print type(x[2])
print type(h[2])

print x
print h 

#sys.exit()

# # # ROOT plot 
c1 = TCanvas( 'c1', 'Example with Formula', 200, 10, 700, 500 )

# gStyle.SetTitleX(0.5)
# gStyle.SetTitleAlign(23)
# 

gr1=TGraph(e, h, y)
gr1.SetTitle("This is title")
#gr1.SetTitle().CenterTitle()
gr1.GetXaxis().SetTitle("X-Axis")
gr1.GetYaxis().SetTitle("Y-Axis")
gr1.GetXaxis().CenterTitle()
gr1.GetYaxis().CenterTitle()

gr1.Draw("AP")
c1.Update()

c1.SaveAs("graph.eps")
c1.cd()
