#!/bin/bash   
while read line   
do   
    echo -e "$line \n"   
	att="$line"
done < test_file

	echo $att
#	print $att


#Split with bash
arr=$(echo $att | tr ";" "\n")

for x in $arr
do
    echo "> [$x]"
done


# split with perl script
echo $att | perl -e 'print "$_\n" for map {split / /, $_} <STDIN>'

# 
# print "first: $arr[3]\n"
# 
