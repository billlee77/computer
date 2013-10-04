{

TCanvas *c1 = new TCanvas("c1");

gStyle->SetPalette(1);
TNtuple *n = new TNtuple("", "", "xpos:ypos");
n->ReadFile("par_pos.dat", "xpos:ypos");

TH2F *h1 = new TH2F("h1", "h1",160, -500, 500, 80, -300, 500);

n->Draw("xpos:ypos>>h1","", "goff"); 
//TH2 *h2 = (TH2*) gDirectory->Get("h1");

//h2-> Draw("COLZ"); 
//h2-> SetBins(160, -550, 600, 80, -500, 300);
//h2->SetTitle("");

c1->cd();   
c1->Update();   
h1->SetTitle("");
h1-> Draw("COLZ"); 



}
