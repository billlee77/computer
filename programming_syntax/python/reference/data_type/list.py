#!/usr/bin/env python
l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

el = []  # Create an empty list
print len(el)
sl = [1] # Create a single item list
print len(sl)

sl = [1,] # Create a single item list, as with a tuple
len(sl)

# Create list from tuple
l = list()
l = list((0, 1, 2, 3, 4, 5, 6, 7, 8, 9))   # Create list from tuple
l = list([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])   # Create list from list
l = list("0123456789")	# Create list from string

# Accessing items from a list

print l[0]
print l[4]
print l[1:5]
print l[0::2]  # Get every second item
print l[0], l[1], l[2]

# Modifying a list
l = []
l.append(0)
l[0] = 1
print l

# A heterogeneous mutable list
l=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
l[2] = "two"
l[2] = l[2:5] * 2 
print l
del(l[2])         # Remove single element
l[1:3] = []       # Remove a slice
print l

# The list as an array
al = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
print al[0][0]	# First element in 2D array
print al[2][2] 	# Last element in 2D arrat

al = [[[0, 1], [2, 3]], [[4, 5], [6, 7]]]
print len(al)
print len(al[0]) 
print len(al[0][0])

# Manipulating a list
l=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print "l is : ", l
l.reverse()
print "The reverse of l is : ", l
l.sort()
print "Sorted l :", l
l.index(5) 		# Same as l[5]
l.count(0)		# Count number of 0s
l.pop()			# Take off the last item
l.pop(5)		# Take off the fifth item
l.pop(0)		# Take off the first item


