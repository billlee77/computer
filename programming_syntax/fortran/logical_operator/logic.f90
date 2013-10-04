PROGRAM logical_operator

  IMPLICIT NONE
  INTEGER:: age
  WRITE(*,*) 'Please input the age :'
  READ(*,*) age
  
  IF (age >= 20 .AND. age <= 30) THEN
    WRITE(*,*) 'Hello world'  
  End IF

END PROGRAM logical_operator

! There are other types of logical operators such as:
!  .OR.
!  .EQV.
!  .NEQV.
