#ifndef	DATA_IO_H
#define	DATA_IO_H

#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>

#include <ios>
#include <iomanip>




using namespace std;


// class read_data {
// 
// 
// 	
// };
// 


class data_io {

	public:
		void record_data(const double radius, const double conic_const, const double radius_err, const double conic_const_err);
		//void data_out(radius, conic_const, radius_err, conic_const_err);
	//private:
		//const double: radius, conic_const, radius_err, conic_const_err;
		string out_file;

		void file_init();
		void mirror_init(const int mirror_num);
		void open_out_file(); 
 		void close_out_file();


	private:

		ofstream dataout;

		// void record()
};


#endif

