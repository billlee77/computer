{

//TCanvas *c1 = new TCanvas("c1");

TCanvas *c1 = new TCanvas("c1","",800,600);

c1->Range(-137.8066,-7.066735,575.7576,48.0359);

c1->SetRightMargin(0.2);
c1->SetLeftMargin(0.15);

gStyle->SetPalette(1);

TNtuple *n = new TNtuple("", "", "xpos:ypos");
//n->ReadFile("mark.dat", "xpos:ypos");
//n->ReadFile("tanjia.dat", "xpos:ypos");
//n->ReadFile("mark_cut.dat", "xpos:ypos");
n->ReadFile("tanjia_half.dat", "xpos:ypos");

//TH2F*h1 = new TH2F("h1", "",120, -50, 50, 100, -30, 50);
TH2F*h1 = new TH2F("Particle Envelope", "", 180, -70, 70, 180, -80, 80);

/*--------------------------------------------------
 * Plot Ntuple
 * Method 1 
 */
n->Draw("xpos:ypos>> Particle Envelope","", "colz"); 
TH2 *h2 = (TH2*) gDirectory->Get("Particle Envelope");

//h2->SetTitle("Pion Beam Envelope");

//h2-> SetBins(101, -500, 500, 81, -300, 500);
//cout << h2 -> GetBinContent(2, 2) << endl;

h2->SetName("Particle Envelope");

h2->SetXTitle("Y(cm)");
h2->GetXaxis()->CenterTitle();

h2->SetYTitle("X(cm)");
h2->GetYaxis()->CenterTitle();

gPad->Update();

TPaletteAxis* palette = (TPaletteAxis*)h2->GetListOfFunctions()->FindObject("palette");
palette->SetY2NDC(0.75);
//palette2->SetX1NDC(0.9);
//palette2->SetX2NDC(0.92);

//	palette2->SetLabelOffset(-0.01);
//palette2->SetTitleOffset(-1);
palette->SetLabelSize(0.025);
palette->GetAxis()->SetTickSize(0.03);
palette->SetX2NDC(0.825);



h2-> Draw("COLZ"); 


/*----------------------------------------------------*/

/*--------------------------------------------------a
 * 2nd Method
  ----------------------------------------------------*/ 

// const int entries = n->GetEntries();
// 
// Float_t x,y;
// 
// n -> SetBranchAddress("xpos", &x); 
// n -> SetBranchAddress("ypos", &y); 
// TH2F*h1 = new TH2F("h1", "h1", 200, -500, 500, 200, -300, 500);
// for (i=0; i<entries; i++) {
// 	n->GetEntry(i);
// 	cout << x << "   " << y << endl;
//     h1->Fill(y,x);
// }
// h1->Draw("COLZ");
/*--------------------------------------------------*/



// //palette2->SetX1NDC(0.9);
// //palette2->SetX2NDC(0.92);
// 
// //	palette2->SetLabelOffset(-0.01);
// //palette2->SetTitleOffset(-1);
// palette->SetLabelSize(0.025);
// palette->GetAxis()->SetTickSize(0.03);
// palette->SetX2NDC(0.825);
// 



}
