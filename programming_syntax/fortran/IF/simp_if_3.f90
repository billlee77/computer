PROGRAM simp_if_3

  IMPLICIT NONE
  INTEGER Count
  WRITE(*,*)'Please give a input'
  READ(*,*) Count
  
  IF(Count == 4) THEN
    WRITE(*,*) 'Test True'  
  ELSE
    WRITE(*,*) 'Test False'
  END IF

END PROGRAM simp_if_3
