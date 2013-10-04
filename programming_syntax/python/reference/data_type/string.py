#!/usr/bin/python
sr = "Python is alright"
print type(sr)

sr = "Python is alright: It is Wonderful"
print sr

passage = 'When using the Python programming language, one must proceed with caution. This is because Python is so easy to use, and can be so much fun. Failure to follow this warning may lead to shouts of "WooHoo" or "Yowza".'
print passage

# Newline control character (\n)
# Tab control character (\t)

passage = '\tWhen using the Python programming language, one must proceed\n\
 \twith caution. This is because Python is so easy to use, and\n\
 \tcan be so much fun. Failure to follow this warning may lead\n\
 \tto shouts of "WooHoo" or "Yowza".'
print passage

passage=r'\tWhen using the Python programming language, one must proceed\n\
	\twith caution. This is because Python is so easy to use, and\n\
	\tcan be so much fun. Failure to follow this warning may lead\n\
	\tto shouts of "WooHoo" or "Yowza".'
print passage

passage = """
         When using the Python programming language, one must proceed
         with caution. This is because Python is so easy to use, and
         can be so much fun. Failure to follow this warning may lead
         to shouts of "WooHoo" or "Yowza".
"""
print passage

# Adding the string
str("Discover python")
str(12345)
str(123.45)
"Wow," + " that " + "was awesome."
"Wow,"" that ""was Awesome"
"Wow! "*5
sr = str("Hello ")
sr += "World"
print sr

# Uppering and lowering the letters within the string
sr = "Discover Python!"
sr.upper()
print sr.upper()
sr.lower()
print sr.lower()
sr = "This is a test" 
print sr.split()

sr = '0:1:2:3:4:5:6:7:8:9'
print sr.split(':')  

sr=":"
tp = ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9')
print sr.join(tp)

sr="0123456789"
print sr[1] + sr[0]
print sr[4:8]
print sr[:-1]# Give all elements but the last one
print sr[1:12]
print sr[:-20]
print sr[20:]
print sr[0] + sr[1:5] + sr[5:9] + sr[9]

print len(sr)

