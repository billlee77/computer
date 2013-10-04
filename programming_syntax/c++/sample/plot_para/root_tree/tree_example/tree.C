{
TFile *f=new TFile("SimpleTree.root","recreate");
// for each event, you want up to 50000 candidates (or whatever)
Int_t n;
Double_t E[50000];
Float_t Px[50000];
Float_t Py[50000];
Float_t Pz[50000];

TTree* pMyTree= new TTree("SimpleTree","An example of a tree");
pMyTree->Branch("n",&n,"n/I");
pMyTree->Branch("E",&E,"E[n]/D");
pMyTree->Branch("Px",&Px,"Px[n]/F");
pMyTree->Branch("Py",&Py,"Py[n]/F");
pMyTree->Branch("Pz",&Pz,"Pz[n]/F");

for (Int_t i=0;i<100;i++){ // fill in 100 events
n=50000*gRandom->Rndm();   // the number of entries per events is not fixed

for (Int_t j=0;j<n;j++){
E[j]=gRandom->Gaus(10.,2.);
Px[j]=gRandom->Gaus(5.,1.);
Py[j]=gRandom->Gaus(5.,1.);
Pz[j]=gRandom->Gaus(7.,0.6);
}
pMyTree->Fill();
}
pMyTree->Print();
pMyTree->Write();
f->Close();
delete f;
}

