#!/bin/bash

for i in `ls -d *`; do
cd "$i";
touch "$i";
cd ..
done


