{
  
  TFile * filepi = new TFile("pi_7GeV.root", "read");
  TFile * filep =   new TFile("p_7GeV.root", "read");
  TFile * filek =   new TFile("k_7GeV.root", "read");
  
  TGraph* effpi = (TGraph*) filepi -> Get("efficiency_plot/eff;1");
  TGraph* effp = (TGraph*) filep -> Get("efficiency_plot/eff;1");
  TGraph* effk = (TGraph*) filek -> Get("efficiency_plot/eff;1");
  

  effpi->GetXaxis()->SetLimits(0, 30);
  effpi->GetHistogram()->SetMaximum(1);   // along          
  effpi->GetHistogram()->SetMinimum(0.94);

  effk->GetXaxis()->SetLimits(0, 30);
  //effk->GetYaxis()->SetRange(0.8, 1.0);


  //effpi->GetXaxis()->SetLimits(0, 10);
  //effk->GetXaxis()->SetLimits(0, 10);
  //effpi->GetHistogram()->SetMinimum(0.75);



  TCanvas *c1 = new TCanvas("c1","",1200,900);
  c1->Divide(1,2,0);
 
  c1->cd(1);
  c1 -> GetPad(1)-> SetRightMargin(0.05);
  c1 -> GetPad(1)-> SetTopMargin(0.1);
  effpi->SetMarkerStyle(22);
  effpi-> SetTitle("Particle Triggering Efficiency");
  gStyle->SetTitleFontSize(0.07);
  effpi->GetYaxis()->SetTitle("Efficiency");
  effpi->GetYaxis()->CenterTitle();
  effpi->GetYaxis()->SetTitleOffset(0.6);
  effpi->GetYaxis()->SetTitleSize(0.07);
  effpi->GetYaxis()->SetLabelSize(0.06);

  effpi->GetYaxis()->SetDecimals(kTRUE);
  effpi->Draw("AP");
  
  
  c1->cd(2);
  c1 -> GetPad(2)-> SetRightMargin(0.05);
  c1 -> GetPad(2)-> SetBottomMargin(0.15);

  effk->GetXaxis()->SetTitle("Threshold");
  effk->GetXaxis()->CenterTitle();
  effk->GetXaxis()->SetTitleOffset(0.9);
  effk->GetXaxis()->SetTitleSize(0.07); 
  effk->GetYaxis()->SetLabelSize(0.06);
  effk->GetXaxis()->SetLabelSize(0.07);
  effk->GetYaxis()->SetTitleOffset(1.2);
  effk->GetYaxis()->SetDecimals(kTRUE);

  effk->Draw("AP*");

  effp->SetMarkerStyle(26);
  effp->Draw("Psame");
  
  c1->cd(1);
  
  leg = new TLegend(0.7,0.65, 0.95, 0.9);
  leg->AddEntry(effpi, "Pion Efficiency","P");
  leg->AddEntry(effk,  "Kaon Efficiency","P");
  leg->AddEntry(effp,  "Proton Efficiency","P");
  leg->SetBorderSize(1);
  leg->SetFillColor(0);
  leg->Draw();
  
}
