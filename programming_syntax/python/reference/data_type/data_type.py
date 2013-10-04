#!/usr/bin/python

# 5 types of built-in data types: bool, int, long, float, complex

#**************************
# Bool type
#b = True
#id(b)
b = 100 < 101
print b

#************************
#Python logical operator : not, and, or.

#***************************
# Python constructors
b = bool(True)
i = int(100)
l = long(100)
f = float(100.1)
c = complex(3.0, 1.2)
print b, i, l, f, c
 	
int()
int(100)         	# Create an integer with the value of 100
int("100", 10)      # Create an integer with the value of 100 in base 10
int("100", 8)		# Create an integer with the value of 100 in base 8

#******************************
# Defining a new integer type
it = int
it(100)
type(it)
type(it(100))

















