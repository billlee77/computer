#include "real_mirror_measurement.h"



using namespace std;

void analysis_plot::real_mirror_measurement (int mirror_num, int fit_area, int option) 
{

	char first[256];
	char line[256];
	string first_line;
	string data_line;
	string data_x, data_y, data_z;

	size_t found;
	size_t pos;



	double num_x, num_y, num_z;

	vector<double> x_arr;
	vector<double> y_arr;
	vector<double> z_arr;

	pos = 0;
 	inner_fit = true;

// 	int mirror_num;
// 	int fit_area;
// 	string option;
// 



	mirror_select(mirror_num, fit_area, option);

	file_open(mirror_num);
	
/*
 * Data Read
 * --------------------------------------------------*/
	
	if (data_in.is_open()) {
	
		data_in.getline(first, 256);
//		cout << first << endl;
		first_line = first;
		found = first_line.find_first_of(";");
 
		//cout <<  found << endl;


		if (found > 100 || found < 0 ) {
		
			data_in.seekg (0, ios::beg);
    		while (data_in >> num_x >> num_y >> num_z) {			
        		x_arr.push_back(num_x);
        		y_arr.push_back(num_y);
        		z_arr.push_back(num_z);
				//cout<< num_x << " " << num_y << " " << num_z << " " << endl;
    		}
		} else {
			data_in.seekg (0, ios::beg);
			while (data_in.getline(line, 256)){
				
				pos = 0;
				found = 0;
				data_line =line;
				// cout << data_line << endl;
				// found = data_line.find_first_of(",")
					
				// data_split = split(data_line, ",");
				found= data_line.find_first_of(";",found);

				//cout << found << endl;
						
				data_x = data_line.substr(pos, found);
				string remain;
				remain = data_line.substr(found+1, 100000);
				
				found =  0;
				
				found = remain.find_first_of(";",found);
				data_y = remain.substr(pos, found);
				data_z = remain.substr(found+1, 100000);

				//cout << found << endl;
	
			 	//cout << data_x << endl << data_y << endl << data_z << endl;

				//cout << "/*--------------------------------------------------";

				num_x = atof(data_x.c_str());
				num_y = atof(data_y.c_str());
				num_z = atof(data_z.c_str());

//				cout<< num_x << " " << num_y << " " << num_z << " " << endl;

// 	       		x_arr.push_back(num_x);
//         		y_arr.push_back(num_y);
//         		z_arr.push_back(num_z);


				if (fit_area == 2) {
					if (inner_fit){
					/*3/4 Mirror*/
					/*Inner*/
						if(num_x < 560 && num_x > 40 && num_y < 510 && num_y > 40) {
							x_arr.push_back(num_x);
							y_arr.push_back(num_y);
							z_arr.push_back(num_z);
						}
					} else {
					/*Outer*/
						if((num_x < 40 || num_x > 560) || ( num_y < 40 || num_y > 510)) {
							x_arr.push_back(num_x);
							y_arr.push_back(num_y);
							z_arr.push_back(num_z);
						}
					}
				} else if (fit_area ==3) {
					if (inner_fit){
					/*1/2 Mirror*/
					/*Inner*/
						if(num_x < 525 && num_x > 75 && num_y < 465 && num_y > 85) {
							x_arr.push_back(num_x);
							y_arr.push_back(num_y);
							z_arr.push_back(num_z);
						}
					} else {
					/*Outer*/
						if((num_x < 75 || num_x > 525) || ( num_y < 85 || num_y > 465)) {
							x_arr.push_back(num_x);
							y_arr.push_back(num_y);
							z_arr.push_back(num_z);
						}
					}
				} else {
							x_arr.push_back(num_x);
							y_arr.push_back(num_y);
							z_arr.push_back(num_z);
				}
			}
		}

  	} else {
    	cout << "Error opening file";
  	}

	data_in.close();


// 	for( unsigned int i=0; i < x_arr.size(); i++) {
// 		cout << x_arr[i] << " " << y_arr[i] << " " << z_arr[i] << endl;
// 	}



	data_size = x_arr.size();
	// const int data_size = 360;

	double data_x_arr[data_size]; 
	double data_y_arr[data_size];
	double data_z_arr[data_size];

 	for( int i=0; i < data_size; i++) {
		data_x_arr[i] = x_arr[i];
		data_y_arr[i] = y_arr[i];
		data_z_arr[i] = z_arr[i]; 
		//cout << data_x_arr[i] << " " << data_y_arr[i] << " " << data_z_arr[i] << endl;

 	}

	// double data[5]={0};

	plot (data_x_arr, data_y_arr, data_z_arr, mirror_num, fit_area, inner_fit);
	// plot(data_x_arr);

}








void analysis_plot::mirror_select(int mirror_num, int fit_area, int option) {

// 	cout << "Which Mirror do you want to fit ?? :" ;
// 	cin >> mirror_num;
// 	cout << "The input mirror is :" << mirror_num << endl;
// 
	// Choose a Mirror
	if (mirror_num > 15 || mirror_num < 1) {
		cout << "Selected Mirror is Out of Range" << endl 
			 << "Program Exterminated !  " << endl;
		exit(0);
	}

	// Choose how much of a mirror to fit

// 	cout << "Do you want to fit 90%, 75% or 50% ? Choose by type 1, 2 or 3 :"; 
// 	cin >> fit_area;
// 
	if (fit_area > 3 || fit_area < 1) {
		cout << "Selected Mirror is Out of Range" << endl 
			 << "Program Exterminated !  " << endl;
		exit(0);
	}

// 	cout << "The fit area choice is : " << fit_area << endl;

	// Choose to fit inner or outer part ?

	if (fit_area != 1) {

// 		cout << " Inner or outer ?? type i or o : ";
// 		cin >> option;

		if (option == 1) {
			inner_fit = true;
		} else if (option == 2) { 
			inner_fit = false;
		} else {
			cout << "Option not recorgnised" << endl 
				 << "Program Exterminated !  " << endl;
			exit(0);
		}

		cout << "Fitting option is :" << option << endl;
	}
}


void analysis_plot::file_open(int mirror_num) {

	stringstream filename_str;
	string tmp_ss;
	filename_str << "mirror_measurement/mirror_" << mirror_num<< ".txt";
	tmp_ss = filename_str.str();
	data_in.open (tmp_ss.c_str(), ifstream::in);
	// data_in.open ("uncertainty_check/mirror_2.old", ifstream::in);
	cout << "File : " << tmp_ss.c_str() << " is plotted" << endl;
}



void analysis_plot::print_file(int mirror_num, int fit_area, bool inner_fit, TCanvas* c1) {


	// Printer to a file

	stringstream pic_name;
	string pic_fit_part, pic_fit_area, pic;
	

	// 
	if (inner_fit) {
		pic_fit_part = "_inner_fit";	
	} else {
		pic_fit_part = "_outer_fit";	
	}

	if (fit_area == 1) {
		pic_fit_area = "_90%";
	} else if (fit_area == 2) {
		pic_fit_area = "_75%";
	} else {
		pic_fit_area = "_50%";
	}

	pic_name << "mirror_" << mirror_num << pic_fit_part << pic_fit_area  << ".png";
	
	pic = pic_name.str();

	c1->Print(pic.c_str());

	delete c1;

}



// void analysis_plot::plot(double data_x_arr[], double data_y_arr[], double data_z_arr[], int mirror_num, int fit_area, bool inner_fit) {
void analysis_plot::plot(double *data_x_arr, double *data_y_arr, double *data_z_arr, int & mirror_num, int & fit_area, bool inner_fit) {

// void analysis_plot::plot(double (&data)[360]) {



/*--------------------------------------------------
 * Plot
 * ----------------------------------------------------*/

// 	
 	TCanvas *c1 = new TCanvas("c1", "c1", 0, 0, 1400, 1000);
// 
//    gPad->SetLeftMargin(0.18) ;
//    gPad->SetRightMargin(0.10) ;
//    gPad->SetTopMargin(0.20) ;
//    gPad->SetBottomMargin(0.20) ;
// //
// //
//    TH2F* histo = new TH2F("histo","", 1,5518.,6216.,1,3853.,5330.) ;
//    histo->SetStats(kFALSE) ;
//    histo->SetMinimum(2723.959960) ;
//    histo->SetMaximum(2723.959962) ;
// 


 	c1->Divide(1,2);
// 
// 
 	TGraph2DErrors *gr1 = new TGraph2DErrors();
//	gr1->SetMaximum(1000);
//	gr1->SetMinimum(-1);
	

	TGraph2D *gr2 = new TGraph2D();

	gr1->SetTitle("Real Measurement");

	c1-> cd(1);

	const double x_error = 0.001;
	const double y_error = 0.001;
	const double z_error = 0.001;

	for( Int_t N=0; N < data_size; N++) {
 		Double_t xx1, yy1, zz1; 
		xx1 = data_x_arr[N];
		yy1 = data_y_arr[N];
		zz1 = data_z_arr[N];

		//cout << N << " " << xx1 << " " << yy1 << " "<< zz1<< endl;

		gr1->SetPoint(N, xx1, yy1, zz1);
		gr1->SetPointError(N, x_error, y_error, z_error);

	}


// 	histo->Draw("lego0,fb") ;

 	gStyle->SetPalette(1);
	gr1->Draw("surf1");
	//gr1->Draw("pcol");

	c1->Update();
	
	c1->cd(2);
// Assume the measurement are in CM
	Int_t x_min = 0;
	Int_t y_min = 0;
	Int_t x_max = 600;
	Int_t y_max = 550;

	// TVirtualFitter::SetMaxIterations(10000); 

	TF2 *f2 = new TF2("f2", "-(((x-[0])**2 + (y-[1])**2)/([2] + sqrt([2]**2 - (1+[3])* ((x-[0])**2 + (y-[1])**2))) -[4])", x_min, x_max, y_min, y_max);


	// X offset
	f2->SetParameter(0, 300);
	// f2->FixParameter(0, 300);

	// Y offset
	f2->SetParameter(1, 275);
	//f2->FixParameter(1, 275);

	// Radius of curvature at center
	f2->SetParameter(2, 1100);
	// Conic constant
	f2->SetParameter(3, 0);
	//f2->FixParameter(3, 0);
	// Z Offset
	f2->SetParameter(4, 50);
	
// 	// Tilt in X 
// 	// Mirror number 7 needs different treatment
// 
// // 	if (mirror_num == 7) {		
// // 		f2->FixParameter(5, 0);
// // 	} else {
// // 		f2->SetParameter(5, 0);
// // 	}
// // 
// 	f2->SetParameter(5, 0);
// 	// Tilt in Y
// 	f2->SetParameter(6, 0);




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

	fit_radius = est_2;
	fit_conic_const	= est_3;

	fit_radius_err = f2->GetParError(2);
	fit_conic_const_err = f2->GetParError(3);


//	TF2 *fit2 = gr1->FindObject("f2");
//	TF2 *fit2 = TF2("f2");

//	TF2 *fit2 = new TF2("fit2", "-(((x-[0])**2 + (y-[1])**2)/([2] + sqrt([2]**2 - (1+[3])* ((x-[0])**2 + (y-[1])**2))) -[4])", x_min, x_max, y_min, y_max);


//	TF2 *fit2 = gROOT->GetFunction("f2");
//	TObject *obj = gROOT->GetFunction("f2");



	TF2 * fit2 = f2;

	fit2 -> SetParameters(est_0, est_1, est_2, est_3, est_4);

	for( Int_t N=0; N < data_size; N++) {
		double x ,y, z_fit, z_measurement, z_diff;
		x = data_x_arr[N];
		y = data_y_arr[N];
		z_fit = fit2->Eval(x,y);
		z_measurement = data_z_arr[N];

// 		if (z_fit < 0) {
// 			z_diff = z_fit + z_measurement;
// 		} else {
			z_diff = z_fit - z_measurement;
//		}

		gr2->SetPoint(N, x, y, z_diff);

		//cout << N << " " << x << " " << y << " " << z_fit << " " << z_measurement  << " "<< z_diff  << endl;

	}

	//gr2->SetTitle("Fit - Data ");
	gr2->Draw("surf1");
	//gr2->Draw("pcol");
	c1->cd();

	c1->Update();


	print_file(mirror_num, fit_area, inner_fit, c1);

}
