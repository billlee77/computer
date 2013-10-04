#! /usr/bin/perl

#-------------------------------------------------- 
# Author: Wenliang Li 	initial: WL
# Date: 15/June/2011
# Program Name: mirror_geometry.pl
# 
#--------------------------------------------------*/    

use strict;
use Math::Trig;
use warnings;

sub corner_cal(){

print ("Enter Mirror Length X Direction: ");
my $x_width = <STDIN>;

print ("Enter Mirror Length Y Direction: ");
my $y_width = <STDIN>;

print ("Mirror thickness: ");
my $thickness = <STDIN>;

print ("Mirror Radius: ");
my $radius = <STDIN>;

print ("X Coodinate for the Mirror: ");
my $x = <STDIN>; 

print ("Y Coodinate for the Mirror: ");
my $y = <STDIN>; 

print ("Z Coodinate for the Mirror: ");
my $z = <STDIN>; 

print ("Enter Mirror Tilt Angle on X-Z plane: ");
my $x_angle = <STDIN>;

print ("Enter Mirror Tilt Angle on X-Z plane: ");
my $y_angle = <STDIN>;

chop($x_width, $y_width, $thickness, $x, $y, $z, $x_angle, $y_angle);



print "\n\n",
	  "Starting Mirror Center Position X: ", $x_width, "\n", 
      "Starting Mirror Center Position Y: ", $y_width, "\n", 
      "Starting Mirror Center Position Z: ", $thickness, "\n", 
      "Angle Check (theta, theta_x, theta_y):", $x, $y, $z, "\n", 
	  "Mirror Tilt Angle on X-Z plane: ", $x_angle, "\n", 
	  "Mirror Tilt Angle on X-Z plane: ", $y_angle, "\n";


# /*--------------------------------------------------
# WL
# Angle Conversion

my $x_rad = deg2rad($x_angle);
my $y_rad = deg2rad($y_angle);

# /*-------------------------------------------------- 
# WL
#
# Coordinate definition for Each corner
my @x_coord = ();
my @y_coord = ();
my @z_coord = ();

foreach my $i ( 1 .. 4) {
	$x_coord[$i] = 0;
	$y_coord[$i] = 0;
	$z_coord[$i] = 0;
}




# /*--------------------------------------------------
# WL
# Defining the corner value
# Corner 1
#
$x_coord[1] = sprintf("%.2f", $x); 
$y_coord[1] = sprintf("%.2f", $y);
$z_coord[1] = sprintf("%.2f", $z);
print "The Corner 1 of the mirror is at (x, y, z) (mm): ", $x_coord[1], "    ", $y_coord[1], "    ", $z_coord[1], "\n";

# Corner 2
# Round number to 3 digits after decimal point
# $rounded = sprintf("%.3f", $number);

$x_coord[2] = $x + $x_width * cos($x_rad);
$y_coord[2] = $y;
$z_coord[2] = $z + $x_width * sin($x_rad) ;

$x_coord[2] = sprintf("%.2f", $x_coord[2]); 
$y_coord[2] = sprintf("%.2f", $y_coord[2]);
$z_coord[2] = sprintf("%.2f", $z_coord[2]);
print "The Corner 2 of the mirror is at (x, y, z) (mm): ", $x_coord[2], "    ", $y_coord[2], "    ", $z_coord[2], "\n";

# Corner 3

$x_coord[3] = $x -  $y_width * sin($x_rad) * sin($y_rad);
$y_coord[3] = $y + $y_width * cos($y_rad);
#$z_coord[3] = $z + $x_width * cos($x_rad) * sin($y_rad) ;
$z_coord[3] = $z + $y_width * cos($x_rad) * sin($y_rad) ;

$x_coord[3] = sprintf("%.2f", $x_coord[3]); 
$y_coord[3] = sprintf("%.2f", $y_coord[3]);
$z_coord[3] = sprintf("%.2f", $z_coord[3]);
print "The Corner 3 of the mirror is at (x, y, z) (mm): ", $x_coord[3], "    ", $y_coord[3], "    ", $z_coord[3], "\n";

# Corner 4

# $x_coord[4] = $x + $x_width * cos($y_rad) * cos($x_rad) + $y_width * cos($x_rad) * sin($y_rad);
# $y_coord[4] = $y + $y_width * cos($y_rad)  - $x_width * sin($y_rad);
# $z_coord[4] = $z + $x_width * sin($x_rad) * cos($y_rad)  + $y_width * sin($y_rad) * sin($x_rad);

#$x_coord[4] = $x + $x_width * cos($x_rad) + $y_width * sin($y_rad)* sin($x_rad);
$x_coord[4] = $x + $x_width * cos($x_rad) - $y_width * sin($x_rad) * sin($y_rad);
$y_coord[4] = $y + $y_width * cos($y_rad);
$z_coord[4] = $z + $y_width * cos($x_rad) * sin($y_rad) + $x_width * sin($x_rad) ;

$x_coord[4] = sprintf("%.2f", $x_coord[4]); 
$y_coord[4] = sprintf("%.2f", $y_coord[4]);
$z_coord[4] = sprintf("%.2f", $z_coord[4]);
print "The Corner 4 of the mirror is at (x, y, z) (mm): ", $x_coord[4], "    ", $y_coord[4], "    ", $z_coord[4], "\n";

# ----------------------------------------------------*/


# /*--------------------------------------------------
# WL
# Mirror Depth Calculation

my $length = sqrt( ($x_width/2) ** 2 + ($y_width/2) ** 2 );

print "Check length: ", $length, "\n";

# theta: is the center to corner angle, theta_x is the x midpoint to mirror center, theta_y is the y midpoint to mirror center.

my $theta = asin($length / $radius); 
my $theta_x = asin($x_width/(2*$radius));
my $theta_y = asin($y_width/(2*$radius));

print "Angle Check (theta, theta_x, theta_y): ", rad2deg($theta), " " , rad2deg($theta_x), " " , rad2deg($theta_y), "\n";


my $z_depth = $radius - cos($theta) * $radius + $thickness/2; 

my $small_dist_x = $radius - $radius * cos($theta_x) + $thickness/2;
my $small_dist_y = $radius - $radius * cos($theta_y) + $thickness/2;

my $dist = $z_depth - $small_dist_x;
my $distx = $dist * sin($x_rad);
my $disty = $dist * sin($y_rad);
my $distz = $dist * cos($x_rad) * cos($y_rad);


print "Mirror Depth: ", $z_depth, "    Small Distance: ", $small_dist_x, "    Dist: ", $dist , 
"    Distx: ", $distx, "    Disty: ", $disty , "    Distz: ", $distz , "\n";


# /*--------------------------------------------------
# WL
# Center Start and end definition 

# Z coordinate Top

my $x_center_start = $x - abs($x_coord[3] - $x_coord[1]) / 2.0 - $distx ;
my $y_center_start = abs($y_coord[3] - $y_coord[1]) / 2.0 + $y;
my $z_center_start = abs($z_coord[3] - $z_coord[1]) / 2.0 + $distz + $z;

my $x_center_end = $x_center_start + $x_width * cos($x_rad);
my $y_center_end = $y_center_start;
my $z_center_end = $z_center_start + $x_width * sin($x_rad);


print "Center Start (X, Y, Z):  ", $x_center_start, "  ", $y_center_start, "  ", $z_center_start, "\n";
print "Center Start (X, Y, Z):  ", $x_center_end, "  ", $y_center_end, "  ", $z_center_end, "\n";


my $MirrorPosition_x = abs($x_center_end - $x_center_start)/2.0 - $small_dist_x * sin($x_rad) * cos($y_rad) + $x_center_start;
my $MirrorPosition_y = $y_center_start - $small_dist_x * sin($y_rad);
my $MirrorPosition_z = $z_center_end - abs($z_center_end - $z_center_start)/2.0 +  $small_dist_x * cos($x_rad) * cos($y_rad);

print "Mirror Center Position Between Inner and Outer Surface (x, y, z) (mm): ", $MirrorPosition_x, "  ",  $MirrorPosition_y, "  ", $MirrorPosition_z , "\n";
 


# /*--------------------------------------------------
# Calculate the Fixed Position
# Mirror Position for the center at the x depth 

my $MirrorFix_x = abs($x_center_end - $x_center_start)/2.0  + $x_center_start;
my $MirrorFix_y = $y_center_start;
my $MirrorFix_z = $z_center_end - abs($z_center_end - $z_center_start)/2.0;

print "Mirror Center Position at the x depth from Surface (x, y, z) (mm): ", $MirrorFix_x, "  ", $MirrorFix_y, "  ", $MirrorFix_z , "\n";





# # /*--------------------------------------------------
# WL 
# Old Section
#
# # Z coordinate Top
# my $z_top = $z + $x_width * sin($x_rad) ;
# # Z coordinate Left
# my $z_left = $z + $y_width * sin($y_rad) ;
# # Z coordinate Oppsite
# my $z_opp = $z + $x_width * sin($x_rad) + $y_width * sin($y_rad) ;
# 
# 
# 
# #print "Angle Check: ", $x_rad , "  ", $x_angle, "\n";
# 
# #print "Top X coordinate: ", $x_top, " ", $y_left,  "\n";
# 
# # Corner 1 
# 
# 
# # /*--------------------------------------------------
# # WL
# # Mirror Depth Calculation
# 
# # length: horizontal distance from corner to center
# my $length = sqrt(($x_width/2)**2 + ($y_width/2)**2);
# 
# print "Check length: " , $length, "\n";
# # theta: is the center to corner angle, theta_x is the x midpoint to mirror center, theta_y is the y midpoint to mirror center.
# my $theta = asin($length/$radius);
# my $theta_x = asin($x_width/(2*$radius));
# my $theta_y = asin($y_width/(2*$radius));
# 
# print "Angle Check (theta, theta_x, theta_y): ", rad2deg($theta), " " , rad2deg($theta_x), " " , rad2deg($theta_y), "\n";
# 
# # z_depth: is the vertical distance from corner to center
# # $z_depth = $radius - cos($theta)*$radius + $thickness;
# my $z_depth = $radius - cos($theta)*$radius ;
# 
# #print "length : ", $length, "cos check : ", $theta, "\n";
# 
# 
# 
# 
# 
# 
# # /*--------------------------------------------------*/    
# 
# # Rotation 
# my $small_dist_x = $radius - $radius*cos($theta_x) + $thickness/2;
# my $small_dist_y = $radius - $radius*cos($theta_y) + $thickness/2;
#  
# my $dist = $z_depth - $small_dist_x;
# my $distx = $dist * sin($x_angle);
# my $disty = $dist * sin($y_angle);
# my $distz = $dist * cos($x_angle) * cos($y_angle);
# 
# print "Mirror Depth: ", $z_depth, "    Small Distance: ", $small_dist_x, "    Dist: ", $dist , 
# 	  "    Distx: ", $distx, "    Disty: ", $disty , "    Distz: ", $distz , "\n";
# 
# # # /*--------------------------------------------------
# # # WL
# # # Coordinate definition for Each corner
# # my @x_coord = ();
# # my @y_coord = ();
# # my @z_coord = ();
# # 
# # foreach my $i ( 1 .. 4) {
# # 	$x_coord[$i] = 0;
# # 	$y_coord[$i] = 0;
# # 	$z_coord[$i] = 0;
# # }
# 
# # print "@x_coord", "\n";
# # print "@y_coord", "\n";
# # print "@z_coord", "\n";
# 
# # # /*-------------------------------------------------- 
# # # WL
# # # Defining the corner value
# # # Corner 1
# # 
# # $x_coord[1] = sprintf("%.2f", $x); 
# # $y_coord[1] = sprintf("%.2f", $y);
# # $z_coord[1] = sprintf("%.2f", $z);
# # 
# # print "The Corner 1 of the mirror is at (x, y, z) (mm): ", $x_coord[1], " ", $y_coord[1], " ", $z_coord[1], "\n";
# # 
# # # /*--------------------------------------------------
# # # Corner 2
# # # Round number to 3 digits after decimal point
# # #$rounded = sprintf("%.3f", $number);
# # 
# # $x_coord[2] = sprintf("%.2f", $x_top); 
# # $y_coord[2] = sprintf("%.2f", $y);
# # $z_coord[2] = sprintf("%.2f", $z_top);
# # 
# # print "The Corner 2 of the mirror is at (x, y, z) (mm): ", $x_coord[2], " ", $y_coord[2], " ", $z_coord[2], "\n";
# # 
# # # /*--------------------------------------------------
# # # Corner 3
# # 
# # $x_coord[3] = sprintf("%.2f", $x); 
# # $y_coord[3] = sprintf("%.2f", $y_left);
# # $z_coord[3] = sprintf("%.2f", $z_left);
# # print "The Corner 3 of the mirror is at (x, y, z) (mm): ", $x_coord[3], " ", $y_coord[3], " ", $z_coord[3], "\n";
# # 
# # # /*--------------------------------------------------
# # # Corner 4
# # $x_coord[4] = sprintf("%.2f", $x_top); 
# # $y_coord[4] = sprintf("%.2f", $y_left);
# # $z_coord[4] = sprintf("%.2f", $z_opp);
# # print "The Corner 4 of the mirror is at (x, y, z) (mm): ", $x_coord[4], " ", $y_coord[4], " ", $z_coord[4], "\n";
# # 
# # 
# #
# 
# 
# 
# 
# # @coins = ("Quarter","Dime","Nickel");
# # print "@coins";
# # print "<br />";
# # print @coins;
# # 
# # @array = (0 .. 20);
# # print "@array", "\n"
# # 
# 
# # my @array = (0, 0, 0);
# # print "first ", @array[2], "\n";
# 
# # 2D Array Definition
# #
# # my @array = ();
# # foreach my $i ( 0 .. 10 ) {
# #   foreach my $j ( 0 .. 10 ) {
# #     push @{ $array[$i] }, $j;
# #   }
# # }
# # 
# #
#  
#
#  /*--------------------------------------------------
 
}
1;
