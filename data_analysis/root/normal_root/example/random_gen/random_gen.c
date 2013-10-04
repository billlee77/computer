#include <iostream>
#include <fstream>

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

using namespace std;

int main ()
{
  float iSecret;



  srand ( time(NULL) );



  ofstream data_out; 
  data_out.open("test.dat");


  //cout << "aaaaaaaaaa"<< endl;

  for(int i=0; i <10000; i++ ) {
  	iSecret = rand()/((double)RAND_MAX);
    cout <<  iSecret << endl;
    data_out << iSecret*100 << endl;
  }
  

  return 0;
}

