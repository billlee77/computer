{
TCanvas *c1 = new TCanvas("c1","",800,600);

TNtuple *n = new TNtuple("", "", "delta");

//n->ReadFile("tanjia.dat", "delta");
//n->ReadFile("mark.dat", "delta");
n->ReadFile("mark_cut.dat", "delta");

TH1F*h1 = new TH1F("h1", "" ,500, -16, 31);


n->Draw("delta>>h1", "", "goff"); 

TH1 *h2 = (TH2*) gDirectory->Get("h1");

h2->SetTitle("Delta Distribution");

h2->GetXaxis()->SetTitle("Delta");
h2->GetXaxis()->CenterTitle();

h2->GetYaxis()->SetTitle("Number of Pion");
h2->GetYaxis()->CenterTitle();

h2-> Draw("HIST"); 


}
