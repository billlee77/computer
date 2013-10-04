#!/bin/bash
RETVAL=0

if [ $# =  1 ]	
then
  if [ $1 = i ]
    then
	set -o verbose
	for i in $( ls *.mf); do
      echo item: $i
	  mf "\mode=localfont; input $i ;"
      echo 'Compilation sucessful Congratulations'
    done
  elif [ $1 = r ]
    then 
	for i in $(ls *.mf); do
      file=${i:0:4}
	  ls $file*
	  rm $file*
#	  rm $file.*
#      echo `expr substr $i 1 3`
    done
  else
    echo
    echo "Parameter input is not recognised!!"
    echo
  fi
  else
    echo
    echo "We are only expecting a paramiter!!"
    echo
fi
exit
