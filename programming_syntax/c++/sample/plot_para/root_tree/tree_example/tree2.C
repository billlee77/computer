 #include "TFile.h"
 #include "TH1.h"
 #include "TH2.h"
 #include "TProfile.h"
 #include "TRandom.h"
 #include "TTree.h"


 //______________________________________________________________________________
int tree2()
 {
 // Create a new ROOT binary machine independent file.
 // Note that this file may contain any kind of ROOT objects, histograms,trees
 // pictures, graphics objects, detector geometries, tracks, events, etc..
 // This file is now becoming the current directory.
   TFile hfile("htree.root","RECREATE","Demo ROOT file with histograms & trees");

 // Define some simple structures
   struct POINT{Float_t x,y,z;} ;

   POINT point;

//    static POINT point;
//    static EVENTN eventn;

 // Create a ROOT Tree
   TTree *tree = new TTree("T","An example of ROOT tree with a few branches");
   tree->Branch("point",&point,"x:y:z");

   for (int i = 0; i < 100; i++) {

 	 point.x =i;
  	 point.y =i;
  	 point.z =i;
     tree->Fill();
}
//    tree->Branch("eventn",&eventn,"ntrack/I:nseg:nvertex:flag/i:temperature/F");
//    tree->Branch("hpx","TH1F",&hpx,128000,0);
// 
//    Float_t px,py,pz;
//    static Float_t p[3];
// 
//  //--------------------Here we start a loop on 1000 events
//    for ( Int_t i=0; i<1000; i++) {
//       gRandom->Rannor(px,py);
//       pz = px*px + py*py;
//       Float_t random = gRandom->::Rndm(1);
// 
//  //         Fill histograms
//       hpx->Fill(px);
//       hpxpy->Fill(px,py,1);
//       hprof->Fill(px,pz,1);
// 
//  //         Fill structures
//       p[0] = px;
//       p[1] = py;
//       p[2] = pz;
//       point.x = 10*(random-1);;
//       point.y = 5*random;
//       point.z = 20*random;
//       eventn.ntrack  = Int_t(100*random);
//       eventn.nseg    = Int_t(2*eventn.ntrack);
//       eventn.nvertex = 1;
//       eventn.flag    = Int_t(random+0.5);
//       eventn.temperature = 20+random;
// 
//  //        Fill the tree. For each event, save the 2 structures and 3 objects
//  //      In this simple example, the objects hpx, hprof and hpxpy are slightly
//  //      different from event to event. We expect a big compression factor!
//       tree->Fill();
//    }
//   //--------------End of the loop
// 
   tree->Print();

 // Save all objects in this file
   hfile.Write();

 // Close the file. Note that this is automatically done when you leave
 // the application.
   hfile.Close();

   return 0;
 }


