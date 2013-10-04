PRO wave_plot
  A=findgen(50)
  plot, A, sin(A)*cos(A)-sin(A)*cos(A)	
  oplot, A, sin(A)*cos(A)+sin(A)*cos(A),col=120
END
