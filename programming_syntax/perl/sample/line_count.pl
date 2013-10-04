#!/usr/local/bin/perl
 open (MYFILE, 'scan_ztar40cm_theta40deg_pe8gev_500k.dat');
$i=0;
 
while (<MYFILE>) {
 	chomp;
 	#print "$_\n";
	$i = $i+1;

 }

print $i, "\n";
 close (MYFILE); 
