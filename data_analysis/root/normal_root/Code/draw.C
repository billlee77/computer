#include<iostream>

#include<TCanvas.h>
#include<TGraph.h>
#include<TGraphErrors.h>
#include<TGraphAsymmErrors.h>
#include<TPad.h>
#include<TH1.h>
#include<TVirtualFitter.h>



using namespace std;

void draw()
{
    TCanvas* c1 = new TCanvas("c1", "Draw Things",10, 10, 1000, 1000);

    double x[5] = {1, 2, 4, 8, 12};
    double y[5] = {6, 7, 8, 9, 10};
    double ex[5] = {.2, .4, .2, .6, .5};
    double ey[5] = {.2, .4, .2, .6, .5}; 
  
    TGraph *g = new TGraph (5, x, y);
    TGraphErrors * ge = new TGraphErrors(5, x, y, ex, ey);
    TGraphErrors * f = new TGraphErrors(5, x, y, ex, ey);
    
    g->SetMarkerColor(4);
    g->SetMarkerStyle(21);
    g->SetTitle(0);

    ge->SetMarkerColor(7);
    ge->SetMarkerStyle(40);
    ge->SetFillColor(6); 
    ge->SetTitle(0);  

    TPad *pad = new TPad("pad","pad", 0.10, 0.10, 0.90, 0.90);
    pad->Draw();
    pad->cd();
    pad-> Divide(2, 2, 0.0001, 0.0001 );
    
    pad->cd(1);
    g->Draw("AP"); 
     
    pad -> cd(2);
    f->Draw("A*CF"); 

    pad->cd(3);
    g->Draw("AC*");

//Fit function

    //TGraphErrors *cgr = TGraph(g);
    //for (unsigned int i=0; i<5; i++)
    //{
    //   cgr->SetPoint(i,g->GetX()[i], 0);
    //}
 
    //(TVirtualFitter::GetFitter())->GetConfidenceIntervals(cgr);
    pad->cd(4);
    //cgr->SetlineColor(4); 
    //cgr->Draw("ap");
    TF1 *fpol = new TF1("fpol", "pol1",0, 12);
    fpol->SetLineWidth(1);
    fpol->SetNpx(100000);
    ge->Fit(fpol,"Q");
    ge->Draw("AP"); 
     
    c1->SaveAs("foo.eps"); 
    c1->cd(); 
    
}
