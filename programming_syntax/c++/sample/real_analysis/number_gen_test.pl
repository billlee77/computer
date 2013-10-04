#!/usr/bin/perl

# $col_num = 100;
# $row_num = 100;
 
$col_num = 60;
$row_num = 55;

#@range = (20,20,100);

#print length(col_num), "\n";
#@rand_num = (0 .. $col_num);


# open(TESTOUT, ">", "test_comma.dat");
# for ($x=0; $x < $col_num+1; $x = $x+4){	
# 	for ($y=0; $y < $row_num+1; $y= $y+4){
# #		$rand_num = int(rand($range[2]));
# 
# 		print TESTOUT $x, " ", $y , " ", sqrt(110**2- ($x-50)**2 - ($y-50)**2), "\n";		
# 		#print TESTOUT $rand_num[$i];
# #  		if ($i != $col_num-1){
# #  			print TESTOUT " ";
# 			
# 		} 
# 	#}
# 	
# }
# close(TESTOUT);


open(TESTOUT, ">", "test_realsize.dat");
for ($x=0; $x < $col_num+1; $x = $x+2){	
	for ($y=0; $y < $row_num+1; $y= $y+2){
#		$rand_num = int(rand($range[2]));

		print TESTOUT $x, ",", $y , ",", sqrt(110**2- ($x-30)**2 - ($y-27.5)**2), "\n";		

		#print TESTOUT $rand_num[$i];
#  		if ($i != $col_num-1){
#  			print TESTOUT " ";
			
		} 
	#}
	
}


close(TESTOUT);

exit(0);
