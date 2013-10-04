{
//=========Macro generated from canvas: c1/Draw Things
//=========  (Sun Aug  2 20:33:08 2009) by ROOT version5.22/00
   TCanvas *c1 = new TCanvas("c1", "Draw Things",76,54,1000,710);
   c1->Range(0,0,1,1);
   c1->SetBorderSize(2);
  
// ------------>Primitives in pad: pad
   TPad *pad = new TPad("pad", "pad",0.1,0.1,0.9,0.9);
   pad->Draw();
   pad->cd();
   pad->Range(0,0,1,1);
   pad->SetBorderSize(2);
  
// ------------>Primitives in pad: pad_1
   pad_1 = new TPad("pad_1", "pad_1",0.0001,0.5001,0.4999,0.9999);
   pad_1->Draw();
   pad_1->cd();
   pad_1->Range(-1.614722,4.984688,14.73936,10.98889);
   pad_1->SetBorderSize(2);
   
   TGraph *graph = new TGraph(5);
   graph->SetName("Graph");
   graph->SetTitle("");
   graph->SetFillColor(1);
   graph->SetMarkerColor(4);
   graph->SetMarkerStyle(3);
   graph->SetPoint(0,1,6);
   graph->SetPoint(1,2,7);
   graph->SetPoint(2,4,8);
   graph->SetPoint(3,8,9);
   graph->SetPoint(4,12,10);
   
   TH1 *Graph1 = new TH1F("Graph1","",100,0,13.1);
   Graph1->SetMinimum(5.6);
   Graph1->SetMaximum(10.4);
   Graph1->SetDirectory(0);
   Graph1->SetStats(0);
   graph->SetHistogram(Graph1);
   
   graph->Draw("ap");
   pad_1->Modified();
   pad->cd();
  
// ------------>Primitives in pad: pad_2
   pad_2 = new TPad("pad_2", "pad_2",0.5001,0.5001,0.9999,0.9999);
   pad_2->Draw();
   pad_2->cd();
   pad_2->Range(-1.667839,4.607008,15.39783,11.66195);
   pad_2->SetBorderSize(2);
   
   TGraphErrors *gre = new TGraphErrors(5);
   gre->SetName("Graph");
   gre->SetTitle("");
   gre->SetFillColor(6);
   gre->SetMarkerColor(7);
   gre->SetMarkerStyle(3);
   gre->SetPoint(0,1,6);
   gre->SetPointError(0,0.2,0.2);
   gre->SetPoint(1,2,7);
   gre->SetPointError(1,0.4,0.4);
   gre->SetPoint(2,4,8);
   gre->SetPointError(2,0.2,0.2);
   gre->SetPoint(3,8,9);
   gre->SetPointError(3,0.6,0.6);
   gre->SetPoint(4,12,10);
   gre->SetPointError(4,0.5,0.5);
   
   TH1 *Graph1 = new TH1F("Graph1","",100,0,13.67);
   Graph1->SetMinimum(5.33);
   Graph1->SetMaximum(10.97);
   Graph1->SetDirectory(0);
   Graph1->SetStats(0);
   gre->SetHistogram(Graph1);
   
   gre->Draw("apcf");
   pad_2->Modified();
   pad->cd();
  
// ------------>Primitives in pad: pad_3
   pad_3 = new TPad("pad_3", "pad_3",0.0001,0.0001,0.4999,0.4999);
   pad_3->Draw();
   pad_3->cd();
   pad_3->Range(-1.6375,5,14.7375,11);
   pad_3->SetBorderSize(2);
   
   graph = new TGraph(5);
   graph->SetName("Graph");
   graph->SetTitle("");
   graph->SetFillColor(1);
   graph->SetMarkerColor(4);
   graph->SetMarkerStyle(3);
   graph->SetPoint(0,1,6);
   graph->SetPoint(1,2,7);
   graph->SetPoint(2,4,8);
   graph->SetPoint(3,8,9);
   graph->SetPoint(4,12,10);
   
   TH1 *Graph12 = new TH1F("Graph12","",100,0,13.1);
   Graph12->SetMinimum(5.6);
   Graph12->SetMaximum(10.4);
   Graph12->SetDirectory(0);
   Graph12->SetStats(0);
   graph->SetHistogram(Graph12);
   
   graph->Draw("acp");
   pad_3->Modified();
   pad->cd();
  
// ------------>Primitives in pad: pad_4
   pad_4 = new TPad("pad_4", "pad_4",0.5001,0.0001,0.9999,0.4999);
   pad_4->Draw();
   pad_4->cd();
   pad_4->Range(-1.70875,4.625,15.37875,11.675);
   pad_4->SetBorderSize(2);
   
   gre = new TGraphErrors(5);
   gre->SetName("Graph");
   gre->SetTitle("");
   gre->SetFillColor(6);
   gre->SetMarkerColor(7);
   gre->SetMarkerStyle(3);
   gre->SetPoint(0,1,6);
   gre->SetPointError(0,0.2,0.2);
   gre->SetPoint(1,2,7);
   gre->SetPointError(1,0.4,0.4);
   gre->SetPoint(2,4,8);
   gre->SetPointError(2,0.2,0.2);
   gre->SetPoint(3,8,9);
   gre->SetPointError(3,0.6,0.6);
   gre->SetPoint(4,12,10);
   gre->SetPointError(4,0.5,0.5);
   
   TH1 *Graph12 = new TH1F("Graph12","",100,0,13.67);
   Graph12->SetMinimum(5.33);
   Graph12->SetMaximum(10.97);
   Graph12->SetDirectory(0);
   Graph12->SetStats(0);
   gre->SetHistogram(Graph12);
   
   gre->Draw("ap");
   pad_4->Modified();
   pad->cd();
   pad->Modified();
   c1->cd();
   c1->Modified();
   c1->cd();
   c1->SetSelected(c1);
}
