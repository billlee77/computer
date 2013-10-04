#! /usr/bin/perl
 
print ("Please enter a number:");

$number = <STDIN>; 
$add = $number + 1;

print "Result is ", $add, "\n";



use POSIX qw(strftime);
$time_now = strftime "%a %b %e %H:%M:%S %Y", localtime;
print "The time for now is: ", $time_now, "\n";

