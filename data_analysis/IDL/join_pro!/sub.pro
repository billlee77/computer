@sub_1.pro

PRO sub

  a = 100
  b = 100
  d = rout(a,b)
  add, d
  sub_1, d  

end

FUNCTION rout, a, b
  c=a+b
  RETURN, c
END

PRO add, e
   e++
   PRINT,e 
END

