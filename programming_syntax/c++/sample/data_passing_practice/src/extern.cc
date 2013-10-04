#include <iostream>
#include "extern.h"
#include "data_group_1.h"

using namespace std;

void MyClass::param_set() {

    m_Number = 10;
    m_Character = 's';

    extern_data[20] = 100;

  private_out();
  
}

void MyClass::private_out() {


  int private_data1[5];

  private_data = new int[5];

  for (int i=0; i<5; i++) {
    private_data[i] = i;
    private_data1[i] = i;
    //cout << private_data[i] << endl;
    //cout << private_data1[i] << endl;
  }

  
  delete [] private_data;

}


void MyClass::data_in_extern() { 

  datagroup1* data1;

  extern_data1 = data1->data_int;   

  cout << "External Data :" << endl;
  cout << data1->data_int[4] << endl;
  cout << extern_data1[4] << endl;

}




void large_number_out() {

  int EventNumber=500000;
  unsigned long TrackID;
  
  for (unsigned long int i = 1; i < EventNumber; i++) {
    for ( int n =1; n < 10000; n++) {
      TrackID = i*10000 +n;

      if ( i > 200000 && n == 5000)
      cout << i << "  " << TrackID << "  " << i*10000 +n << endl;  
    }
  }

}
