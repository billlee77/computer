//**************************************************
// This program is targeted to inplement the different method for input
// and output
//
//**************************************************

#include <iostream>
//#include <>

using namespace std;

int main() {

  //***********************************************************
  // printf
  // general form:  std::printf(format, parameter-1, parameter-2)  
  // also fprintf(file, format, para-1, para-2)
  int ans;
  ans = 21.0/7.0;
  printf("The ans is %d\n", ans);
   

  //***********************************************************
  // write and read, funtion is very useful they can be used to read
  // and wirte a block of data, things like copying a file can easily
  //  be done.
  
  // syntax :: 
	//ostream& write ( const char* s , streamsize n );

  



  cout << endl;
  // cout
  cout << "std::cout: this is the most convinient way ";
  // cerr
  
  cout << endl;

  return 0;
}

