#include "real_mirror_measurement.h"
#include "data_io.h"
#include <stdlib.h>

using namespace std;
analysis_plot plot;
data_io data;
void multi_mirror(); 
void single_mirror(); 


int main() {
	
	

	//multi_mirror();
	single_mirror();


	return (0);
}


void single_mirror() {


 	int mirror_num;
 	int fit_area;
 	int option;

	cout << "Which Mirror do you want to fit ?? :" ;
 	cin >> mirror_num;
 	cout << "The input mirror is :" << mirror_num << endl;


 	cout << "Do you want to fit 90%, 75% or 50% ? Choose by type 1, 2 or 3 :"; 
 	cin >> fit_area;

 	cout << " Inner or outer ?? type i or o : ";
 	cin >> option;

	plot.real_mirror_measurement(mirror_num,fit_area,option);


} 




void multi_mirror() {

	data.out_file = ("mirror_fit_results.txt");

	string init_cmd = "rm " + data.out_file;

	system(init_cmd.c_str());

	// cout << plot.fit_radius <<  "   " << plot.fit_conic_const << endl;
	// cout << plot.fit_radius_err <<  "   " << plot.fit_conic_const_err << endl;

	data.open_out_file();
	data.file_init();

	for (unsigned int i = 0; i < 15 ; i++ ) {

		int mirror_num = i + 1; 	
		data.mirror_init(mirror_num);

		for (unsigned int x = 0; x < 3; x++) {

			if (x+1 != 1){
				for (unsigned int y=0; y <2; y++) {
					plot.real_mirror_measurement(i+1, x+1, y+1);
					data.record_data(plot.fit_radius, plot.fit_conic_const, plot.fit_radius_err, plot.fit_conic_const_err);
				} 
			} else {
					plot.real_mirror_measurement(i+1, x+1, 1);
					data.record_data(plot.fit_radius, plot.fit_conic_const, plot.fit_radius_err, plot.fit_conic_const_err);
			}
			

		}
	}

	data.close_out_file();

}



