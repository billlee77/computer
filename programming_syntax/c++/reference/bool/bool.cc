// This is the example of the bool type

#include <iostream>

using namespace std;

int main()
  {
    
    for(unsigned int g =0; g< 5; g++)
      {
    
        bool is_good =true;
        double data[5] = {g, 1, 2, 3, 4};    

        for (unsigned int i = 0; i < 5; ++i)
          {
            if (data[i] < 1)
              {
                is_good = false;
                break;
              }
          }
  
        if (!is_good) 
         {
           cout << endl <<" this is wrong!"<<endl;
           continue;
         } 

        cout << "this one is OK."<<endl;

        //if (!is_good)
        //cout << endl <<" there is something wrong " <<endl;
      } 
    return 0;
  } 

