from ROOT import TCanvas, TF2

c1 = TCanvas()


# P wave amplitude sum over ml = -1, 0, +1, mI=0

f2 = TF2("f2","y*y + sin(acos(y)) * sin(acos(y)) * sin(x) * sin(x)",-3.2, 3.2,-1,1)
f2.Draw("CONT4Z")


# P wave amplitude sum over ml = +1, mI=0

c1.Draw()



c2 = TCanvas()

f3 = TF2("f3","sin(acos(y)) * sin(acos(y))",-3.2, 3.2,-1,1)

f3.Draw("CONT4Z")

c2.Draw()

