#!/usr/bin/python

import sys, center_geometry, string
from math import *


option = raw_input('Please specify the starting points. For Mirror Center enter mc, for Edge Center do nothing: ')
print option

try:

	list = []
	data = []

	f = open('center.dat','r')

	if (option == 'mc'):
		f = open('centercenter.dat','r')

	for line in f.read().split('\n'):

		if line[0] != '#' :
			list.append(line)
			print line
	f.close()

except IndexError, z:
	pass


# /*--------------------------------------------------
# WL
# Filltering out all the comment line in the configuration file
# and push numbers into a list
# Also doing same splitting
for i in range(0, len(list)):
	data.append(map(float, list[i].split(":")[1].split(",")))
	# element[i] = i


# ----------------------------------------------------*/
# WL
# Data List Definition
# Names	should be straight forward
centerStart = [[0 for col in range(3)] for row in range(4) ]
centerEnd 	= [[0 for col in range(3)] for row in range(4) ]
angle		= [[0 for col in range(2)] for row in range(4) ]
x_coord		= [[0 for col in range(4)] for row in range(4) ]
y_coord	 	= [[0 for col in range(4)] for row in range(4) ]
z_coord		= [[0 for col in range(4)] for row in range(4) ]
MirrorPosition		= [[0 for col in range(3)] for row in range(4) ]


# /*--------------------------------------------------
# WL
# Assigning the parameters
#
# Length and width
x_width = float(data[0][0])
y_width = float(data[0][1])

# Thickness
thickness = float(data[1][0])

# Thickness
radius = float(data[2][0])



# Start Position Mirror 1-4
if (option != 'mc'):
	centerStart[0] = data[3]
	centerStart[1] = data[5]
	centerStart[2] = data[7]
	centerStart[3] = data[9]

else:
	MirrorPosition[0] = data[3]
	MirrorPosition[1] = data[5]
	MirrorPosition[2] = data[7]
	MirrorPosition[3] = data[9]


#Angle Assignment 1-4
angle[0] = data[4]
angle[1] = data[6]
angle[2] = data[8]
angle[3] = data[10]




for i in range(0,4):

# 	if (i > 1):
# 		x_width = 572.8
# 


	# /*--------------------------------------------------
	# WL
	# Calculate Some Parameters which are Independent of Mirror Tilt and Position

	para_result = center_geometry.MirrorParameter(x_width, y_width, radius, thickness)
	
	length = para_result['length']
	z_depth = para_result['z_depth']
	small_dist_x = para_result['small_dist_x']
	small_dist_y = para_result['small_dist_y']
	
	# Degree to Radian
	x_rad = radians(angle[i][0])
	y_rad = radians(angle[i][1])
	

	if (option == 'mc'):
		centerStart[i], centerEnd[i] = center_geometry.MirrorEdgeCenter(i, x_rad, y_rad, x_width, y_width, z_depth, small_dist_x, MirrorPosition[i])
	
	else:
	# Center end point 
		centerEnd[i][0] = centerStart[i][0] + x_width * cos(x_rad)
		centerEnd[i][1] = centerStart[i][1]
		centerEnd[i][2] = centerStart[i][2] + x_width * sin(x_rad)

		# This is just for the Mirror 3 and 4
		if i > 1: 
				centerEnd[i][0] = centerStart[i][0] - x_width * cos(x_rad)
				centerEnd[i][2] = centerStart[i][2] - x_width * sin(x_rad)

	# print "X Center Position Check: ", centerStart[i][0], " ", centerEnd[i][0]


	# print "Check radians: ", radians(x_angle),  "   X Center End : ", x_center_end, "   Y Center End : ", y_center_end, "   Z Center End : ", z_center_end 

	# Determine the corner position
	x_coord[i], y_coord[i], z_coord[i] = center_geometry.MirrorCornerPosotion(i, x_width, y_width, z_depth, x_rad, y_rad, small_dist_x, small_dist_y, centerStart[i], centerEnd[i])	

	# Determine the Mirror Position
	MirrorPosition[i] = center_geometry.MirrorPosition(i, x_rad, y_rad, centerStart[i], centerEnd[i], small_dist_x)
	#print MirrorPosition


	# /*--------------------------------------------------
	# WL
	# Outputing All Calculated Values
	print "\n/*--------------------------------------------------"
	print "Mirror", i+1 , ": "
	print "The Center Start Point: ", centerStart[i][0], " ", centerStart[i][1], " ", centerStart[i][2]
	print "The Center Start Point: ", centerEnd[i][0], " ", centerEnd[i][1], " ", centerEnd[i][2]
	print "Mirror Tilt Angle X, Y: ", angle[i][0], " ", angle[i][1]
	print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[i][0], " ", y_coord[i][0], " ", z_coord[i][0]
	print "The Corner 2 of the mirror is at (x, y, z) (mm): ", x_coord[i][1], " ", y_coord[i][1], " ", z_coord[i][1]
	print "The Corner 3 of the mirror is at (x, y, z) (mm): ", x_coord[i][2], " ", y_coord[i][2], " ", z_coord[i][2]
	print "The Corner 4 of the mirror is at (x, y, z) (mm): ", x_coord[i][3], " ", y_coord[i][3], " ", z_coord[i][3]
	print "Mirror Center Position (x, y, z) (mm): ", MirrorPosition[i][0], MirrorPosition[i][1], MirrorPosition[i][2]



# End
sys.exit(0)
