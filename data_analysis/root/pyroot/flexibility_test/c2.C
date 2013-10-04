{
//=========Macro generated from canvas: c1/Flexibility Study 
//=========  (Fri May 27 11:16:59 2011) by ROOT version5.28/00b
   TCanvas *c1 = new TCanvas("c1", "Flexibility Study ",23,186,801,599);
   c1->SetHighLightColor(2);
   c1->Range(-412.5,-5.971968,2612.5,30.48913);
   c1->SetFillColor(0);
   c1->SetBorderMode(0);
   c1->SetBorderSize(2);
   c1->SetFrameBorderMode(0);
   c1->SetFrameBorderMode(0);
   
   TMultiGraph *multigraph = new TMultiGraph();
   multigraph->SetName("");
   multigraph->SetTitle("Deflection with 1st Upgrade");
   
   TGraphErrors *gre = new TGraphErrors(12);
   gre->SetName("");
   gre->SetTitle("");
   gre->SetFillColor(1);
   gre->SetMarkerStyle(3);
   gre->SetMarkerSize(1.6);
   gre->SetPoint(0,0,0);
   gre->SetPointError(0,0,1);
   gre->SetPoint(1,200,2);
   gre->SetPointError(1,0,1.021812);
   gre->SetPoint(2,400,3);
   gre->SetPointError(2,0,1.08462);
   gre->SetPoint(3,600,5);
   gre->SetPointError(3,0,1.181905);
   gre->SetPoint(4,800,7);
   gre->SetPointError(4,0,1.305986);
   gre->SetPoint(5,1000,8);
   gre->SetPointError(5,0,1.45);
   gre->SetPoint(6,1200,10);
   gre->SetPointError(6,0,1.608602);
   gre->SetPoint(7,1400,11);
   gre->SetPointError(7,0,1.777892);
   gre->SetPoint(8,1600,13);
   gre->SetPointError(8,0,1.955096);
   gre->SetPoint(9,1800,16);
   gre->SetPointError(9,0,2.138247);
   gre->SetPoint(10,2000,17);
   gre->SetPointError(10,0,2.325941);
   gre->SetPoint(11,2200,20);
   gre->SetPointError(11,0,2.517161);
   
   TH1F *Graph1 = new TH1F("Graph1","",100,0,2420);
   Graph1->SetMinimum(-3.351716);
   Graph1->SetMaximum(24.86888);
   Graph1->SetDirectory(0);
   Graph1->SetStats(0);
   Graph1->SetMarkerStyle(3);
   Graph1->SetMarkerSize(1.6);
   gre->SetHistogram(Graph1);
   
   
   TF1 *pol1 = new TF1("pol1","pol1",0,2420);
   pol1->SetFillColor(19);
   pol1->SetFillStyle(0);
   pol1->SetMarkerStyle(3);
   pol1->SetMarkerSize(1.6);
   pol1->SetLineWidth(3);
   pol1->SetChisquare(1.084584);
   pol1->SetNDF(10);
   pol1->SetParameter(0,-0.06857665);
   pol1->SetParError(0,0.6222967);
   pol1->SetParLimits(0,0,0);
   pol1->SetParameter(1,0.008503123);
   pol1->SetParError(1,0.0006656623);
   pol1->SetParLimits(1,0,0);
   gre->GetListOfFunctions()->Add(pol1);
   multigraph->Add(gre,"");
   

   TF1 *fun4 = new TF1("fun4","0.013*x",0,2200);
   fun4.SetLineStyle(2);
   multigraph->Add(gre,"");
   gre->GetListOfFunctions()->Add(fun4);


   gre = new TGraphErrors(12);
   gre->SetName("");
   gre->SetTitle("");
   gre->SetFillColor(1);
   gre->SetLineColor(2);
   gre->SetMarkerColor(2);
   gre->SetMarkerStyle(5);
   gre->SetMarkerSize(1.6);
   gre->SetPoint(0,0,0);
   gre->SetPointError(0,0,1);
   gre->SetPoint(1,200,2);
   gre->SetPointError(1,0,1.021812);
   gre->SetPoint(2,400,4);
   gre->SetPointError(2,0,1.08462);
   gre->SetPoint(3,600,5);
   gre->SetPointError(3,0,1.181905);
   gre->SetPoint(4,800,7);
   gre->SetPointError(4,0,1.305986);
   gre->SetPoint(5,1000,10);
   gre->SetPointError(5,0,1.45);
   gre->SetPoint(6,1200,12);
   gre->SetPointError(6,0,1.608602);
   gre->SetPoint(7,1400,13);
   gre->SetPointError(7,0,1.777892);
   gre->SetPoint(8,1600,15);
   gre->SetPointError(8,0,1.955096);
   gre->SetPoint(9,1800,18);
   gre->SetPointError(9,0,2.138247);
   gre->SetPoint(10,2000,20);
   gre->SetPointError(10,0,2.325941);
   gre->SetPoint(11,2200,23);
   gre->SetPointError(11,0,2.517161);
   
   TH1F *Graph2 = new TH1F("Graph2","",100,0,2420);
   Graph2->SetMinimum(-3.651716);
   Graph2->SetMaximum(28.16888);
   Graph2->SetDirectory(0);
   Graph2->SetStats(0);
   Graph2->SetMarkerStyle(3);
   Graph2->SetMarkerSize(1.6);
   gre->SetHistogram(Graph2);
   
   
   TF1 *pol1 = new TF1("pol1","pol1",0,2420);
   pol1->SetFillColor(19);
   pol1->SetFillStyle(0);
   pol1->SetMarkerStyle(3);
   pol1->SetMarkerSize(1.6);
   pol1->SetLineColor(2);
   pol1->SetLineWidth(3);
   pol1->SetChisquare(1.536716);
   pol1->SetNDF(10);
   pol1->SetParameter(0,-0.2222345);
   pol1->SetParError(0,0.6222967);
   pol1->SetParLimits(0,0,0);
   pol1->SetParameter(1,0.009916124);
   pol1->SetParError(1,0.0006656623);
   pol1->SetParLimits(1,0,0);
   gre->GetListOfFunctions()->Add(pol1);
   multigraph->Add(gre,"");
   multigraph->Draw("AP");
   multigraph->GetXaxis()->SetTitle("Mass (g)");
   multigraph->GetXaxis()->CenterTitle(true);
   multigraph->GetYaxis()->SetTitle("Movement (mm)");
   multigraph->GetYaxis()->CenterTitle(true);
   
   TPaveText *pt = new TPaveText(0.2670101,0.9404546,0.7329899,0.995,"blNDC");
   pt->SetName("title");
   pt->SetBorderSize(0);
   pt->SetFillColor(0);
   TText *text = pt->AddText("Deflection After 1st Upgrade");
   pt->Draw();
   
   TLegend *leg = new TLegend(0.65,0.2,0.85,0.4,NULL,"brNDC");
   leg->SetBorderSize(1);
   leg->SetTextFont(72);
   leg->SetTextSize(0.04);
   leg->SetLineColor(1);
   leg->SetLineStyle(1);
   leg->SetLineWidth(1);
   leg->SetFillColor(0);
   leg->SetFillStyle(1001);
   TLegendEntry *entry=leg->AddEntry("","Convex","p");
   entry->SetLineColor(1);
   entry->SetLineStyle(1);
   entry->SetLineWidth(1);
   entry->SetMarkerColor(1);
   entry->SetMarkerStyle(3);
   entry->SetMarkerSize(1.6);
   entry=leg->AddEntry("","Concave","p");
   entry->SetLineColor(1);
   entry->SetLineStyle(1);
   entry->SetLineWidth(1);
   entry->SetMarkerColor(2);
   entry->SetMarkerStyle(5);
   entry->SetMarkerSize(1.6);
   leg->Draw();
   c1->Modified();
   c1->cd();
   c1->SetSelected(c1);
}
