#!/usr/bin/python

# Method of defining tuple
t = (0,1,2,3,4,5,6,7,8,9)
print t

tt = 0,1,2,3,4,5,6,7,8,9
print tt

tc=tuple((0,1,2,3,4,5,6,7,8,9))
print tc

# Empty tuple
et = ()	

# A single item tuple
st = (1,)

# Access information in the tuple
print t[2]
print t[0], t[1], t[9]
print t[2:7]
print t[2:7:2]

# A heterogeneous tuple
t = (0,1,"two",3.0, "four", (5, 6))
print t
print t[1:4]
	
print(type(t[2]))	
print(type(t[3]))
print(type(t[5]))

tn = t[1:3] + t[3:6]
print tn
tn = t[1:3] + t[3:6] + (7,8,9,"ten")
print tn

t2 = tn
t2 = tn[:]

len(t2)
print tn[4][0]

print type(tn)
print type(t2)
print t2

i = 1
s = "two" 
f = 3.0
t = (i, s, f)
print t
ii, ss, ff = t
print ii, ss, ff


