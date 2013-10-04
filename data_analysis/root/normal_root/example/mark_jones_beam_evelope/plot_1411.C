#include <iostream.h>
#include <TFile.h>
#include <TNtuple.h>
#include <TH1.h>
#include <TH2.h>
#include <TCanvas.h>
#include <TStyle.h>
#include <TROOT.h>
#include <TMath.h>
#include <TProfile.h>
void plot_1411() {
 gROOT->Reset();
 gStyle->SetOptStat(0);
 gStyle->SetTitleOffset(1.,"Y");
 gStyle->SetTitleOffset(.7,"X");
 gStyle->SetLabelSize(0.04,"XY");
 gStyle->SetTitleSize(0.06,"XY");
 gStyle->SetPadLeftMargin(0.12);
TFile *fsimc = new TFile("rootfiles/shms_20cmtarg_20deg_wc_mscat.root");
TTree *tsimc = (TTree*)fsimc->Get("h1411");
//Declaration of leaves types
 Float_t         hsxfp; // position at focal plane ,+X is pointing down
 Float_t         hsyfp; // X x Y = Z so +Y pointing central ray left
 Float_t         hsxpfp; // dx/dz at focal plane
 Float_t         hsypfp; //  dy/dz at focal plane
 Float_t         hsztari; // thrown position along the beam direction
 Float_t         hsytari;  //thrown  horizontal position X x Y = Z so +Y pointing central ray left at plane perpendicular to SHMS at z=0
 Float_t         hsdeltai; // thrown  100*(p - pc)/pc with pc = central SHMS momentum 
 Float_t         hsyptari; // thrown target dy/dz horizontal slope
 Float_t         hsxptari; // thrown target dx/dz vertical slope
 Float_t         hsztar; // reconstructed position along the beam directio
 Float_t         hsytar; //reconstructed horizontal position
 Float_t         hsdelta;//reconstructed
   Float_t         hsyptar;//reconstructed
   Float_t         hsxptar;//reconstructed
   Float_t         hsxtari;// from thrown kinematics , the calculated vertical position at plane perpendicular to SHMS at z=0
   Float_t         yrast;// vertical raster position
   // Set branch addresses.
   tsimc->SetBranchAddress("hsxfp",&hsxfp);
   tsimc->SetBranchAddress("hsyfp",&hsyfp);
   tsimc->SetBranchAddress("hsxpfp",&hsxpfp);
   tsimc->SetBranchAddress("hsypfp",&hsypfp);
   tsimc->SetBranchAddress("hsztari",&hsztari);
   tsimc->SetBranchAddress("hsytari",&hsytari);
   tsimc->SetBranchAddress("hsdeltai",&hsdeltai);
   tsimc->SetBranchAddress("hsyptari",&hsyptari);
   tsimc->SetBranchAddress("hsxptari",&hsxptari);
   tsimc->SetBranchAddress("hsztar",&hsztar);
   tsimc->SetBranchAddress("hsytar",&hsytar);
   tsimc->SetBranchAddress("hsdelta",&hsdelta);
   tsimc->SetBranchAddress("hsyptar",&hsyptar);
   tsimc->SetBranchAddress("hsxptar",&hsxptar);
   tsimc->SetBranchAddress("hsxtari",&hsxtari);
   //
 TH1F *hxptari = new TH1F("hxptari",";Initial xptar ",100,-.1,.1);
 TH1F *hxptarf = new TH1F("hxptarf",";Recon xptar ",100,-.1,.1);
 TH1F *difxptar = new TH1F("difxptar",";Xptar diff (mr) ",50,-5,5.);
 TH2F *difxptarVxptari = new TH2F("difxptarVxptari",";Init xptar (rad);Xptar diff (mr)",25,-.05,.05,50,-5,5.);
 TH2F *difxptarVyptari = new TH2F("difxptarVyptari",";Init yptar (rad);Xptar diff (mr)",30,-.03,.03,50,-5,5.);
 TH2F *difxptarVxfp = new TH2F("difxptarVxfp",";xfp (cm);Xptar diff (mr)",100,-40.,40.,50,-5,5.);
 TH2F *difxptarVyfp = new TH2F("difxptarVyfp",";yfp (cm);Xptar diff (mr)",100,-30.,30.,50,-5,5.);
 TH2F *difxptarVxpfp = new TH2F("difxptarVxpfp",";xpfp (cm);Xptar diff (mr)",100,-.1,.1,50,-5,5.);
 TH2F *difxptarVypfp = new TH2F("difxptarVypfp",";ypfp (cm);Xptar diff (mr)",100,-.05,.05,50,-5,5.);
 TH2F *difxptarVdeltai = new TH2F("difxptarVdeltai",";Init delta ;Xptar diff (mr)",16,-.1,.22,50,-5,5.);
 TH1F *hyptari = new TH1F("hyptari",";Initial yptar ",100,-.05,.05);
 TH1F *hyptarf = new TH1F("hyptarf",";Recon yptar ",100,-.05,.05);
 //
 TH1F *difyptar = new TH1F("difyptar",";Yptar diff (mr) ",50,-5,5.);
 TH2F *difyptarVxptari = new TH2F("difyptarVxptari",";Init xptar (rad);Yptar diff (mr)",25,-.05,.05,50,-5,5.);
 TH2F *difyptarVyptari = new TH2F("difyptarVyptari",";Init yptar (rad);Yptar diff (mr)",30,-.03,.03,50,-5,5.);
 TH2F *difyptarVxfp = new TH2F("difyptarVxfp",";xfp (cm);Yptar diff (mr)",100,-40.,40.,50,-5,5.);
 TH2F *difyptarVyfp = new TH2F("difyptarVyfp",";yfp (cm);Yptar diff (mr)",100,-30.,30.,50,-5,5.);
 TH2F *difyptarVxpfp = new TH2F("difyptarVxpfp",";xpfp (cm);Yptar diff (mr)",100,-.1,.1,50,-5,5.);
 TH2F *difyptarVypfp = new TH2F("difyptarVypfp",";ypfp (cm);Yptar diff (mr)",100,-.05,.05,50,-5,5.);
 TH2F *difyptarVdeltai = new TH2F("difyptarVdeltai",";Init delta ;Yptar diff (mr)",16,-.1,.22,50,-5,5.);
 //
 TH1F *difytar = new TH1F("difytar",";Ytar diff (cm) ",40,-2.,2.);
 TH2F *difytarVxptari = new TH2F("difytarVxptari",";Init xptar (rad);Ytar diff (cm)",25,-.05,.05,40,-2.,2.);
 TH2F *difytarVyptari = new TH2F("difytarVyptari",";Init yptar (rad);Ytar diff (cm)",30,-.03,.03,40,-2.,2.);
 TH2F *difytarVxfp = new TH2F("difytarVxfp",";xfp (cm);Ytar diff (cm)",100,-40.,40.,40,-2.,2.);
 TH2F *difytarVyfp = new TH2F("difytarVyfp",";yfp (cm);Ytar diff (cm)",100,-30.,30.,40,-2.,2.);
 TH2F *difytarVxpfp = new TH2F("difytarVxpfp",";xpfp (cm);Ytar diff (cm)",100,-.1,.1,40,-2.,2.);
 TH2F *difytarVypfp = new TH2F("difytarVypfp",";ypfp (cm);Ytar diff (cm)",100,-.05,.05,40,-2.,2.);
 TH2F *difytarVdeltai = new TH2F("difytarVdeltai",";Init delta ;Ytar diff (cm)",16,-.1,.22,40,-2.,2.);
 //
 TH1F *difdelta = new TH1F("difdelta",";Delta diff (%) ",40,-.1,.1);
 TH2F *difdeltaVxptari = new TH2F("difdeltaVxptari",";Init xptar (rad);Delta diff (%)",25,-.05,.05,40,-.1,.1);
 TH2F *difdeltaVyptari = new TH2F("difdeltaVyptari",";Init yptar (rad);Delta diff (%)",30,-.03,.03,40,-.1,.1);
 TH2F *difdeltaVxfp = new TH2F("difdeltaVxfp",";xfp (cm);Delta diff (%)",100,-40.,40.,40,-.1,.1);
 TH2F *difdeltaVyfp = new TH2F("difdeltaVyfp",";yfp (cm);Delta diff (%)",100,-30.,30.,40,-.1,.1);
 TH2F *difdeltaVxpfp = new TH2F("difdeltaVxpfp",";xpfp (cm);Delta diff (%)",100,-.1,.1,40,-.1,.1);
 TH2F *difdeltaVypfp = new TH2F("difdeltaVypfp",";ypfp (cm);Delta diff (%)",100,-.05,.05,40,-.1,.1);
 TH2F *difdeltaVdeltai = new TH2F("difdeltaVdeltai",";Init delta ;Delta diff (%)",16,-.1,.22,40,-.1,.1);
//
   Long64_t nentries = tsimc->GetEntries();
   for (int i = 0; i < nentries; i++) {
        tsimc->GetEntry(i);
	hxptari->Fill(hsxptari);
	hxptarf->Fill(hsxptar);
	difxptar->Fill(1000*(hsxptar-hsxptari));
	difxptarVxptari->Fill(hsxptari,1000*(hsxptar-hsxptari));
	difxptarVyptari->Fill(hsyptari,1000*(hsxptar-hsxptari));
	difxptarVxfp->Fill(hsxfp,1000*(hsxptar-hsxptari));
	difxptarVyfp->Fill(hsyfp,1000*(hsxptar-hsxptari));
	difxptarVxpfp->Fill(hsxpfp,1000*(hsxptar-hsxptari));
	difxptarVypfp->Fill(hsypfp,1000*(hsxptar-hsxptari));
	difxptarVdeltai->Fill(hsdeltai/100.,1000*(hsxptar-hsxptari));
	//
	difyptar->Fill(1000*(hsyptar-hsyptari));
	difyptarVxptari->Fill(hsxptari,1000*(hsyptar-hsyptari));
	difyptarVyptari->Fill(hsyptari,1000*(hsyptar-hsyptari));
	difyptarVxfp->Fill(hsxfp,1000*(hsyptar-hsyptari));
	difyptarVyfp->Fill(hsyfp,1000*(hsyptar-hsyptari));
	difyptarVxpfp->Fill(hsxpfp,1000*(hsyptar-hsyptari));
	difyptarVypfp->Fill(hsypfp,1000*(hsyptar-hsyptari));
	difyptarVdeltai->Fill(hsdeltai/100.,1000*(hsyptar-hsyptari));
	//
	difdelta->Fill((hsdelta-hsdeltai));
	difdeltaVxptari->Fill(hsxptari,(hsdelta-hsdeltai));
	difdeltaVyptari->Fill(hsyptari,(hsdelta-hsdeltai));
	difdeltaVxfp->Fill(hsxfp,(hsdelta-hsdeltai));
	difdeltaVyfp->Fill(hsyfp,(hsdelta-hsdeltai));
	difdeltaVxpfp->Fill(hsxpfp,(hsdelta-hsdeltai));
	difdeltaVypfp->Fill(hsypfp,(hsdelta-hsdeltai));
	difdeltaVdeltai->Fill(hsdeltai/100.,(hsdelta-hsdeltai));
	//
	difytar->Fill((hsytar-hsytari));
	difytarVxptari->Fill(hsxptari,(hsytar-hsytari));
	difytarVyptari->Fill(hsyptari,(hsytar-hsytari));
	difytarVxfp->Fill(hsxfp,(hsytar-hsytari));
	difytarVyfp->Fill(hsyfp,(hsytar-hsytari));
	difytarVxpfp->Fill(hsxpfp,(hsytar-hsytari));
	difytarVypfp->Fill(hsypfp,(hsytar-hsytari));
	difytarVdeltai->Fill(hsdeltai/100.,(hsytar-hsytari));
   }
   //
TCanvas *cxptar = new TCanvas("cxptar"," Compare Recon/Inital xptar 8 GeV, point target, no wire ch, no mscat",1400,1000);
cxptar->Divide(4,3);
cxptar->cd(4);
difxptar->Draw();
cxptar->cd(1);
difxptarVdeltai->Draw("colz");
cxptar->cd(5);
 difxptarVdeltai->FitSlicesY();
TH1D *difxptarVdeltai_2 = (TH1D*)gDirectory->Get("difxptarVdeltai_2");
 difxptarVdeltai_2->SetTitle(";Init Delta; Fitted Sigma of Xptar diff (mr)");
 difxptarVdeltai_2->Draw();
cxptar->cd(2);
difxptarVxptari->Draw("colz");
cxptar->cd(6);
 difxptarVxptari->FitSlicesY();
TH1D *difxptarVxptari_2 = (TH1D*)gDirectory->Get("difxptarVxptari_2");
 difxptarVxptari_2->SetTitle(";Init Xptar; Fitted Sigma of Xptar diff (mr)");
 difxptarVxptari_2->Draw();
cxptar->cd(3);
difxptarVyptari->Draw("colz");
cxptar->cd(7);
 difxptarVyptari->FitSlicesY();
TH1D *difxptarVyptari_2 = (TH1D*)gDirectory->Get("difxptarVyptari_2");
 difxptarVyptari_2->SetTitle(";Init Yptar; Fitted Sigma of Xptar diff (mr)");
 difxptarVyptari_2->Draw();
cxptar->cd(9);
difxptarVxfp->Draw("colz");
cxptar->cd(10);
difxptarVyfp->Draw("colz");
cxptar->cd(11);
difxptarVxpfp->Draw("colz");
cxptar->cd(12);
difxptarVypfp->Draw("colz");
//
 TCanvas *cyptar = new TCanvas("cyptar"," Compare Recon/Inital yptar 8 GeV, point target, no wire ch, no mscat",1400,1000);
cyptar->Divide(4,3);
cyptar->cd(4);
difyptar->Draw();
cyptar->cd(1);
difyptarVdeltai->Draw("colz");
cyptar->cd(5);
 difyptarVdeltai->FitSlicesY();
TH1D *difyptarVdeltai_2 = (TH1D*)gDirectory->Get("difyptarVdeltai_2");
 difyptarVdeltai_2->SetTitle(";Init Delta; Fitted Sigma of Yptar diff (mr)");
 difyptarVdeltai_2->Draw();
cyptar->cd(2);
difyptarVxptari->Draw("colz");
cyptar->cd(6);
 difyptarVxptari->FitSlicesY();
TH1D *difyptarVxptari_2 = (TH1D*)gDirectory->Get("difyptarVxptari_2");
 difyptarVxptari_2->SetTitle(";Init Xptar; Fitted Sigma of Yptar diff (mr)");
 difyptarVxptari_2->Draw();
cyptar->cd(3);
difyptarVyptari->Draw("colz");
cyptar->cd(7);
 difyptarVyptari->FitSlicesY();
TH1D *difyptarVyptari_2 = (TH1D*)gDirectory->Get("difyptarVyptari_2");
 difyptarVyptari_2->SetTitle(";Init Yptar; Fitted Sigma of Yptar diff (mr)");
 difyptarVyptari_2->Draw();
cyptar->cd(9);
difyptarVxfp->Draw("colz");
cyptar->cd(10);
difyptarVyfp->Draw("colz");
cyptar->cd(11);
difyptarVxpfp->Draw("colz");
cyptar->cd(12);
difyptarVypfp->Draw("colz");
//
 TCanvas *cdelta = new TCanvas("cdelta"," Compare Recon/Inital delta 8 GeV, point target, no wire ch, no mscat",1400,1000);
cdelta->Divide(4,3);
cdelta->cd(4);
difdelta->Draw();
cdelta->cd(1);
difdeltaVdeltai->Draw("colz");
cdelta->cd(5);
 difdeltaVdeltai->FitSlicesY();
TH1D *difdeltaVdeltai_2 = (TH1D*)gDirectory->Get("difdeltaVdeltai_2");
 difdeltaVdeltai_2->SetTitle(";Init Delta; Fitted Sigma of Delta diff (%)");
 difdeltaVdeltai_2->Draw();
cdelta->cd(2);
difdeltaVxptari->Draw("colz");
cdelta->cd(6);
 difdeltaVxptari->FitSlicesY();
TH1D *difdeltaVxptari_2 = (TH1D*)gDirectory->Get("difdeltaVxptari_2");
 difdeltaVxptari_2->SetTitle(";Init Xptar; Fitted Sigma of Delta diff (%)");
 difdeltaVxptari_2->Draw();
cdelta->cd(3);
difdeltaVyptari->Draw("colz");
cdelta->cd(7);
 difdeltaVyptari->FitSlicesY();
TH1D *difdeltaVyptari_2 = (TH1D*)gDirectory->Get("difdeltaVyptari_2");
 difdeltaVyptari_2->SetTitle(";Init Yptar; Fitted Sigma of Delta diff (%)");
 difdeltaVyptari_2->Draw();
cdelta->cd(9);
difdeltaVxfp->Draw("colz");
cdelta->cd(10);
difdeltaVyfp->Draw("colz");
cdelta->cd(11);
difdeltaVxpfp->Draw("colz");
cdelta->cd(12);
difdeltaVypfp->Draw("colz");
//
 TCanvas *cytar = new TCanvas("cytar"," Compare Recon/Inital ytar 8 GeV, point target, no wire ch, no mscat",1400,1000);
cytar->Divide(4,3);
cytar->cd(4);
difytar->Draw();
cytar->cd(1);
difytarVdeltai->Draw("colz");
cytar->cd(5);
 difytarVdeltai->FitSlicesY();
TH1D *difytarVdeltai_2 = (TH1D*)gDirectory->Get("difytarVdeltai_2");
 difytarVdeltai_2->SetTitle(";Init Delta; Fitted Sigma of Ytar diff (cm)");
 difytarVdeltai_2->Draw();
cytar->cd(2);
difytarVxptari->Draw("colz");
cytar->cd(6);
 difytarVxptari->FitSlicesY();
TH1D *difytarVxptari_2 = (TH1D*)gDirectory->Get("difytarVxptari_2");
 difytarVxptari_2->SetTitle(";Init Xptar; Fitted Sigma of Ytar diff (cm)");
 difytarVxptari_2->Draw();
cytar->cd(3);
difytarVyptari->Draw("colz");
cytar->cd(7);
 difytarVyptari->FitSlicesY();
TH1D *difytarVyptari_2 = (TH1D*)gDirectory->Get("difytarVyptari_2");
 difytarVyptari_2->SetTitle(";Init Yptar; Fitted Sigma of Ytar diff (cm)");
 difytarVyptari_2->Draw();
cytar->cd(9);
difytarVxfp->Draw("colz");
cytar->cd(10);
difytarVyfp->Draw("colz");
cytar->cd(11);
difytarVxpfp->Draw("colz");
cytar->cd(12);
difytarVypfp->Draw("colz");
}
