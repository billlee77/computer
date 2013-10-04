#include<iostream>
#include<fstream>
#include<vector>
#include <string>
#include <sstream>

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include <TCanvas.h>
#include <TGraph2D.h>
#include <TStyle.h>

#include "TROOT.h"
#include "TMath.h"
#include "TGraphDelaunay.h"
#include "TF2.h"
#include "TGraph2DErrors.h"

using namespace std;

int real_mirror_measurement () 
{

	double num_x, num_y, num_z;
	vector<double> x_arr;
	vector<double> y_arr;
	vector<double> z_arr;


	char first[256];
	char line[256];
	string first_line;
	string data_line;
	string data_x, data_y, data_z;



	size_t found;
	size_t pos = 0;

	ifstream data_out;
	data_out.open ("test_realsize.dat", ifstream::in);


/*
 * Data Read
 * --------------------------------------------------*/
	
	if (data_out.is_open()) {
	
		data_out.getline(first, 256);
//		cout << first << endl;
		first_line = first;
		found = first_line.find_first_of(",");
 
//		cout <<  found << endl;

		if (found > 100 || found < 0 ) {
			data_out.seekg (0, ios::beg);
    		while (data_out >> num_x >> num_y >> num_z) {			
        		x_arr.push_back(num_x);
        		y_arr.push_back(num_y);
        		z_arr.push_back(num_z);
//				cout<< num_x << " " << num_y << " " << num_z << " " << endl;
    		}
		} else {
			data_out.seekg (0, ios::beg);
			while (data_out.getline(line, 256)){
				pos = 0;
				found = 0;
				data_line =line;
				// cout << data_line << endl;
				// found = data_line.find_first_of(",")
					
				// data_split = split(data_line, ",");
				found= data_line.find_first_of(",",found);
						
				data_x = data_line.substr(pos, found);
				
				string remain;
				remain = data_line.substr(found, 100000);
				found = remain.find_first_of(",",found);
				data_y = remain.substr(pos+1, found-1);
				data_z = remain.substr(found+1, 100000);

				num_x = atof(data_x.c_str());
				num_y = atof(data_y.c_str());
				num_z = atof(data_z.c_str());

	       		x_arr.push_back(num_x);
        		y_arr.push_back(num_y);
        		z_arr.push_back(num_z);

			}
		}

  	} else {
    	cout << "Error opening file";
  	}



// 	for( int i=0; i < x_arr.size(); i++) {
// 		cout << x_arr[i] << " " << y_arr[i] << " " << z_arr[i] << endl;
// 	}



 	const int data_size = x_arr.size();

	double data_x_arr[data_size]; 
	double data_y_arr[data_size];
	double data_z_arr[data_size];

 	for( int i=0; i < data_size; i++) {
		data_x_arr[i] = x_arr[i];
		data_y_arr[i] = y_arr[i];
		data_z_arr[i] = z_arr[i]; 
 	}




/*--------------------------------------------------
 * Plot
 * ----------------------------------------------------*/



// 
// 	
 	TCanvas *c1 = new TCanvas("c1", "c1", 0, 0, 1400, 1000);
// 
 	c1->Divide(1,2);
// 
// 
 	TGraph2DErrors *gr1 = new TGraph2DErrors();
	TGraph2D *gr2 = new TGraph2D();

	gr1->SetTitle("Real Measurement");

	c1-> cd(1);

	const double x_error = 0.001*2.54;
	const double y_error = 0.001*2.54;
	const double z_error = 0.005*2.54;

	for( Int_t N=0; N < data_size; N++) {
		Double_t xx1, yy1, zz1; 
		xx1 = data_x_arr[N];
		yy1 = data_y_arr[N];
		zz1 = data_z_arr[N];
		gr1->SetPoint(N, xx1, yy1, zz1);
		gr1->SetPointError(N, x_error, y_error, z_error);

	}

 	gStyle->SetPalette(1);
	gr1->Draw("surf1");

	c1->Update();
	
// Assume the measurement are in CM
	Int_t x_min = 0;
	Int_t y_min = 0;
	Int_t x_max = 60;
	Int_t y_max = 55;


	TF2 *f2 = new TF2("f2", "-(((x-[0])**2 + (y-[1])**2)/([2] + sqrt([2]**2 - (1-[3])* ((x-[0])**2 + (y-[1])**2))) + [5]*(x-[0]) + [6]*(y-[1]) -[4])", x_min, x_max, y_min, y_max);


	// X offset
	f2->SetParameter(0, 30);
	// Y offset
	f2->SetParameter(1, 27);
	// Radius of curvature at center
	f2->SetParameter(2, 110);
	// Conic constant
	f2->SetParameter(3, 0);
	//f2->FixParameter(3, 0);
	// Z Offset
	f2->SetParameter(4, 100);
	// Tilt in X 
	f2->SetParameter(5, 0);
	// Tilt in Y
	f2->SetParameter(6, 0);

 	gr1->Fit("f2", "WR");
 

	double chi2=f2->GetChisquare();
	double ndf=f2->GetNDF();

	cout << "The fitted Chi2 is: " << chi2 << endl;
	cout << "The number of degree of freedom: " << ndf <<endl;
	cout << "The Chi2/ndf: " << chi2/ndf << endl;

	double est_0 = f2->GetParameter(0);
	double est_1 = f2->GetParameter(1);
	double est_2 = f2->GetParameter(2);
	double est_3 = f2->GetParameter(3);
	double est_4 = f2->GetParameter(4);
	double est_5 = f2->GetParameter(5);
	double est_6 = f2->GetParameter(6);


	TF2 *fit2 = gr1->FindObject("f2");
	fit2 -> SetParameters(est_0, est_1, est_2, est_3, est_4, est_5, est_6);

	c1->cd(2);
	for( Int_t N=0; N < data_size; N++) {
		double x ,y, z_fit, z_measurement, z_diff;
		x = data_x_arr[N];
		y = data_y_arr[N];
		z_fit = fit2->Eval(x,y);
		z_measurement = data_z_arr[N];
		z_diff = z_fit - z_measurement;
		gr2->SetPoint(N, x, y, z_diff);
	}

	gr2->SetTitle("Fit - Data ");
	gr2->Draw("surf1");
	c1->cd();

	c1->Modified();
	c1->Update();

	return (0);
}
