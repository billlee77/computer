#include <iostream>
#include <stdio.h>

#include "data_group_1.h"

#include "extern.h"

void recheck(datagroup1* data1);
void check_3rd();
void extern_test();

class alias: public MyClass {

  public: 
    void extern_test_alias() {

      MyClass::param_set();

    }

};




using namespace std;

int main() {

  datagroup1 *data1;

  data1 = new datagroup1;

  //cout << "Test this" << endl;

  data1->SetDataInt();


  recheck(data1);

  check_3rd();

  extern_test();


  cout << data1 -> data_int[4] << endl << endl;

  delete data1;

  return 0;

}


void recheck(datagroup1* data1) {


  cout << endl << "Recheck ~~~~~" << endl;
  cout << data1->data_int[4] << endl;

  // printf ("%i", data1->data_int[3]);
  cout << "Recheck ends ~~~~~" << endl << endl;

}




void check_3rd() {
  datagroup1 *data1; 
  // data1 = new datagroup1;
 
  //data1->SetDataInt();

  cout << "Function 3rd Starts" << endl;

  cout << data1->data_int[4] << endl;

  
  data1->data_int[4] =999;

  cout << "Function 3rd Ends" << endl << endl;
  //delete data1;
  //
 
}




void extern_test() {

    cout << "External test starts" << endl;

    MyClass *pPointer;
    pPointer = new MyClass;

    pPointer->param_set();

    

    cout << pPointer->m_Number << endl;
    cout << pPointer->m_Character << endl;

    cout << pPointer->extern_data[20] << endl;

 
    pPointer->data_in_extern();
   
    cout << "External test ends" << endl;

     
    large_number_out();


    delete pPointer;

}


// void extern_test_alias() {
// 
//   MyClass::param_set();
// 
// 
// 
// };
