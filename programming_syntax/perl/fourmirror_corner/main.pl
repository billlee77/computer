#!/usr/bin/perl 

use strict;
use Math::Trig;
use warnings;

require "fourmirror_corner/mirror_geometry_corner.pl";

# /*--------------------------------------------------
# WL
# Configuration File Read In
# This is way too complicated 

# open FILE, "<", "corner.dat" or die $!;
#while (<FILE>) { print $_; }

open(FILE, "<corner.dat") || die("Could not open file!");;
my @raw_data = <FILE>;
close(FILE);

my @data = ();


# print @raw_data;
foreach my $line (@raw_data)
{
  	chop($line);

	my $char = "#";
	my $result = index($line, "#");
	#print $result, "\n";

	if($result == -1)
	{
	#my @fur = split(':', $line);
	
	my $result = index($line, ":");
	#print $result, "\n";
	my $new_string = substr($line, $result+1);
	$new_string =~ s/\s//g;
	# $new_string =~ s/\,/ /g;

	my @new_string1 = split(",", $new_string);

	# print @new_string1, "\n";
	push (@data, @new_string1);
	}
}

my $x_width = $data[0];
my $y_width = $data[1];
my $thickness = $data[2];
my $radius = $data[3];

# @corner_pos[0] = @data[4..6];
# print $x_width, " ", $y_width, " ", "\n"; 

my @corner_pos = ();

foreach my $j ( 4 .. 6 ) {
	push (@{ $corner_pos[0] }, $data[$j]);
}
foreach my $k (9 .. 11){
	push (@{ $corner_pos[1] }, $data[$k]);
}
foreach my $q (14 .. 16){
	push (@{ $corner_pos[2] }, $data[$q]);
}
foreach my $w (19 .. 21){
	push (@{ $corner_pos[3] }, $data[$w]);
}


my @mirror_tilt = ();
	foreach my $j ( 7 .. 8 ) {
    	push (@{ $mirror_tilt[0] }, $data[$j]);
  	}
	foreach my $k (12 .. 13){
    	push (@{ $mirror_tilt[1] }, $data[$k]);
	}
	foreach my $q (17 .. 18){
    	push (@{ $mirror_tilt[2] }, $data[$q]);
	}
	foreach my $w (22 .. 23){
    	push (@{ $mirror_tilt[3] }, $data[$w]);
	}


# for (my $i=0; $i<4 ; $i++){
# 	for(my $r=0; $r<3; $r++){
# 		print $corner_pos[$i][$r], " ";
# 	}
# }
# print "\n";

# for (my $i=0; $i<4; $i++){
# 	for(my $r=0; $r<2; $r++){
# 		print $mirror_tilt[$i][$r], " ";
# 	}
# }
# print "\n";

# Data Readin Section Finished. There must be a easier way to do this in perl
# /*--------------------------------------------------


print "Mirror Length: ", $x_width, "\n", 
      "Mirror Width: ", $y_width, "\n", 
      "Mirror Thickness: ", $thickness, "\n", 
	  "Mirror Radius: ", $radius, "\n";


# /*--------------------------------------------------
# WL
# Mirror
#
for (my $i=0; $i<4; $i++){

	my $mirror_number = $i + 1;


	if ($mirror_number > 2)
	{
		$x_width = 572.8;
	}


	# print "check angle: " , $mirror_tilt[$i][0], " ", $mirror_tilt[$i][1], "\n"; 

	my $x_rad = deg2rad($mirror_tilt[$i][0]);
	my $y_rad = deg2rad($mirror_tilt[$i][1]);


	#print "@{$mirror_tilt[$i]} ", "\n";
	my @corner_temp = @{$corner_pos[$i]};
	my @angle_temp = @{$mirror_tilt[$i]};
	#print "@angle_temp ", "\n";
	 
	# my $temp = $mirror_tilt[$i];
	# #print "\n @mirror_tilt[$i] ", "\n";


	# /*--------------------------------------------------
	# WL
	# Corner Calculation
	my ($x_coord_cal, $y_coord_cal, $z_coord_cal) = corner_cal($mirror_number, $x_width, $y_width, $x_rad, $y_rad, $radius, @corner_temp);

	my @x_coord = @$x_coord_cal;
	my @y_coord = @$y_coord_cal;
	my @z_coord = @$z_coord_cal;


	# /*--------------------------------------------------
	# Parameter Calculation
	my ($z_depth, $small_dist_x, $dist, $length) = para_cal($x_width, $y_width, $radius, $thickness);


	# Calculate Mirror Posision
	my ($x_center_start, $y_center_start, $z_center_start, $x_center_end, $y_center_end, $z_center_end, $MirrorPosition_x, $MirrorPosition_y, $MirrorPosition_z) = MirrorPos($mirror_number, $x_width, $y_width, $z_depth, $x_rad, $y_rad, $small_dist_x, $dist, \@corner_temp, \@x_coord, \@y_coord, \@z_coord);


	# /*--------------------------------------------------
	print "/*--------------------------------------------------\n";
	print "Mirror ", $mirror_number , " Corner Position\n"; 
	print "Center Start Position (x, y, z) (mm): ", $x_center_start, "  ", $y_center_start, "  ", $z_center_start, "\n";
	print "Center End Position (x, y, z) (mm): ", $x_center_end, "  ", $y_center_end, "  ", $z_center_end, "\n";
	print "Mirror Tilt Angle X, Y: ", $mirror_tilt[$i][0], "  ", $mirror_tilt[$i][1], "\n";
	print "The Corner 1 of the mirror is at (x, y, z) (mm): ", $x_coord[0], "  ", $y_coord[0], "  ", $z_coord[0], "\n";
	print "The Corner 2 of the mirror is at (x, y, z) (mm): ", $x_coord[1], "  ", $y_coord[1], "  ", $z_coord[1], "\n";
	print "The Corner 3 of the mirror is at (x, y, z) (mm): ", $x_coord[2], "  ", $y_coord[2], "  ", $z_coord[2], "\n";
	print "The Corner 4 of the mirror is at (x, y, z) (mm): ", $x_coord[3], "  ", $y_coord[3], "  ", $z_coord[3], "\n";
	print "Mirror Center Position (mm): ", $MirrorPosition_x, "  ", $MirrorPosition_y, "  ", $MirrorPosition_z, "\n";




}


# End

exit 0;

