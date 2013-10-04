#!/usr/bin/python
from pyx import *
from pyx.graph import axis
from scipy import stats
import array
import numpy
import sys

from math import pi, cos
from pyx.style import linewidth, linestyle
from pyx.graph import graphxy
from pyx.graph.axis import linear
from pyx.graph.axis.painter import regular
from pyx.graph.style import line
from pyx.graph.data import function

from pyx.deco import barrow, earrow


# Data Read out!

def convertStr(s):
	"""Convert string to either int or float."""

	try:
		ret = int(s)

	except ValueError:
		#Try float.
		ret = float(s) 
	return ret

def main():
	x0 = []

try:
	x = []
	y = []
	for line in file('data.dat'):
		num = line.split()
		a = convertStr(num[0])
		b = convertStr(num[1])
		#print a, b
		x.append(a)
		y.append(b)
	#print x
	#print y
	

	#print x
	#print type(x)
	#x = numpy.array
	#print x[1], type(x[1])
	

except IndexError, e:
	pass #print 



#sys.exit()


text.preamble(r"\parindent=0pt")

mypainter = regular(basepathattrs=[earrow.normal], titlepos=0.5, 
	labeldist="0.3", titledist="0.2")

g = graph.graphxy(height=10, width=15,
                  x=graph.axis.linear(title=r"Time Delay ($\mu$s)", density = 3, painter = mypainter),
                  y=graph.axis.linear(title="TDC Counts", density =2,
painter = mypainter))


g.plot(graph.data.file("data.dat", x=1, y=2), 
# Define symbol & color
	styles=[graph.style.symbol(graph.style.symbol.plus, size=0.4, symbolattrs=[color.palette.Rainbow])])


#******************
#Linear regression linefit
gradient, intercept, r_value, p_value, std_err = stats.linregress(x,y)
print "Gradient and intercept", gradient, intercept

gad = gradient
inte = intercept

print gad, inte
#*********************

#f=gad *x +inte


#Function Created
def f(k): return gad*k + inte
#g.plot(graph.data.function("y2(x)= gad*x + inte"))
#Function input
g.plot(graph.data.function("y2(x)= fit(x)", context={"fit": f}))

#g.plot(graph.data.function("y2(x)= f(x, 1)", context=locals()))

#Text

#String1 = gad + '* t' + '+' + inte

# Significant figure & number to string convertion
String1 = str(round(gad,3))+r'\times t' + str(round(inte,3))
print String1

# Create a text based on string createed
g.text(g.pos(5,8)[0],6, String1 , [text.halign.center, text.mathmode])

#Title Created
g.text(g.width/2, g.height + 0.2, "TDC Counts vs Time Delay", 
       [text.halign.center, text.valign.bottom, text.size.Large])

g.writeEPSfile("min")


