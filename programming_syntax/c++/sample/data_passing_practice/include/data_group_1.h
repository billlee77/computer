#ifndef data_group_1_h
#define data_group_1_h 1

#include <stdlib.h>


class datagroup1 {


  public:

    datagroup1();
    ~datagroup1();



    datagroup1(const datagroup1 &L);
//  
    datagroup1 & operator = (const datagroup1 &L);
// 
    void SetDataInt();
    int data_int[10];
    float data_float[];



  private:

  /*--------------------------------------------------
   * Note that there should be no array object decleration such as 
   * int data_int[10] in private class, array needs to declared as
   * an pointer
  ----------------------------------------------------*/


    void FillData1();
    void FillData2();

    float *data_float1;

    void CleanUp();


};






#endif 
