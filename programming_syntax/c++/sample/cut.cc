/*
 * Auther: Wenliang(Bill) Li
 * Date: 19/July/2012
 * Email: wenliang.billlee@gmail.com
 *
 * Program is to place a cut for -13 < delta < 22 to the vector file
 * 
 *
 * */




#include <iostream>
#include <fstream>
#include <string>

#include <vector>
#include <stdio.h>

using namespace std;

int main() {
  
	string lineread;
	string linewrite;

	//char *num;


	ifstream file_in;
	ofstream file_out;


	// File input
	// Change the input filename if needed
	file_in.open("shms_40cmtarg_40deg_8gev_cer.dat", ios::in);


	// File output
	file_out.open("shms_40cmtarg_40deg_8gev_cer_cut.dat", ios::out);

	double dump;	
	double delta;	

	
	
	if (file_in.is_open()) { 

	while(file_in.good()) {

		getline(file_in, lineread);
		linewrite = lineread;

		for(unsigned int jj = 0 ; jj < lineread.size(); jj++ ) {
			if(lineread[jj] == '|') lineread[jj] = ' ';
    	}

    	sscanf( lineread.c_str() , " %lf %lf %lf %lf %lf %lf" , 
	    &dump, &dump, &dump, &dump, &dump, &delta );
     	
		if (delta >=-13 && delta <= 22  )
		{
			//cout << linewrite << endl;
			file_out << linewrite << endl;
		}
	}
	}
	else cout << "Unable to open file"; 


	file_in.close();
	file_out.close();

	
	return 0;
	

}



