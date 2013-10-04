#include <iostream>

using namespace std;

int main()
  {
    int input; 
   
    cout << " Please give the input time : ";
    cin >> input;
    
    const int hour = input / 60;
    const int min  = input % 60;

    cout << " The converted time is " << hour << " hour " << min << " min.";
    cout << endl;
    return 0;    
 
  }

