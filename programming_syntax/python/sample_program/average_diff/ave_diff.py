import numpy, math

file = open('data.dat', 'r')

total = 0.0 
itt = 0.0

numlist=[]

for num in file:
	float(num)
	total = total + float(num) 
	itt = itt+1
	numlist.append(float(num))

	

ave = total/itt 

print ave 

print numlist

diff_2 = 0.0

for num in numlist:
	diff_2 = diff_2 + (ave-num)**2

stad_div = math.sqrt(diff_2/itt)

print diff_2

print "Average is : ", ave, "\n", "Standard Deviation : ", stad_div



