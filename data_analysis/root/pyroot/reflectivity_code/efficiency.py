import numpy, math

from ROOT import TCanvas, TGraphErrors, TF1, TFile


file = TFile("center.root")

#file.ls()


#c1 = TCanvas('c1', 'Efficiency Study', 800, 600)
c1 = file.Get("c2")

#c1.Draw()
gr1 = c1.GetListOfPrimitives().FindObject("graph2")

d1 = TCanvas('d1', 'Efficiency Study', 800, 600)

fun = TF1("fitter","pol4", 0, 400)
fun.SetParameter(0,-800)
fun.SetParameter(1,10)
fun.SetParameter(2,0)
fun.SetParameter(3,0)
fun.SetParameter(4,0)

gr1.Fit(fun,"RW")
gr1.Draw("AP")

d1.Update()




#hc = 6.626*(10**(-34))
hc = 6.626*pow(10,-34) * 3*pow(10, 8)/(1.602*pow(10,-19))


data_out = open('efficieny.dat', 'w')

for i in range(150, 401, 5):

	E = hc/(i*pow(10,-9))

	R = fun.Eval(i)/100

	output = str(i) + "    "+ str("%.4f"%E)  + "    "+ str("%.4f"%R) + "\n"
	data_out.write(output)
	

data_out.close()
