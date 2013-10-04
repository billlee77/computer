PROGRAM simp_if_2

  IMPLICIT NONE
  INTEGER:: I, A, SUM
  WRITE(*,*) 'Input the a number to start '
  READ(*,*) A
  WRITE(*,*) A
  SUM = 0
  
  IF (A>0) THEN 
    DO I = A, A+10, 1
      SUM = SUM + I
    END DO
  END IF
  
  WRITE(*,*) SUM

END PROGRAM simp_if_2
