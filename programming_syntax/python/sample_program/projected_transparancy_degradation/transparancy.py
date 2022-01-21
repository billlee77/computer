from ROOT import TCanvas, TGraph, TLegend
from math import *

year = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032]

cookie_eff = 1.1
non_cookie_eff = 1.0

PMT_deg = 0.005           # PMT degradation 0.5 percent
cookie_deg = 0.01         # PMT degradation 1.0 percent 

g1 = TGraph()
g2 = TGraph()
g3 = TGraph()

g1.SetMaximum(1.2)
g1.SetMinimum(0.8)

g2.SetMarkerStyle(26)
g2.SetMarkerColor(2)

g3.SetMaximum(1.2)
g3.SetMinimum(0.8)


for i in year: 

	t = i - year[0]	
	
	PMT_eff_exp_year    = exp(-PMT_deg * t)
	cookie_eff_exp_year = exp(-cookie_deg * t)
	
	
	
	
	cookie_eff_year     = cookie_eff * PMT_eff_exp_year * cookie_eff_exp_year
	non_cookie_eff_year = non_cookie_eff * PMT_eff_exp_year 

	print i, cookie_eff_year, non_cookie_eff_year



	g1.SetPoint(g1.GetN(), i, cookie_eff_year)
	g2.SetPoint(g2.GetN(), i, non_cookie_eff_year)

	g3.SetPoint(g3.GetN(), i, cookie_eff_year/non_cookie_eff_year)

	


g1.Draw("A*")
g2.Draw("psame")

leg = TLegend(0.55,0.7,0.9,0.9);
leg.AddEntry(g1,"South box c2r17","p")
leg.AddEntry(g2,"South box c2r18","p")
leg.Draw()



c2 = TCanvas()

g3.Draw("a*")



#print year[1]



