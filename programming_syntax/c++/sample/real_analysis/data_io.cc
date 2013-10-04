#include "data_io.h" 



void data_io::file_init() {
	dataout << "!     	90%	 			75% inner		 75% outer" 
	<< "		50% inner			50% outer" << endl << "!";

}

void data_io::mirror_init(const int mirror_num) {
	dataout << endl << mirror_num;
}



void data_io::record_data(const double radius, const double conic_const, const double radius_err, const double conic_const_err) {

//void data_io::data_out(radius, conic_const, radius_err, conic_const_err) {

// cout << radius << " " << conic_const << " " << radius_err << " " << conic_const_err << endl;
	//open_out_file();


	//file_init();
	//mirror_init(1);

	if ( conic_const < 0) {
		dataout  <<"   " << fixed << setprecision(2) << radius << "  " << conic_const; 
	} else {
		dataout  <<"   " << fixed << setprecision(2) << radius << "   " << conic_const; 
	}


	//		<< radius_err << " " << conic_const_err << endl; 

	//close_out_file();
}


// Open data file
void data_io::open_out_file() {
	dataout.open(out_file.c_str(), ios::out | ios::app);
}





// Close data file
void data_io::close_out_file() {
	dataout.close();
}


