{


	TFile * filepi = new TFile("pi_7GeV.root", "read");
  	TFile * filep = new TFile  ("p_7GeV.root", "read");
  	TFile * filek = new TFile  ("k_7GeV.root", "read");

	c1 = new TCanvas("c1","Photo-Electron Peak",1200,900);
	c1->SetGrid();
	
	TH1F * pi = (TH1F*) filepi -> Get("efficiency_plot/Hit Event;1");
	TH1F * p  = (TH1F*) filep  -> Get("efficiency_plot/Hit Event;1");
	TH1F * k  = (TH1F*) filek  -> Get("efficiency_plot/Hit Event;1");
	TH1F * total  = new TH1F("","", 500, 0, 500);



	total->Add(pi);
 	total->Add(p);
 	total->Add(k);

 	k->SetStats(0);
 	p->SetStats(0);
 	pi->SetStats(0);

    k ->SetFillStyle(1001);

	pi->SetLineColor(2);
	pi->SetFillColor(2);

    p ->SetLineColor(6);
    p ->SetFillColor(6);
    p ->SetFillStyle(1001);

//     total->SetMarkerStyle(21);
//     total->SetMarkerSize(0.7);
 	total -> SetLineColor(7);
    total -> SetFillStyle(3005);
    total -> SetFillColor(7);

	//k ->SetLineColor(16);

	k->GetXaxis()->SetTitle("Detected Photo-Elections per Event");
	k->Draw("hist");

	c1->Update();

	double y_max;
	y_max = k->GetMaximum() *1.1;

	k->SetMaximum(y_max);


	k->GetXaxis()->SetRange(0, 90);

	p->Draw("same");



    Float_t rightmax = 1.1*pi->GetMaximum();
    Float_t scale = gPad->GetUymax()/rightmax;


	pi->Scale(scale);
	pi->Draw("same");
	
	total->Scale(scale);
	total->Draw("same");

	c1->Update();

	//pi->Draw("hit");

    TGaxis *axis = new TGaxis( gPad->GetUxmax(),gPad->GetUymin(), gPad->GetUxmax(), gPad->GetUymax(),0,rightmax,510,"+L");
    axis->SetLineColor(kRed);
    axis->SetLabelColor(kRed);
    axis->Draw();

   TLegend *legend = new TLegend(0.72,0.73,0.88,0.88);
   legend->AddEntry(pi, "#pi","f");
   legend->AddEntry(k,  "K","f");
   legend->AddEntry(p,  "Proton","f");
   legend->AddEntry(total,"Total","f");
   legend->SetFillColor(0);
   legend->SetBorderSize(1);
   legend->Draw();
}
