#! /usr/bin/perl

our $col_num = 600;
our $row_num = 550;

# mirror 1
my $x_offset 	 = 294.903;
my $y_offset 	 = 240.723;
my $z_offset 	 = 69.6479;
my $radius 		 = 1108.80;
my $conic_const  = 0.360208;

# mirror 2
my $x_offset1	 = 292.468;
my $y_offset1 	 = 238.582;
my $z_offset1 	 = 66.8441;
my $radius1 	 = 1120.35;
my $conic_const1 = 0.41895;

my $i = 0;
my $total_diff = 0;

@difference;

# Equation
for (my $x=10; $x<$col_num; $x=$x+20) { 
	for (my $y=10; $y<$row_num; $y=$y+20) {
		$z = &calculation($x, $y, $x_offset, $y_offset, $z_offset, $radius, $conic_const);
		$z1 = &calculation($x, $y, $x_offset1, $y_offset1, $z_offset1, $radius1, $conic_const1);
		# print $z, "    " ,$z1, "    " , $z-$z1, "\n";
		
		$total_diff = $total_diff + ($z -$z1);

		$difference[$i] = $z - $z1;
		
		$i++;
	}
}

$mean = $total_diff/$i; 

# Standard deviation

$total = 0;

for my $n (0 .. $#difference) { 
	
	$tmp= ($difference[$n] - $mean)**2;
	$total = $total + $tmp; 

	#print $difference[$n], " " ;
}

$standard_dev = sqrt($total/$i);

print "The mean is : ", $mean, "\n";
print "The standard deviation is : ". $standard_dev, "\n";




#print $i, "        ", $total_diff , "         " , $total_diff/$i, "\n";

#print "The Average difference of each measurement is around :", $total_diff/$i, " mm \n";

# print "@difference";



#return (0);

# sub calculation() {
# 	my ($x, $y,$x_offset, $y_offset, $z_offset, $radius, $conic_const) = @_;
# 	my $z = -((($x-$x_offset)**2 + ($y-$y_offset)**2)/($radius + sqrt($radius**2 - (1+$conic_const)* (($x-$x_offset)**2 + ($y-$y_offset)**2))) - $z_offset);
# 	return $z;
# }
#
sub calculation() {
	my ($x, $y,$x_offset, $y_offset, $z_offset, $radius, $conic_const) = @_;
	my $z = (($x)**2 + ($y)**2)/($radius + sqrt($radius**2 - (1+$conic_const)* (($x)**2 + ($y)**2)));
	return $z;
} 




