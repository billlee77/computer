#!/usr/bin/python

import sys
from math import *

# print raw_input('Starting Mirror Center Position: ')

x_width = float(raw_input('Mirror Center X Direction: '))
print x_width

y_width = float(raw_input('Mirror Length Y Direction: '))
print y_width

thickness = float(raw_input('Mirror thickness: '))
print thickness

radius = float(raw_input('Mirror radius: '))
print radius

MirrorPosition_x = float(raw_input('Starting Mirror Center Position X: '))
print MirrorPosition_x 
 
MirrorPosition_y = float(raw_input('Starting Mirror Center Position Y: '))
print MirrorPosition_y

MirrorPosition_z = float(raw_input('Starting Mirror Center Position Z: '))
print MirrorPosition_z

x_angle = float(raw_input('Mirror Tilt Angle on X-Z plane: '))
print x_angle

y_angle = float(raw_input("Mirror Tilt Angle on X-Z plane: "))
print y_angle

mirror_number = float(raw_input("What Mirror do you want to look at? "))
print mirror_number

# /*--------------------------------------------------
# Definition of the fixed points
x_rad = radians(x_angle)
y_rad = radians(y_angle)

# # Center end point 
# x_center_end = x_center_start + x_width * cos(x_rad)
# y_center_end = y_center_start
# z_center_end = z_center_start + x_width * sin(x_rad)
 
# print "Check radians: ", radians(x_angle), radians(y_angle), "   X Center End : ", x_center_end, "   Y Center End : ", y_center_end, "   Z Center End : ", z_center_end 


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

# print "Angle Check (theta, theta_x, theta_y): ", degrees(theta), " " , degrees(theta_x), " " , degrees(theta_y)

# z_depth: is the vertical distance from corner to center
z_depth = radius - cos(theta)*radius + thickness/2

small_dist_x = radius - radius*cos(theta_x) + thickness/2
small_dist_y = radius - radius*cos(theta_y) + thickness/2

dist = z_depth - small_dist_x
distx = dist * sin(x_rad)
disty = dist * sin(y_rad)
distz = dist * cos(x_rad) * cos(y_rad)


# print "Mirror Depth: ", z_depth, "    Small Distance: ", small_dist_x, "    Dist: ", dist , "    Distx: ", distx, "    Disty: ", disty , "    Distz: ", distz

# /*--------------------------------------------------
# WL
#
# Determining the CenterStart and CenterEnd


x_center_start = MirrorPosition_x - fabs(x_width * cos(x_rad))/2.0 + small_dist_x * sin(x_rad) * cos(y_rad) 
y_center_start = MirrorPosition_y + small_dist_x * sin(y_rad)
z_center_start = MirrorPosition_z + fabs(x_width * sin(x_rad))/2.0 - x_width * sin(x_rad) - small_dist_x * cos(x_rad) * cos(y_rad)

if mirror_number > 2: 
	x_center_start = MirrorPosition_x + fabs(x_width * cos(x_rad))/2.0 + small_dist_x * sin(x_rad) * cos(y_rad) 
	z_center_start = MirrorPosition_z + fabs(x_width * sin(x_rad))/2.0 - fabs(x_width * sin(x_rad)) - small_dist_x * cos(x_rad) * cos(y_rad)

# ----------------------------------------------------*/

# Center end point 
x_center_end = x_center_start + x_width * cos(x_rad)
y_center_end = y_center_start
z_center_end = z_center_start + x_width * sin(x_rad)

if mirror_number > 2: 
	x_center_end = x_center_start - x_width * cos(x_rad)
	z_center_end = z_center_start - x_width * sin(x_rad)


# /*--------------------------------------------------
# WL
# Calculate the Mirror Position

x_coord = [0.0] * 5
y_coord = [0.0] * 5
z_coord = [0.0] * 5 

# print x_coord, y_coord, x_coord[0], type(x_coord[2])


# /*--------------------------------------------------
# Y Position calculation
y_left = y_center_start + cos(y_rad)*y_width/2
y_right = y_center_start - cos(y_rad)*y_width/2



# /*--------------------------------------------------
# WL
# Calculate the change in corner position respect to the tilt angle

x_angle_change = (y_width/2.0) * sin(x_rad) * sin(y_rad)
# y_angle_change = (y_width/2.0) * sin(y_rad)
z_angle_change = (y_width/2.0) * sin(y_rad) * cos(x_rad)

# /*-------------------------------------------------- 
# WL
# Defining the corner value
# Corner 1

# x_coord[1] = x_center_start + distx + x_angle_change
# y_coord[1] = y_right
# z_coord[1] = z_center_start - distz - z_angle_change
# #print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[1], " ", y_coord[1], " ", z_coord[1], "\n"
# 
# # Corner 2
# x_coord[2] = x_center_end + distx + x_angle_change
# y_coord[2] = y_right
# z_coord[2] = z_center_end - distz - z_angle_change
# #print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[2], " ", y_coord[2], " ", z_coord[2], "\n"
# 
# # Corner 3
# x_coord[3] = x_center_start + distx - x_angle_change
# y_coord[3] = y_left
# z_coord[3] = z_center_start - distz + z_angle_change
# #print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[3], " ", y_coord[3], " ", z_coord[3], "\n"
# 
# # Corner 4
# x_coord[4] = x_center_end + distx - x_angle_change
# y_coord[4] = y_left
# z_coord[4] = z_center_end - distz + z_angle_change
# #print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[4], " ", y_coord[4], " ", z_coord[4], "\n"



if mirror_number in (1 , 3):

	# /*-------------------------------------------------- 
	# WL
	# Defining the corner value
	# Corner 1

	x_coord[0] = x_center_start + distx + x_angle_change
	y_coord[0] = y_right
	z_coord[0] = z_center_start - distz - z_angle_change
#	print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[1], " ", y_coord[1], " ", z_coord[1], "\n"

	# Corner 2
	x_coord[1] = x_center_end+ distx + x_angle_change
	y_coord[1] = y_right
	z_coord[1] = z_center_end - distz - z_angle_change
#	print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[2], " ", y_coord[2], " ", z_coord[2], "\n"

	# Corner 3
	x_coord[2] = x_center_start + distx - x_angle_change
	y_coord[2] = y_left
	z_coord[2] = z_center_start - distz + z_angle_change
#	print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[3], " ", y_coord[3], " ", z_coord[3], "\n"

	# Corner 4
	x_coord[3] = x_center_end + distx - x_angle_change
	y_coord[3] = y_left
	z_coord[3] = z_center_end - distz + z_angle_change
#	print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[4], " ", y_coord[4], " ", z_coord[4], "\n"

elif (mirror_number == 2 or mirror_number == 4):
	# Corner 1
	x_coord[0] = x_center_start + distx - x_angle_change
#		y_coord[0] = y_right
	y_coord[0] = y_left
	z_coord[0] = z_center_start- distz + z_angle_change

	# Corner 2
	x_coord[1] = x_center_end + distx - x_angle_change
#		y_coord[1] = y_right
	y_coord[1] = y_left
	z_coord[1] = z_center_end - distz + z_angle_change

	# Corner 3
	x_coord[2] = x_center_start + distx + x_angle_change
#		y_coord[2] = y_left
	y_coord[2] = y_right
	z_coord[2] = z_center_start - distz - z_angle_change

	# Corner 4
	x_coord[3] = x_center_end + distx + x_angle_change
#		y_coord[3] = y_left
	y_coord[3] = y_right
	z_coord[3] = z_center_end - distz - z_angle_change





print "Center Start (x,y,z): ", x_center_start,  y_center_start, z_center_start
print "Center End (x,y,z): ", x_center_end,  y_center_end, z_center_end 
print "The Corner 1 of the mirror is at (x, y, z) (mm): ", x_coord[0], y_coord[0], z_coord[0]
print "The Corner 2 of the mirror is at (x, y, z) (mm): ", x_coord[1], y_coord[1], z_coord[1]
print "The Corner 3 of the mirror is at (x, y, z) (mm): ", x_coord[2], y_coord[2], z_coord[2]
print "The Corner 4 of the mirror is at (x, y, z) (mm): ", x_coord[3], y_coord[3], z_coord[3]

print "Mirror Center Position Between Inner and Outer Surface (x, y, z) (mm): ", MirrorPosition_x, MirrorPosition_y, MirrorPosition_z




# /*--------------------------------------------------
#  * WL
#  * Original
# MirrorPosition_x = fabs(x_center_end - x_center_start)/2.0 - small_dist_x * sin(x_rad) + x_center_start
# MirrorPosition_y = y_center_start - small_dist_y * sin(y_rad)
# MirrorPosition_z = z_center_end - fabs(z_center_end - z_center_start)/2.0 +  small_dist_x * cos(x_rad)
# 
# print "Mirror Center Position Between Inner and Outer Surface (x, y, z) (mm): ", MirrorPosition_x, MirrorPosition_y, MirrorPosition_z


# # /*--------------------------------------------------
# # Calculate the Fixed Position
# # Mirror Position for the center at the x depth 
# 
# MirrorFix_x = fabs(x_center_end - x_center_start)/2.0  + x_center_start
# MirrorFix_y = y_center_start
# MirrorFix_z = z_center_end - fabs(z_center_end - z_center_start)/2.0 
# 
# print "Mirror Center Position at the x depth from Surface (x, y, z) (mm): ", MirrorFix_x, MirrorFix_y, MirrorFix_z


# 
# 
# # /*--------------------------------------------------
# # Different ways to define array size
# # x_start = [0.0] * 4
# # y = [[0]*2 for i in xrange(2)]
# # a = array.array('i', xrange(5))
# # age = [0 for x in range(4)]
