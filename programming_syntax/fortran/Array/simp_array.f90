PROGRAM simp_array

  IMPLICIT NONE
  INTEGER:: I
  REAL:: RL
  REAL::root(1:10)
  
  DO I = 1, 10, 1
    RL = REAL(I)
    root(I) = SQRT(RL) 
    WRITE(*,*) root(I)
  END DO

END PROGRAM simp_array
