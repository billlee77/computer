import numpy as np
import math



def eulerAnglesToRotationMatrix(theta) :

    R_x = np.array([[1,         0,                  0                   ],

                    [0,         math.cos(theta[0]), -math.sin(theta[0]) ],

                    [0,         math.sin(theta[0]), math.cos(theta[0])  ]

                    ])

    R_y = np.array([[math.cos(theta[1]),    0,      math.sin(theta[1])  ],

                    [0,                     1,      0                   ],

                    [-math.sin(theta[1]),   0,      math.cos(theta[1])  ]

                    ])

    R_z = np.array([[math.cos(theta[2]),    -math.sin(theta[2]),    0],

                    [math.sin(theta[2]),    math.cos(theta[2]),     0],

                    [0,                     0,                      1]

                    ])

    R = np.dot(R_z, np.dot( R_y, R_x ))

    return R



# 
# 
# # Checks if a matrix is a valid rotation matrix.
# 
# def isRotationMatrix(R) :
# 
#     Rt = np.transpose(R)
# 
#     shouldBeIdentity = np.dot(Rt, R)
# 
#     I = np.identity(3, dtype = R.dtype)
# 
#     n = np.linalg.norm(I - shouldBeIdentity)
# 
#     return n < 1e-6
# 
#  
# 
#  
# 
# # Calculates rotation matrix to euler angles
# 
# # The result is the same as MATLAB except the order
# 
# # of the euler angles ( x and z are swapped ).
# 
# def rotationMatrixToEulerAngles(R) :
#     assert(isRotationMatrix(R))
# 
#      
# 
# # Checks if a matrix is a valid rotation matrix.
# 
# def isRotationMatrix(R) :
# 
#     Rt = np.transpose(R)
# 
#     shouldBeIdentity = np.dot(Rt, R)
# 
#     I = np.identity(3, dtype = R.dtype)
# 
#     n = np.linalg.norm(I - shouldBeIdentity)
# 
#     return n < 1e-6
# 
#  
# 
#  
# 
# # Calculates rotation matrix to euler angles
# 
# # The result is the same as MATLAB except the order
# 
# # of the euler angles ( x and z are swapped ).
# 
# def rotationMatrixToEulerAngle1
# # Checks if a matrix is a valid rotation matrix.
# 
# def isRotationMatrix(R) :
# 
#     Rt = np.transpose(R)
# 
#     shouldBeIdentity = np.dot(Rt, R)
# 
#     I = np.identity(3, dtype = R.dtype)
# 
#     n = np.linalg.norm(I - shouldBeIdentity)
# 
#     return n < 1e-6
# 
#  
# 
#  
# 
# # Calculates rotation matrix to euler angles
# 
# # The result is the same as MATLAB except the order
# 
# # of the euler angles ( x and z are swapped ).
# 
# def rotationMatrixToEulerAngles(R) :
#     assert(isRotationMatrix(R))
# 
#     sy = math.sqrt(R[0,0] * R[0,0] +  R[1,0] * R[1,0])
# 
#     singular = sy < 1e-6
# 
#     if  not singular :
#         x = math.atan2(R[2,1] , R[2,2])
#         y = math.atan2(-R[2,0], sy)
# 
# # Checks if a matrix is a valid rotation matrix.
# 
# def isRotationMatrix(R) :
#     Rt = np.transpose(R)
#     shouldBeIdentity = np.dot(Rt, R)
#     I = np.identity(3, dtype = R.dtype)
#     n = np.linalg.norm(I - shouldBeIdentity)
#     return n < 1e-6
# 
#  
# 
#  
# 
# # Calculates rotation matrix to euler angles
# 
# # The result is the same as MATLAB except the order
# 
# # of the euler angles ( x and z are swapped ).
# 
# def rotationMatrixToEulerAngles(R) :
#     assert(isRotationMatrix(R))
# 
#     sy = math.sqrt(R[0,0] * R[0,0] +  R[1,0] * R[1,0])
# 
#     singular = sy < 1e-6
# 
#     if  not singular :
#         x = math.atan2(R[2,1] , R[2,2])
#         y = math.atan2(-R[2,0], sy)
# 
# # Checks if a matrix is a valid rotation matrix.
# 
# def isRotationMatrix(R) :
#     Rt = np.transpose(R)
#     shouldBeIdentity = np.dot(Rt, R)
#     I = np.identity(3, dtype = R.dtype)
#     n = np.linalg.norm(I - shouldBeIdentity)
#     return n < 1e-6
# 
#  
# 
#  
# 
# # Calculates rotation matrix to euler angles
# 
# # The result is the same as MATLAB except the order
# 
# # of the euler angles ( x and z are swapped ).
# 
# def rotationMatrixToEulerAngles(R) :
# 
#     assert(isRotationMatrix(R))
# 
#     sy = math.sqrt(R[0,0] * R[0,0] +  R[1,0] * R[1,0])
# 
#     singular = sy < 1e-6
# 
#     if  not singular :
#         x = math.atan2(R[2,1] , R[2,2])
#         y = math.atan2(-R[2,0], sy)
#         z = math.atan2(R[1,0], R[0,0])
# 
#     else :
#         x = math.atan2(-R[1,2], R[1,1])
#         y = math.atan2(-R[2,0], sy)
#         z = 0
# 
#     return np.array([x, y, z])
#         z = math.atan2(R[1,0], R[0,0])
# 
#     else :
#         x = math.atan2(-R[1,2], R[1,1])
#         y = math.atan2(-R[2,0], sy)
#         z = 0
# 
#     return np.array([x, y, z])
#         z = math.atan2(R[1,0], R[0,0])
#     else :
#         x = math.atan2(-R[1,2], R[1,1])
# 
#         y = math.atan2(-R[2,0], sy)
#         z = 0
#     return np.array([x, y, z])s(R) :
# 
#     assert(isRotationMatrix(R))
# 
#     sy = math.sqrt(R[0,0] * R[0,0] +  R[1,0] * R[1,0])
#     
#     singular = sy < 1e-6
# 
#     if  not singular :
#         x = math.atan2(R[2,1] , R[2,2])
#         y = math.atan2(-R[2,0], sy)
#         z = math.atan2(R[1,0], R[0,0])
# 
#     else :
#         x = math.atan2(-R[1,2], R[1,1])
#         y = math.atan2(-R[2,0], sy)
#         z = 0
#  
#     return np.array([x, y, z])
#     sy = math.sqrt(R[0,0] * R[0,0] +  R[1,0] * R[1,0])
# 
#     singular = sy < 1e-6
# 
#     if  not singular :
#         x = math.atan2(R[2,1] , R[2,2])
#         y = math.atan2(-R[2,0], sy)
#         z = math.atan2(R[1,0], R[0,0])
# 
#     else :
#         x = math.atan2(-R[1,2], R[1,1])
#         y = math.atan2(-R[2,0], sy)
#         z = 0
# 	    return np.array([x, y, z])
# 
# 
# 
# 

##  Phi, theta, psi

theta = [0 *np.pi/180, 45*np.pi/180, 0*np.pi/180]

eulerAnglesToRotationMatrix(theta)




print "aaa" , np.pi, '\n' 
print eulerAnglesToRotationMatrix(theta)

pos1 = [1, 2, 10]


org_theta = math.atan(pos1[1]/pos1[2])*180/np.pi
org_phi = math.atan(pos1[0]/pos1[1])*180/np.pi

print '\n'
print org_theta , org_phi


print '\n'
print pos1, '\n'
print np.dot(pos1, eulerAnglesToRotationMatrix(theta))

