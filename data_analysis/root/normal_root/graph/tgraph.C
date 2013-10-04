{
//=========Macro generated from canvas: 1/1
//=========  (Thu Aug 27 19:41:35 2009) by ROOT version5.20/00
   TCanvas *1 = new TCanvas("1", "1",18,74,700,560);
   1->Range(0.6328546,0.8880597,2.132316,2.386567);
   1->SetFillColor(0);
   1->SetBorderMode(0);
   1->SetBorderSize(2);
   1->SetLeftMargin(0.1781609);
   1->SetRightMargin(0.02155172);
   1->SetTopMargin(0.1912351);
   1->SetBottomMargin(0.007968128);
   1->SetFrameBorderMode(0);
   1->SetFrameBorderMode(0);
   
   TGraph *graph = new TGraph(1);
   graph->SetName("Graph");
   graph->SetTitle("Graph");
   graph->SetFillColor(1);
   graph->SetMarkerColor(100);
   graph->SetMarkerStyle(20);
   graph->SetMarkerSize(0.4);
   graph->SetPoint(0,1,1);
   
   TH1 *Graph11 = new TH1F("Graph11","Graph",100,0.9,2.1);
   Graph11->SetMinimum(0.9);
   Graph11->SetMaximum(2.1);
   Graph11->SetDirectory(0);
   Graph11->SetStats(0);
   Graph11->SetMarkerStyle(20);
   Graph11->SetMarkerSize(0.5);
   Graph11->GetXaxis()->SetTitleSize(0.06);
   Graph11->GetYaxis()->SetTitleSize(0.06);
   graph->SetHistogram(Graph11);
   
   graph->Draw("ap");
   
   TPaveText *pt = new TPaveText(0.8534665,2.412533,1.318649,2.596477,"br");
   TText *text = pt->AddText("good!!!!");
   pt->Draw();
   
   TPaveLabel *pl = new TPaveLabel(0.7599641,2.055224,1.225314,2.335821,"goof!!!!!!!!!!!!!!1","br");
   pl->SetTextSize(0.99);
   pl->Draw();
   1->Modified();
   1->cd();
   1->SetSelected(1);
   1->ToggleToolBar();
}
