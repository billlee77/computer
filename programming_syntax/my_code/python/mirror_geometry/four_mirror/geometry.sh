#!/bin/bash

echo Plsease choose the reference points:
echo -- ec for the edge center position of the mirror
echo -- mc for the center position of the mirror
echo -- cc for the corner position of the mirror
read option

# echo $option

if [ $option == 'ec' ]
then

echo "****************************************	"
echo "   Excuting python mirror_geometry_center.py  "
python fourmirror_center/fourmirror.py

elif [ $option == 'mc' ]
then

echo "****************************************	"
echo "   Excuting python mirror_geometry_centercenter.py  "
python mirror_center/mirror_center.py < mirrorcenter.dat

elif [ $option = 'cc' ]
then

echo "****************************************	"
echo "   Excuting perl mirror_geometry_corner.pl "
perl fourmirror_corner/main.pl 

else
echo "****************************************	"
echo "   There is no such option!				"
echo "   Program mirror_geometry is terminated!"
echo "****************************************	"

fi

