#!/usr/bin/python
mydata = ['Hello World!', 'The total value = $1820.00'] 
myfile = open('testit.txt', 'w')

for line in mydata:
#	print line
	myfile.write(line + '\n')
myfile.close()

#myfile = open("testit.txt")
#myfile.read()
#myfile.close()

myfile = open("testit.txt", "r+")
	for line in mydata:
	myfile.write(line + '\n')

myfile.seed(0)
myfile.read()
myfile.close()

myfile = open("test.txt", "r+a")
myfile.read()
for line in mydata:
	myfile.write(line + '\n')
myfile.close()
