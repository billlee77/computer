#include <iostream>

#include <stdio.h>

#include <time.h>

#include "data_group_1.h"

using namespace std;



datagroup1::datagroup1() {

  cout << "Function starts" << endl;

}





void datagroup1::SetDataInt() {
  
  int size;

  //size=sizeof data_int/sizeof(int); 

  //cout << size << endl;
  
  FillData1();
  FillData2();

 
}


void datagroup1::FillData1() {

  int size;
// 
//
  size= sizeof data_int/sizeof(int); 
// 
//   cout << size <<endl;
// 
//   int i;
// 
//     //float data_int[10];
// 
//    //    cout << i << endl;
   for (int i = 0; i < 10; i++) {
        data_int[i]= i*100; 
        cout << data_int[i] << endl;
   }
// data_int[5] = 5;
 
}

void datagroup1::FillData2() {

  data_float[20] = 10;
  cout << data_float[20]<< endl;
//  cout << data_float[20]<< endl;
//  cout << data_float[20]<< endl;


  data_float1 = new float[10];
  data_float1[4] = 200;
  cout << data_float1[4]<< endl;


}


void datagroup1::CleanUp() {

 delete [] data_float;

 delete [] data_float1;
 data_float1 = NULL;

}


datagroup1::~datagroup1() {

//  CleanUp();

}



datagroup1 & datagroup1::operator = (const datagroup1 &L) {



}


datagroup1::datagroup1(const datagroup1 &L) {


}

