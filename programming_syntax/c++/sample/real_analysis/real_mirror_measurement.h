#ifndef	REAL_MIRROR_MEASUREMENT_H
#define	REAL_MIRROR_MEASUREMENT_H

#include <iostream>
#include <fstream>
#include <vector>
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
#include "TObject.h"
using namespace std;


// class read_data {
// 
// 
// 	
// };
// 


class analysis_plot {

	public:
		void real_mirror_measurement (int mirror_num, int fit_area, int option);
		double fit_radius, fit_conic_const;
		double fit_radius_err, fit_conic_const_err;

	private:
		 
		void mirror_select(int mirror_num, int fit_area, int option);
		void file_open(int mirror_num);
		void print_file(int mirror_num, int fit_area, bool inner_fit, TCanvas* c1);
		// void plot(double data_x_arr[], double data_y_arr[], double data_z_arr[], int mirror_num, int fit_area, bool inner_fit);

		void plot(double *data_x_arr, double *data_y_arr, double *data_z_arr, int &mirror_num, int &fit_area, bool inner_fit);

		// void plot(double (&data_x_arr) [360], double (&data_y_arr) [360], double (&data_z_arr) [360], int &mirror_num, int &fit_area, bool &inner_fit);

		// void plot(double (&data)[360]);


		ifstream data_in;
		bool inner_fit;
		int data_size;
};

#endif

