#include <TFile.h>
#include <TH1.h>
#include <TH2.h>
#include <TCanvas.h>
#include <TF1.h>
#include <TStyle.h>
#include <TChain.h>
#include <TPostScript.h>
#include <TLatex.h>
#include <TMath.h>
#include <TPaveLabel.h>
#include <TGraphErrors.h>

#include <iostream>
#include <fstream>
#include <stdlib.h>
#include <math.h>
#include <stdio.h>
#include <string.h>

Double_t multiple_gauss(Double_t *x, Double_t *par)
{
  Double_t result1 = par[0]*exp((-0.5)*((x[0] - par[1])/(par[2]))*((x[0] - par[1])/(par[2])));
  Double_t result2 = par[3]*exp((-0.5)*((x[0] - par[4])/(pow(2, 0.5)*par[2]))*((x[0] - par[4])/(pow(2, 0.5)*par[2])));
  Double_t result3 = par[5]*exp((-0.5)*((x[0] - par[6])/(pow(3, 0.5)*par[2]))*((x[0] - par[6])/(pow(3, 0.5)*par[2])));
  Double_t result4 = par[7]*exp((-0.5)*((x[0] - par[8])/(pow(4, 0.5)*par[2]))*((x[0] - par[8])/(pow(4, 0.5)*par[2])));
//  Double_t result5 = par[9]*exp((-0.5)*((x[0] - par[10])/(pow(5, 0.5)*par[2]))*((x[0] - par[10])/(pow(5, 0.5)*par[2])));
//  Double_t result6 = par[11]*exp((-0.5)*((x[0] - par[12])/(pow(6, 0.5)*par[2]))*((x[0] - par[12])/(pow(6, 0.5)*par[2])));
  return result1 + result2 + result3 + result4;
}

double linear_function(Double_t *x, Double_t *par)
{
  double result3 = par[1]*x[0] + par[0];
  return result3;   
} 

void fit_peaks_109()
{


  //gStyle->SetLegendFont(1);

  string run_number = "00109";
  string spectrum_name = "Burle 1, 2200V";
	const int num_pars = 9;
  const int fit_max = 150;
  const int fit_min = 30;

  string graph_title = "Gain (ch. per electron) of " + spectrum_name;
	const int num_ADC_channels = 4;
	const int num_TDC_channels = 4;
	const char NT_ID = '1';
	string ascii_filename = "run" + run_number + ".asc";
  string postscript_filename = "run" + run_number + "_peak_fits.ps";
  string gain_filename = "run" + run_number + "_gain.ps";

	ifstream infile;

	infile.open(ascii_filename.c_str());

	if (!infile)
	    cout << "Unable to open file " << ascii_filename << endl;

	int num_events = 0;
	int tempInt;
	char tempString[1000];

	/*Cycle through infile and determine number of events*/
	tempInt = infile.get();
	while (infile)
	{
	    infile.getline(tempString, 1000, '%');
	    if(tempString[3] == NT_ID)
		  ++num_events;
	}

	infile.close();

	unsigned short int** ADC = new unsigned short int*[num_ADC_channels];
	for(int i = 0; i < num_ADC_channels; ++i)
	    ADC[i] = new unsigned short int[num_events];
	unsigned short int** TDC = new unsigned short int*[num_TDC_channels];
	for(int i = 0; i < num_TDC_channels; ++i)
	    TDC[i] = new unsigned short int[num_events]; 

	infile.open(ascii_filename.c_str());
	int current_event = 0;
	while (infile)
	{
	  infile.ignore(10000, '%');
	  infile.getline(tempString, 1000);
	  if (tempString[3] == NT_ID)
	  {
		  infile.getline(tempString, 1000);
	    for(int i = 0; i < num_ADC_channels; ++i)
		    infile >> ADC[i][current_event];
		  infile.ignore();
		  infile.getline(tempString, 1000);
		  for(int i = 0; i < num_TDC_channels; ++i)
		    infile >> TDC[i][current_event];
		  infile.ignore();
		  ++current_event;
	    } 
	}

	float temp_value;

	TH1F *ADC0 = new TH1F("ADC0", spectrum_name.c_str(), (int)(fit_max * 1.1), 0, (int)(fit_max * 1.1));
	ADC0->GetXaxis()->SetTitle("ADC channels");
	ADC0->GetYaxis()->SetTitle("Counts");
	ADC0->GetYaxis()->SetTitleOffset(1.4);
	ADC0->GetYaxis()->SetNdivisions(408,kTRUE);
	ADC0->SetLineColor(4);
	ADC0->SetLineWidth(1.9);
	ADC0->SetFillStyle(1001);
	ADC0->SetFillColor(kBlue-7);

	TH1F *no_pedestal = new TH1F("no_pedestal", "no_pedestal", fit_max-fit_min, fit_min, fit_max);

	for(int i = 0; i < num_events; ++i)
	{
	    temp_value = ADC[0][i];
	    ADC0->Fill(temp_value);
			no_pedestal->Fill(temp_value);
	}

	for(int i = 0; i < num_ADC_channels; ++i)
	    delete[] ADC[i];
	for(int i = 0; i < num_TDC_channels; ++i)
	   delete[] TDC[i];


//************************************************************************************

//Canvas Definition  
  TCanvas *c1 = new TCanvas("c1", " c1",12,29,699,599);
  c1->SetBorderMode(0);
//  c1->Divide(1,2);
//  gStyle->SetOptFit(1110);
//  c1->Range(0.1875,-81.7688,3.3125,735.919);
//  c1->SetBorderSize(2);
//  c1->SetFrameFillColor(0);
//  c1->SetGridx();
//  c1->SetGridy();
//  c1->SetTitle("Datafile: ");
//  gStyle->SetPadTopMargin(.5);
//  gStyle->SetPadLeftMargin(2.5);
//  gStyle->SetPadRightMargin(2.5);
    gStyle->SetOptFit(100);
    gStyle->SetOptStat(0);
    gStyle-> SetStatFontSize(0.004);
	gStyle-> SetStatW(0.15);
	gStyle-> SetStatX(0.9);
	gStyle-> SetStatY(0.9);
//  gStyle->SetPalette(1);


///////////////////////////////////////////////////////////////////////////////////////////
//Postscript Drawing
TPostScript ps(postscript_filename.c_str(),-113);
  c1->Update();  
  ps.NewPage();

  c1->cd(1);  
   gPad->SetGridy();
   gPad->SetGridx();
   gPad->SetFillColor(0);

  TF1 *fit_function = new TF1("fit_function",multiple_gauss,fit_min,fit_max,num_pars);
   fit_function->SetNpx(2000);
 /*  fit_function->SetParLimits(0,100.,30000.);
   fit_function->SetParLimits(1,45.,55.);
   fit_function->SetParLimits(2,1.,20.);
   fit_function->SetParLimits(3,100.,12000.);
   fit_function->SetParLimits(4,68.,90.);
   fit_function->SetParLimits(5,200.,20000.);
   fit_function->SetParLimits(6,95.,125.);
   fit_function->SetParLimits(7,50.,5000.);
   fit_function->SetParLimits(8,125.,155.);
*/

   fit_function->SetParName(0,"Amplitude 1");
   fit_function->SetParName(1,"Mean 1");
   fit_function->SetParName(2,"Std. Dev.");
   fit_function->SetParName(3,"Amplitude 2");
   fit_function->SetParName(4,"Mean 2");
   fit_function->SetParName(5,"Amplitude 3");
   fit_function->SetParName(6,"Mean 3");
   fit_function->SetParName(7,"Amplitude 4");
   fit_function->SetParName(8,"Mean 4");

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// set initial values for parameters
   fit_function->SetParameter(0,1400);
   fit_function->SetParameter(1,40.);
   fit_function->SetParameter(2,10.);
   fit_function->SetParameter(3,1000);
   fit_function->SetParameter(4,72.);
   fit_function->SetParameter(5,300.);
   fit_function->SetParameter(6,105.);
   fit_function->SetParameter(7,100.);
   fit_function->SetParameter(8,140.);
   
   fit_function->SetLineColor(2);
   fit_function->SetLineWidth(2.);

   Double_t max_no_pedestal = 1.1*(no_pedestal->GetMaximum());
   ADC0->SetMaximum(max_no_pedestal);
   ADC0->Fit("fit_function", "MRE");
   float root_chi = pow(fit_function->GetChisquare(), 0.5);
   float x[] = {1,2,3};
   float y[] = {fit_function->GetParameter(1), fit_function->GetParameter(4), fit_function->GetParameter(6)};
	 float yerr[] = {fit_function->GetParError(1)*root_chi, fit_function->GetParError(4)*root_chi, fit_function->GetParError(6)*root_chi};
	 float *xerr = NULL;  
   cout << "Chi^2/NDF: " << fit_function->GetChisquare()/fit_function->GetNDF() << endl;
   ADC0->Draw("hist");

  ps.Close();   







///////////////////////////////////////////////////////////////////////////////////////////
//compute gain in ch/electron


  TCanvas *c2 = new TCanvas("c2","c2",12,29,899,599);
  c2->SetBorderMode(0);
  gStyle->SetOptStat(0);
  gStyle-> SetStatY(0.5);

//Postscript Drawing
  TPostScript ps2(gain_filename.c_str(),-113);
  c2->Update();  
  ps2.NewPage();

  c2->cd(1);  
  gPad->SetGridy();
  gPad->SetGridx();
  gPad->SetFillColor(0);
   
  TGraphErrors *gain_graph = new TGraphErrors(3.,x,y,xerr,yerr);
  gain_graph->SetTitle(graph_title.c_str());
  gain_graph->GetXaxis()->SetTitle("Photoelectrons");
  gain_graph->GetXaxis()->SetLimits(0.,4.);
  gain_graph->SetMinimum(0.);
  gain_graph->SetMaximum(1.2*y[2]);
//  gain_graph->GetYaxis()->SetNdivisions(-110);
  gain_graph->GetYaxis()->SetTitle("Mean ADC channel");
  gain_graph->SetMarkerColor(4);
  gain_graph->SetLineColor(4);
  gain_graph->SetLineWidth(1.5);
  gain_graph->SetMarkerStyle(20);
  gain_graph->SetMarkerSize(0.5);

  TF1 *linear_fit = new TF1("linear_fit",linear_function,0,4,2);
  linear_fit->SetParName(0, "Y-intercept");
  linear_fit->SetParName(1, "Slope");
  linear_fit->SetLineWidth(1.5);
  linear_fit->SetLineColor(2);
  linear_fit->SetNpx(100000);

  gStyle->SetOptFit(110);
  gStyle->SetOptStat(1110);
  gain_graph->Fit("linear_fit","MRE");
  cout << "Chi^2/NDF: " << linear_fit->GetChisquare()/linear_fit->GetNDF() << endl;
  gain_graph->Draw("AP");	

	ps2.Close();   

}
