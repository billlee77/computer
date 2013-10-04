//////////////////////////////////////////////////////////
// This class has been automatically generated on
// Wed Nov  2 13:52:48 2011 by ROOT version 5.28/00g
// from TTree cer_tree_mirr1/Mirror 1 data
// found on file: tree_test.root
//////////////////////////////////////////////////////////

#ifndef cer_h
#define cer_h

#include <TROOT.h>
#include <TChain.h>
#include <TFile.h>

class cer {
public :
   TTree          *fChain;   //!pointer to the analyzed TTree or TChain
   Int_t           fCurrent; //!current Tree number in a TChain

   // Declaration of leaf types
   Float_t         hit_data_h_x;
   Float_t         hit_data_h_y;
   Float_t         hit_data_h_z;
   UInt_t          hit_data_h_mirror;
   UInt_t          hit_data_h_plane;
   UInt_t          hit_data_h_track;

   // List of branches
   TBranch        *b_hit_data;   //!

   cer(TTree *tree=0);
   virtual ~cer();
   virtual Int_t    Cut(Long64_t entry);
   virtual Int_t    GetEntry(Long64_t entry);
   virtual Long64_t LoadTree(Long64_t entry);
   virtual void     Init(TTree *tree);
   virtual void     Loop();
   virtual Bool_t   Notify();
   virtual void     Show(Long64_t entry = -1);
};

#endif

#ifdef cer_cxx
cer::cer(TTree *tree)
{
// if parameter tree is not specified (or zero), connect the file
// used to generate this class and read the Tree.
   if (tree == 0) {
      TFile *f = (TFile*)gROOT->GetListOfFiles()->FindObject("tree_test.root");
      if (!f) {
         f = new TFile("tree_test.root");
      }
      tree = (TTree*)gDirectory->Get("cer_tree_mirr1");

   }
   Init(tree);
}

cer::~cer()
{
   if (!fChain) return;
   delete fChain->GetCurrentFile();
}

Int_t cer::GetEntry(Long64_t entry)
{
// Read contents of entry.
   if (!fChain) return 0;
   return fChain->GetEntry(entry);
}
Long64_t cer::LoadTree(Long64_t entry)
{
// Set the environment to read one entry
   if (!fChain) return -5;
   Long64_t centry = fChain->LoadTree(entry);
   if (centry < 0) return centry;
   if (!fChain->InheritsFrom(TChain::Class()))  return centry;
   TChain *chain = (TChain*)fChain;
   if (chain->GetTreeNumber() != fCurrent) {
      fCurrent = chain->GetTreeNumber();
      Notify();
   }
   return centry;
}

void cer::Init(TTree *tree)
{
   // The Init() function is called when the selector needs to initialize
   // a new tree or chain. Typically here the branch addresses and branch
   // pointers of the tree will be set.
   // It is normally not necessary to make changes to the generated
   // code, but the routine can be extended by the user if needed.
   // Init() will be called many times when running on PROOF
   // (once per file to be processed).

   // Set branch addresses and branch pointers
   if (!tree) return;
   fChain = tree;
   fCurrent = -1;
   fChain->SetMakeClass(1);

   fChain->SetBranchAddress("hit_data", &hit_data_h_x, &b_hit_data);
   Notify();
}

Bool_t cer::Notify()
{
   // The Notify() function is called when a new file is opened. This
   // can be either for a new TTree in a TChain or when when a new TTree
   // is started when using PROOF. It is normally not necessary to make changes
   // to the generated code, but the routine can be extended by the
   // user if needed. The return value is currently not used.

   return kTRUE;
}

void cer::Show(Long64_t entry)
{
// Print contents of entry.
// If entry is not specified, print current entry
   if (!fChain) return;
   fChain->Show(entry);
}
Int_t cer::Cut(Long64_t entry)
{
// This function may be called from Loop.
// returns  1 if entry is accepted.
// returns -1 otherwise.
   return 1;
}
#endif // #ifdef cer_cxx
