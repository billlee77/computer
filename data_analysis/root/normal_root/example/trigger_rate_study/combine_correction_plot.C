{
  
  TFile * filepi = new TFile("pi_7GeV.root", "read");
  TFile * filep =   new TFile("p_7GeV.root", "read");
  TFile * filek =   new TFile("k_7GeV.root", "read");
  
  TGraph* effpi = (TGraph*) filepi -> Get("efficiency_plot/eff;1");
  TGraph* effp = (TGraph*) filep -> Get("efficiency_plot/eff;1");
  TGraph* effk = (TGraph*) filek -> Get("efficiency_plot/eff;1");
  

  TGraph* effpi_new = new TGraph();
  TGraph* effp_new = new TGraph(); 
  TGraph* effk_new = new TGraph();

//   double x_max = 10;
//   double y_min = 0.75;

  double x_max = 30;
  double y_min = 0.94;


  double x,y;

  for ( int i=0; i< effpi->GetN(); i++) {
	if ( i > 0) {

		effpi->GetPoint(i, x, y);
    	cout << i << "  "<< x-1 << "    "<<y << "  " << endl;
		effpi_new->SetPoint(i-1, x-1, y);
	}
  }

  for ( int i=0; i< effk->GetN(); i++) {
	if ( i > 0) {
		effk->GetPoint(i, x, y);
    	cout << i << "  "<< x-1 << "    "<<y << "  " << endl;
		effk_new->SetPoint(i-1, x-1, y);
	}
  }


  for ( int i=0; i< effp->GetN(); i++) {
	if ( i > 0) {
		effp->GetPoint(i, x, y);
    	cout << i << "  "<< x-1 << "    "<<y << "  " << endl;
		effp_new->SetPoint(i-1, x-1, y);
	}
  }




  //effk->GetYaxis()->SetRange(0.8, 1.0);


  //effpi->GetXaxis()->SetLimits(0, 10);
  //effk->GetXaxis()->SetLimits(0, 10);
  //effpi->GetHistogram()->SetMinimum(0.75);



  TCanvas *c1 = new TCanvas("c1","",1200,900);
  c1->Divide(1,2,0);
 
  c1->cd(1);
  c1 -> GetPad(1)-> SetRightMargin(0.05);
  c1 -> GetPad(1)-> SetTopMargin(0.1);
  effpi_new->SetMarkerStyle(22);
  effpi_new-> SetTitle("Particle Triggering Efficiency");
  gStyle->SetTitleFontSize(0.07);
  effpi_new->GetYaxis()->SetTitle("Efficiency");
  effpi_new->GetYaxis()->CenterTitle();
  effpi_new->GetYaxis()->SetTitleOffset(0.6);
  effpi_new->GetYaxis()->SetTitleSize(0.07);
  effpi_new->GetYaxis()->SetLabelSize(0.06);

  effpi_new->GetYaxis()->SetDecimals(kTRUE);
  effpi_new->Draw("AP");

  effpi_new->GetXaxis()->SetLimits(0, x_max);
  effpi_new->GetHistogram()->SetMaximum(1);   // along          
  effpi_new->GetHistogram()->SetMinimum(y_min);
 

  c1->Update();
  
  c1->cd(2);
  c1 -> GetPad(2)-> SetRightMargin(0.05);
  c1 -> GetPad(2)-> SetBottomMargin(0.15);

  effk_new->GetXaxis()->SetTitle("Threshold");
  effk_new->GetXaxis()->CenterTitle();
  effk_new->GetXaxis()->SetTitleOffset(0.9);
  effk_new->GetXaxis()->SetTitleSize(0.07); 
  effk_new->GetYaxis()->SetLabelSize(0.06);
  effk_new->GetXaxis()->SetLabelSize(0.07);
  effk_new->GetYaxis()->SetTitleOffset(1.2);
  effk_new->GetYaxis()->SetDecimals(kTRUE);

  effk_new->Draw("AP*");

  effp_new->SetMarkerStyle(26);
  effp_new->Draw("Psame");

 
  effk_new->GetXaxis()->SetLimits(0, x_max);

  c1->Update();

//   
  c1->cd(1);
  
  leg = new TLegend(0.7,0.65, 0.95, 0.9);
  leg->AddEntry(effpi_new, "Pion Efficiency","P");
  leg->AddEntry(effk_new,  "Kaon Efficiency","P");
  leg->AddEntry(effp_new,  "Proton Efficiency","P");
  leg->SetBorderSize(1);
  leg->SetFillColor(0);
  leg->Draw();
  
}
