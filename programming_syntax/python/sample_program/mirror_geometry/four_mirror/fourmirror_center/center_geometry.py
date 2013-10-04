#!/usr/bin/python

import sys
from math import *


def MirrorParameter(x_width, y_width, radius, thickness):

	# /*--------------------------------------------------
	# WL
	# Mirror Depth Calculation

	# length: horizontal distance from corner to center
	length = sqrt((x_width/2)**2 + (y_width/2)**2)
	# print "Check length: ", length

	# theta: is the center to corner angle, theta_x is the x midpoint to mirror center, theta_y is the y midpoint to mirror center.
	theta = asin(length/radius)
	theta_x = asin(x_width/(2*radius))
	theta_y = asin(y_width/(2*radius))

	#print "Angle Check (theta, theta_x, theta_y): ", degrees(theta), " " , degrees(theta_x), " " , degrees(theta_y)

	# z_depth: is the vertical distance from corner to center
	z_depth = radius - cos(theta)*radius + thickness/2

	small_dist_x = radius - radius*cos(theta_x) + thickness/2
	small_dist_y = radius - radius*cos(theta_y) + thickness/2

	# print "Mirror Depth Test: ", small_dist_x, " ", small_dist_y
	return {'length':length, 'z_depth':z_depth, 'small_dist_x':small_dist_x, 'small_dist_y':small_dist_y }


def MirrorCornerPosotion(i, x_width, y_width, z_depth, x_rad, y_rad, small_dist_x, small_dist_y, centerStart, centerEnd):

	dist = z_depth - small_dist_x
	distx = dist * sin(x_rad)
	disty = dist * sin(y_rad)
	distz = dist * cos(x_rad) * cos(y_rad)

	# print "Mirror Depth: ", z_depth, "    Small Distance: ", small_dist_x, "    Dist: ", dist , "    Distx: ", distx, "    Disty: ", disty , "    Distz: ", distz


	# /*--------------------------------------------------
	# WL
	# Calculate the Mirror Position

	x_coord = [0.0] * 5
	y_coord = [0.0] * 5
	z_coord = [0.0] * 5 

	# print x_coord, y_coord, x_coord[0], type(x_coord[2])


	# /*--------------------------------------------------
	# Y Position calculation
	y_left = centerStart[1] + cos(y_rad)*y_width/2
	y_right = centerStart[1] - cos(y_rad)*y_width/2

	# /*--------------------------------------------------
	# WL
	# Calculate the change in corner position respect to the tilt angle

	x_angle_change = (y_width/2.0) * sin(x_rad) * sin(y_rad)
	# y_angle_change = (y_width/2.0) * sin(y_rad)
	z_angle_change = (y_width/2.0) * sin(y_rad) * cos(x_rad)



	if i in (0 , 2):

		# /*-------------------------------------------------- 
		# WL
		# Defining the corner value
		# Corner 1

		x_coord[0] = centerStart[0] + distx + x_angle_change
		y_coord[0] = y_right
		z_coord[0] = centerStart[2] - distz - z_angle_change
	#	print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[1], " ", y_coord[1], " ", z_coord[1], "\n"

		# Corner 2
		x_coord[1] = centerEnd[0] + distx + x_angle_change
		y_coord[1] = y_right
		z_coord[1] = centerEnd[2] - distz - z_angle_change
	#	print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[2], " ", y_coord[2], " ", z_coord[2], "\n"

		# Corner 3
		x_coord[2] = centerStart[0] + distx - x_angle_change
		y_coord[2] = y_left
		z_coord[2] = centerStart[2] - distz + z_angle_change
	#	print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[3], " ", y_coord[3], " ", z_coord[3], "\n"

		# Corner 4
		x_coord[3] = centerEnd[0] + distx - x_angle_change
		y_coord[3] = y_left
		z_coord[3] = centerEnd[2] - distz + z_angle_change
	#	print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[4], " ", y_coord[4], " ", z_coord[4], "\n"

	elif (i == 1 or i == 3):
		# Corner 1
		x_coord[0] = centerStart[0] + distx - x_angle_change
#		y_coord[0] = y_right
		y_coord[0] = y_left
		z_coord[0] = centerStart[2] - distz + z_angle_change
	
		# Corner 2
		x_coord[1] = centerEnd[0] + distx - x_angle_change
#		y_coord[1] = y_right
		y_coord[1] = y_left
		z_coord[1] = centerEnd[2] - distz + z_angle_change

		# Corner 3
		x_coord[2] = centerStart[0] + distx + x_angle_change
#		y_coord[2] = y_left
		y_coord[2] = y_right
		z_coord[2] = centerStart[2] - distz - z_angle_change

		# Corner 4
		x_coord[3] = centerEnd[0] + distx + x_angle_change
#		y_coord[3] = y_left
		y_coord[3] = y_right
		z_coord[3] = centerEnd[2] - distz - z_angle_change


	return (x_coord, y_coord, z_coord)


def MirrorPosition(i, x_rad, y_rad, centerStart, centerEnd, small_dist_x):

	# /*--------------------------------------------------
	# WL
	# Determine the Center Position
	# Mirror Position in between the inner and outer surface

	MirrorPosition_x = fabs(centerEnd[0] - centerStart[0])/2.0 - small_dist_x * sin(x_rad) * cos(y_rad) + centerStart[0]
	MirrorPosition_y = centerStart[1] - small_dist_x * sin(y_rad)
	MirrorPosition_z = centerEnd[2] - fabs(centerEnd[2] - centerStart[2])/2.0 +  small_dist_x * cos(x_rad) * cos(y_rad)

	if i > 1:
		MirrorPosition_x = -fabs(centerEnd[0] - centerStart[0])/2.0 - small_dist_x * sin(x_rad) * cos(y_rad) + centerStart[0]
			


#	print "Mirror Center Position Between Inner and Outer Surface (x, y, z) (mm): ", MirrorPosition_x, MirrorPosition_y, MirrorPosition_z


	# /*--------------------------------------------------
	# Calculate the Fixed Position
	# Mirror Position for the center at the x depth 

	MirrorFix_x = fabs(centerEnd[0] - centerStart[0])/2.0  + centerStart[0]
	MirrorFix_y = centerStart[1]
	MirrorFix_z = centerEnd[2] - fabs(centerEnd[2] - centerStart[2])/2.0 

#	print "Mirror Center Position at the x depth from Surface (x, y, z) (mm): ", MirrorFix_x, MirrorFix_y, MirrorFix_z

	return(MirrorPosition_x, MirrorPosition_y, MirrorPosition_z)



def MirrorEdgeCenter(i, x_rad, y_rad, x_width, y_width, z_depth, small_dist_x, MirrorPosition):
	centerStart = [0.0] * 3
	centerEnd = [0.0] * 3

	dist = z_depth - small_dist_x
	distx = dist * sin(x_rad)
	disty = dist * sin(y_rad)
	distz = dist * cos(x_rad) * cos(y_rad)

	# /*--------------------------------------------------
	# WL
	#
	# Determining the CenterStart and CenterEnd

	centerStart[0] = MirrorPosition[0] - fabs(x_width * cos(x_rad))/2.0 + small_dist_x * sin(x_rad) * cos(y_rad) 
	centerStart[1] = MirrorPosition[1] + small_dist_x * sin(y_rad)
	centerStart[2] = MirrorPosition[2] + fabs(x_width * sin(x_rad))/2.0 - x_width * sin(x_rad) - small_dist_x * cos(x_rad) * cos(y_rad)

	if i > 1: 
		centerStart[0] = MirrorPosition[0] + fabs(x_width * cos(x_rad))/2.0 + small_dist_x * sin(x_rad) * cos(y_rad) 
		centerStart[2] = MirrorPosition[2] + fabs(x_width * sin(x_rad))/2.0 - fabs(x_width * sin(x_rad)) - small_dist_x * cos(x_rad) * cos(y_rad)

	# ----------------------------------------------------*/

	# Center end point 
	centerEnd[0] = centerStart[0] + x_width * cos(x_rad)
	centerEnd[1] = centerStart[1]
	centerEnd[2] = centerStart[2] + x_width * sin(x_rad)

	if i > 1: 
		centerEnd[0] = centerStart[0] - x_width * cos(x_rad)
		centerEnd[2] = centerStart[2] - x_width * sin(x_rad)

	return(centerStart, centerEnd)
