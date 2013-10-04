#include <iostream>

#include <TCanvas.h>
#include <TH2.h>
#include <TF1.h>

void Multi_fuction()
  {
    TCanvas *c1 = new TCanvas("c1","two TF in one");
    TH2D *h1 = new TH2D("h1","h1",10,1,10,10,1,10);
 
    const int at =5;
    TF1 *g1 = new TF1("blub","pol0",1,10);
    g1->SetParameter(0,at);
   
    TF1 *g2 = new TF1("g2","[0]",1,10); 
    g2->SetParameter(0,3);

    h1->Draw();
    g1->Draw("Same");
    g2->Draw("Same");
 
    c1->cd();
    c1->Modified();

  }



