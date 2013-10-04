#!/usr/bin/python

# from numpy import*
# x0 = []
# 
# for line in file('helium.dat'):
# 	line = line.lstrip('He')
# 	line_list = [float(x) for x in line.split()]
# 	x0.append(line_list)
#        
# for i in range(len(x0)):
# 	print array(x0[i]).item()


#************************
#One way
# def main():
# 	x0 = []
# 
# try:
# 	for line in file('helium.dat'):
# 		num = line.split()
# 		x = num[1]
# 		print x
# except IndexError, e:
# 	pass #print 

#***************8
#a better way


def main():
	x0 = []

try:
	x = []
	y = []
	for line in file('data.dat'):
		num = line.split()
		a = num[0]
		b = num[1]
		#print a, b
		x.append(a)
		y.append(b)
	#print x
	#print y

except IndexError, e:
	pass #print 
