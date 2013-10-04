#include <TFile.h>
#include <TH1.h>
#include <TH2.h>
#include <TCanvas.h>
#include <TF1.h>
#include <TF2.h>
#include <TProfile.h>
//#include <TSpectrum.h>
#include <TStyle.h>
#include <TChain.h>
#include <TPostScript.h>
#include <TLatex.h>
#include <TMath.h>
#include <TPaveLabel.h>
#include <TMinuit.h>
#include <TGraphErrors.h>

#include <iostream>
#include <fstream>
#include <stdlib.h>
#include <math.h>
#include <stdio.h>
#include <string.h>

const int ipo = 4;  // TO BE SET: Number of data points

double x[ipo],y[ipo],xerr[ipo],yerr[ipo];

//*********************************************************************************
//*********************************************************************************
double fitfunction(Double_t *x, Double_t *par)
{
  double result3 = par[0]+x[0]*par[1];
  return result3;   
} 

//*********************************************************************************
//*********************************************************************************
//*********************************************************************************

                                                                             
void xyfit_3(char* plotname = "Gain of Hamamatsu R329-02") {

//*********************************************************************************
//*********************************************************************************
ifstream dat0("xydata.vec"); //TO BE SET: File name for the data file

double xmin = 1000000.;
double xmax = -1000000.;
double ymin = 10000000000.;
double ymax = -10000000000.;

for (int ii=0; ii<ipo; ii++){
  dat0>>x[ii]>>xerr[ii]>>y[ii]>>yerr[ii];
  if ((x[ii]-xerr[ii])<xmin) xmin = x[ii]-xerr[ii];
  if ((x[ii]+xerr[ii])>xmax) xmax = x[ii]+xerr[ii];
  if ((y[ii]-yerr[ii])<ymin) ymin = y[ii]-yerr[ii];
  if ((y[ii]+yerr[ii])>ymax) ymax = y[ii]+yerr[ii];
  cout<<"I = "<<ii<<"  "<<x[ii]<<"  "<<xerr[ii]<<"  "<<y[ii]<<"  "<<yerr[ii]<<endl;
}

dat0.close();

cout<<"Min/Max: "<<xmin<<"  -  "<<xmax<<endl;

//*********************************************************************************
//Canvas Definition  
  TCanvas *c1 = new TCanvas("c1", " c1",32,19,800,600);
  //c1->Divide(1,2);

  c1->SetBorderSize(2);
  c1->SetFrameFillColor(0);
  c1->SetGridx();
  c1->SetGridy();
  c1->SetTitle("Datafile: ");

  c1->SetTopMargin(4.8);
  c1->SetBottomMargin(4.8);
  c1->SetLeftMargin(0.55);
  c1->SetRightMargin(0.55);

  gStyle->SetOptFit(110);
  gStyle->SetOptStat(1110);
  gStyle->SetPalette(1);
  gStyle->SetStatX(0.93);
  gStyle->SetStatY(0.96);
  gStyle->SetFitFormat("5.3f");

  gStyle->SetOptDate(0); 
  gStyle->SetDateY(0.0);
  gStyle->SetDateX(0.05);
  gStyle->GetAttDate()->SetTextSize(0.020);

//*********************************************************************************

//Postscript Drawing
  TPostScript ps("test.ps",-111); //TO BE SET: Picture file name
  
  
//*********************************************************************************
//*********************************************************************************
//*********************************************************************************
  c1->Update();  //page #1
  ps.NewPage();
  
  //c1->cd(1);
  gPad->SetGridy();
  gPad->SetGridx();
  gPad->SetFillColor(0);
  gPad->SetTicks();
//  gPad->SetLogy(1);
//  gPad->SetLogx(0);
  
  gPad->SetTopMargin(0.13);
  gPad->SetBottomMargin(0.17);
  gPad->SetLeftMargin(0.1);
  gPad->SetRightMargin(0.1);
  

  
  TGraphErrors *gr12 = new TGraphErrors(ipo,x,y,xerr,yerr);
  gr12->SetTitle(plotname);
  gr12->GetXaxis()->SetTitle("Npe");
  gr12->GetXaxis()->SetLimits(0.,1.1*xmax);
  gr12->GetXaxis()->CenterTitle();
  gr12->SetMinimum(0.);
  gr12->SetMaximum(1.1*ymax);
//  gr12->GetYaxis()->SetNdivisions(-110);
  gr12->GetYaxis()->SetTitle("Ne");
  gr12->GetYaxis()->CenterTitle();
  gr12->SetMarkerColor(4);
  gr12->SetLineColor(4);
  gr12->SetLineWidth(3);
  gr12->SetMarkerStyle(20);
  gr12->SetMarkerSize(1.2);

  TF1 *ffun = new TF1("ffun",fitfunction, 0 , 5 , 2);
   
   //ffun->SetParLimits(0,-3000000.,3000000.);
   //ffun->SetParLimits(1,1000000.,3000000.);
   
   ffun->SetParameter(0, -600000);
   //ffun->FixParameter(0, -600000);
   ffun->SetParameter(1,20000000);
   
   ffun->SetParName(0,"Npe Shift");
   ffun->SetParName(1,"Gain");

   //ffun->SetLineColor(2);
   //ffun->SetLineWidth(3.);

   ffun->SetNpx(2000);
   gr12->Fit("ffun", "R");
   //gr12->Draw("AP");
   gr12->Draw("AP");
 
   c1->Update(); 
//*******************************************************************
//*******************************************************************
  ps.Close(); 
}
