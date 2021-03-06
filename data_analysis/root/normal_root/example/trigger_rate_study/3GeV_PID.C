{
//=========Macro generated from canvas: c1/
//=========  (Mon Aug 20 11:55:58 2012) by ROOT version5.28/00h
   TCanvas *c1 = new TCanvas("c1", "",1601,63,1200,833);
   c1->Range(0,0,1,1);
   c1->SetFillColor(0);
   c1->SetBorderMode(0);
   c1->SetBorderSize(2);
   c1->SetTopMargin(0.04761905);
   c1->SetBottomMargin(0.05);
   c1->SetFrameBorderMode(0);
  
// ------------>Primitives in pad: c1_1
   TPad *c1_1 = new TPad("c1_1", "_1",0,0.5011905,0.9,0.952381);
   c1_1->Draw();
   c1_1->cd();
   c1_1->Range(-1.176471,0.75,10.58824,1.027778);
   c1_1->SetFillColor(0);
   c1_1->SetBorderMode(0);
   c1_1->SetBorderSize(2);
   c1_1->SetRightMargin(0.05);
   c1_1->SetBottomMargin(0);
   c1_1->SetFrameBorderMode(0);
   c1_1->SetFrameBorderMode(0);
   
   TGraph *graph = new TGraph(40);
   graph->SetName("eff");
   graph->SetTitle("Particle Triggering Efficiency");
   graph->SetFillColor(1);
   graph->SetMarkerStyle(22);
   graph->SetMarkerSize(2);
   graph->SetPoint(0,1,0.98806);
   graph->SetPoint(1,2,0.98806);
   graph->SetPoint(2,3,0.983512);
   graph->SetPoint(3,4,0.973988);
   graph->SetPoint(4,5,0.957252);
   graph->SetPoint(5,6,0.93196);
   graph->SetPoint(6,7,0.899132);
   graph->SetPoint(7,8,0.860832);
   graph->SetPoint(8,9,0.817656);
   graph->SetPoint(9,10,0.772816);
   graph->SetPoint(10,11,0.727112);
   graph->SetPoint(11,12,0.6812);
   graph->SetPoint(12,13,0.6366);
   graph->SetPoint(13,14,0.594336);
   graph->SetPoint(14,15,0.554788);
   graph->SetPoint(15,16,0.516936);
   graph->SetPoint(16,17,0.481408);
   graph->SetPoint(17,18,0.447136);
   graph->SetPoint(18,19,0.413812);
   graph->SetPoint(19,20,0.381616);
   graph->SetPoint(20,21,0.34986);
   graph->SetPoint(21,22,0.318512);
   graph->SetPoint(22,23,0.287236);
   graph->SetPoint(23,24,0.257168);
   graph->SetPoint(24,25,0.227556);
   graph->SetPoint(25,26,0.199176);
   graph->SetPoint(26,27,0.172656);
   graph->SetPoint(27,28,0.147284);
   graph->SetPoint(28,29,0.124052);
   graph->SetPoint(29,30,0.10384);
   graph->SetPoint(30,31,0.085152);
   graph->SetPoint(31,32,0.068728);
   graph->SetPoint(32,33,0.054212);
   graph->SetPoint(33,34,0.042468);
   graph->SetPoint(34,35,0.032444);
   graph->SetPoint(35,36,0.024848);
   graph->SetPoint(36,37,0.018428);
   graph->SetPoint(37,38,0.013428);
   graph->SetPoint(38,39,0.009872);
   graph->SetPoint(39,40,0.007128);
   
   TH1F *Graph_Graph1 = new TH1F("Graph_Graph1","Particle Triggering Efficiency",100,0,10);
   Graph_Graph1->SetMinimum(0.75);
   Graph_Graph1->SetMaximum(1);
   Graph_Graph1->SetDirectory(0);
   Graph_Graph1->SetStats(0);
   Graph_Graph1->GetYaxis()->SetTitle("Efficiency");
   Graph_Graph1->GetYaxis()->CenterTitle(true);
   Graph_Graph1->GetYaxis()->SetLabelSize(0.06);
   Graph_Graph1->GetYaxis()->SetTitleSize(0.07);
   Graph_Graph1->GetYaxis()->SetTitleOffset(0.6);
   graph->SetHistogram(Graph_Graph1);
   
   graph->Draw("ap");
   
   TLegend *leg = new TLegend(0.7,0.65,0.95,0.9,NULL,"brNDC");
   leg->SetBorderSize(1);
   leg->SetTextFont(62);
   leg->SetLineColor(1);
   leg->SetLineStyle(1);
   leg->SetLineWidth(1);
   leg->SetFillColor(0);
   leg->SetFillStyle(1001);
   TLegendEntry *entry=leg->AddEntry("eff","Pion Efficiency","P");
   entry->SetLineColor(1);
   entry->SetLineStyle(1);
   entry->SetLineWidth(1);
   entry->SetMarkerColor(1);
   entry->SetMarkerStyle(22);
   entry->SetMarkerSize(2);
   entry=leg->AddEntry("eff","Kaon Efficiency","P");
   entry->SetLineColor(1);
   entry->SetLineStyle(1);
   entry->SetLineWidth(1);
   entry->SetMarkerColor(1);
   entry->SetMarkerStyle(3);
   entry->SetMarkerSize(2);
   entry=leg->AddEntry("eff","Proton Efficiency","P");
   entry->SetLineColor(1);
   entry->SetLineStyle(1);
   entry->SetLineWidth(1);
   entry->SetMarkerColor(1);
   entry->SetMarkerStyle(26);
   entry->SetMarkerSize(2);
   leg->Draw();
   
   TPaveText *pt = new TPaveText(0.3106986,0.9126491,0.6893014,0.995,"blNDC");
   pt->SetName("title");
   pt->SetBorderSize(0);
   pt->SetFillColor(0);
   TText *text = pt->AddText("Particle Triggering Efficiency");
   pt->Draw();
   c1_1->Modified();
   c1->cd();
  
// ------------>Primitives in pad: c1_2
   c1_2 = new TPad("c1_2", "_2",0,0,0.9,0.5011905);
   c1_2->Draw();
   c1_2->cd();
   c1_2->Range(-1.176471,-0.002310176,10.58824,0.013091);
   c1_2->SetFillColor(0);
   c1_2->SetBorderMode(0);
   c1_2->SetBorderSize(2);
   c1_2->SetRightMargin(0.05);
   c1_2->SetTopMargin(0);
   c1_2->SetBottomMargin(0.15);
   c1_2->SetFrameBorderMode(0);
   c1_2->SetFrameBorderMode(0);
   
   graph = new TGraph(40);
   graph->SetName("eff");
   graph->SetTitle("");
   graph->SetFillColor(1);
   graph->SetMarkerStyle(3);
   graph->SetMarkerSize(2);
   graph->SetPoint(0,1,0.01194);
   graph->SetPoint(1,2,0.01194);
   graph->SetPoint(2,3,0.01105);
   graph->SetPoint(3,4,0.01017);
   graph->SetPoint(4,5,0.00939);
   graph->SetPoint(5,6,0.00865);
   graph->SetPoint(6,7,0.00806);
   graph->SetPoint(7,8,0.00743);
   graph->SetPoint(8,9,0.00681);
   graph->SetPoint(9,10,0.00618);
   graph->SetPoint(10,11,0.00577);
   graph->SetPoint(11,12,0.00532);
   graph->SetPoint(12,13,0.00495);
   graph->SetPoint(13,14,0.00461);
   graph->SetPoint(14,15,0.00433);
   graph->SetPoint(15,16,0.00396);
   graph->SetPoint(16,17,0.0037);
   graph->SetPoint(17,18,0.00338);
   graph->SetPoint(18,19,0.00315);
   graph->SetPoint(19,20,0.00292);
   graph->SetPoint(20,21,0.00272);
   graph->SetPoint(21,22,0.0025);
   graph->SetPoint(22,23,0.00234);
   graph->SetPoint(23,24,0.00211);
   graph->SetPoint(24,25,0.00191);
   graph->SetPoint(25,26,0.00175);
   graph->SetPoint(26,27,0.00162);
   graph->SetPoint(27,28,0.00149);
   graph->SetPoint(28,29,0.00134);
   graph->SetPoint(29,30,0.00122);
   graph->SetPoint(30,31,0.00113);
   graph->SetPoint(31,32,0.00098);
   graph->SetPoint(32,33,0.0009);
   graph->SetPoint(33,34,0.00081);
   graph->SetPoint(34,35,0.00071);
   graph->SetPoint(35,36,0.00062);
   graph->SetPoint(36,37,0.0006);
   graph->SetPoint(37,38,0.00053);
   graph->SetPoint(38,39,0.00047);
   graph->SetPoint(39,40,0.00043);
   
   TH1F *Graph_Graph2 = new TH1F("Graph_Graph2","",100,0,10);
   Graph_Graph2->SetMinimum(0);
   Graph_Graph2->SetMaximum(0.013091);
   Graph_Graph2->SetDirectory(0);
   Graph_Graph2->SetStats(0);
   Graph_Graph2->GetXaxis()->SetTitle("Threshold");
   Graph_Graph2->GetXaxis()->CenterTitle(true);
   Graph_Graph2->GetXaxis()->SetLabelSize(0.07);
   Graph_Graph2->GetXaxis()->SetTitleSize(0.07);
   Graph_Graph2->GetXaxis()->SetTitleOffset(0.9);
   Graph_Graph2->GetYaxis()->SetLabelSize(0.06);
   Graph_Graph2->GetYaxis()->SetTitleOffset(1.2);
   graph->SetHistogram(Graph_Graph2);
   
   graph->Draw("app");
   
   graph = new TGraph(40);
   graph->SetName("eff");
   graph->SetTitle("");
   graph->SetFillColor(1);
   graph->SetMarkerStyle(26);
   graph->SetMarkerSize(2);
   graph->SetPoint(0,1,0.00033);
   graph->SetPoint(1,2,0.00033);
   graph->SetPoint(2,3,0.00026);
   graph->SetPoint(3,4,0.00023);
   graph->SetPoint(4,5,0.0002);
   graph->SetPoint(5,6,0.00015);
   graph->SetPoint(6,7,0.00015);
   graph->SetPoint(7,8,0.00011);
   graph->SetPoint(8,9,0.00011);
   graph->SetPoint(9,10,0.00011);
   graph->SetPoint(10,11,0.0001);
   graph->SetPoint(11,12,8e-05);
   graph->SetPoint(12,13,7e-05);
   graph->SetPoint(13,14,6e-05);
   graph->SetPoint(14,15,5e-05);
   graph->SetPoint(15,16,5e-05);
   graph->SetPoint(16,17,4e-05);
   graph->SetPoint(17,18,4e-05);
   graph->SetPoint(18,19,4e-05);
   graph->SetPoint(19,20,3e-05);
   graph->SetPoint(20,21,3e-05);
   graph->SetPoint(21,22,3e-05);
   graph->SetPoint(22,23,3e-05);
   graph->SetPoint(23,24,2e-05);
   graph->SetPoint(24,25,2e-05);
   graph->SetPoint(25,26,2e-05);
   graph->SetPoint(26,27,2e-05);
   graph->SetPoint(27,28,2e-05);
   graph->SetPoint(28,29,2e-05);
   graph->SetPoint(29,30,2e-05);
   graph->SetPoint(30,31,2e-05);
   graph->SetPoint(31,32,2e-05);
   graph->SetPoint(32,33,2e-05);
   graph->SetPoint(33,34,1e-05);
   graph->SetPoint(34,35,0);
   graph->SetPoint(35,36,0);
   graph->SetPoint(36,37,0);
   graph->SetPoint(37,38,0);
   graph->SetPoint(38,39,0);
   graph->SetPoint(39,40,0);
   
   TH1F *Graph_Graph3 = new TH1F("Graph_Graph3","",100,0,43.9);
   Graph_Graph3->SetMinimum(0);
   Graph_Graph3->SetMaximum(0.000363);
   Graph_Graph3->SetDirectory(0);
   Graph_Graph3->SetStats(0);
   Graph_Graph3->GetYaxis()->SetTitleOffset(1.3);
   graph->SetHistogram(Graph_Graph3);
   
   graph->Draw("p");
   c1_2->Modified();
   c1->cd();
   c1->Modified();
   c1->cd();
   c1->SetSelected(c1);
}
