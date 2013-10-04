PROGRAM simp_select

  IMPLICIT NONE
  INTEGER::cur_num
  WRITE(*,*) 'Please enter a number:'
  READ(*,*) cur_num
  
  SELECT CASE(cur_num)
    CASE (1:)
      WRITE(*,*) cur_num, 'is possitive.' 
    CASE (0)
      WRITE(*,*) cur_num, 'is zero.'
    CASE(:-1)
      WRITE(*,*) cur_num, 'is negative.'
  END SELECT

END PROGRAM simp_select
