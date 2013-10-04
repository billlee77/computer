##############33
#In this eaxmple, we use different way to plot the data
#also we fitted function with the preset polynomial, chisquare and NDF are asses#sed
#The way of data reading is smarter also
#####

from numpy import *
from ROOT import TCanvas, TF1, TGraph
#import numpy

try:
	x = ndarray(4)
	y = ndarray(4)

	data_out = open('data.dat', 'r')
#	print data_out	
	num_it=0
	
	for e in data_out:
		num = e.split()
		print num
		x[num_it] = num[0]
		y[num_it] = num[1]
		num_it = num_it + 1

except IndexError:
	pass

#print x, y 

# A better approch to plot the points
c1 = TCanvas('c1', 'Linear Fit')
g1 = TGraph()

for xe,ye in zip(x,y):
	print xe, ye
	print type(xe)
	n = g1.GetN()
	g1.SetPoint(n,xe,ye)

g1.SetTitle('Linear Fit')
g1.Draw('AP')

fun1 = TF1()
g1.Fit('pol1')
fun1=g1.GetFunction('pol1')

fun1.GetParameter(0)
fun1.GetParameter(1)
at=fun1.GetChisquare()
ndf=fun1.GetNDF()

print at, ndf

c1.Update()
#c1.Modified()



