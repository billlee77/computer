{
//=========Macro generated from canvas: 1/1
//=========  (Thu Aug 27 19:46:33 2009) by ROOT version5.20/00
   TCanvas *1 = new TCanvas("1", "1",136,139,700,590);
   1->Range(0.8159785,0.606353,2.31544,2.108471);
   1->SetBorderSize(2);
   1->SetLeftMargin(0.05603448);
   1->SetRightMargin(0.1436782);
   1->SetTopMargin(0.005639098);
   1->SetBottomMargin(0.1954887);
   1->SetFrameFillColor(0);
   
   TGraph *graph = new TGraph(1);
   graph->SetName("Graph");
   graph->SetTitle("Graph");
   graph->SetFillColor(1);
   graph->SetMarkerColor(100);
   graph->SetMarkerStyle(20);
   graph->SetMarkerSize(0.4);
   graph->SetPoint(0,1,1);
   
   TH1 *Graph1112 = new TH1F("Graph1112","Graph",100,0.9,2.1);
   Graph1112->SetMinimum(0.9);
   Graph1112->SetMaximum(2.1);
   Graph1112->SetDirectory(0);
   Graph1112->SetStats(0);
   Graph1112->SetMarkerStyle(20);
   Graph1112->SetMarkerSize(0.5);
   Graph1112->GetXaxis()->SetTitleSize(0.06);
   Graph1112->GetYaxis()->SetTitleSize(0.06);
   graph->SetHistogram(Graph1112);
   
   graph->Draw("ap");
   
   TPaveText *pt = new TPaveText(0.9194078,2.271233,1.384423,2.455437,"br");
   pt->SetFillColor(19);
   TText *text = pt->AddText("good!!!!");
   pt->Draw();
   
   pt = new TPaveText(0.3045977,0.4699248,0.566092,0.6522556,"blNDC");
   pt->SetName("title");
   pt->SetBorderSize(2);
   pt->SetFillColor(19);
   text = pt->AddText("Graph");
   pt->Draw();
   1->Modified();
   1->cd();
   1->SetSelected(1);
   1->ToggleToolBar();
}
