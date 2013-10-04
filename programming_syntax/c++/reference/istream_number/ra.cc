#include <iostream>
#include <fstream>

using namespace std;
int main() {
  int num=0;  
  int arr[10];

  int n = 0;
  ifstream out("num.dat");
  while (out >> num) { 
    arr[n] = num;    
    cout << arr[n] << endl;
    n++;
  }

  cout << "good " << endl;

  /*for(int i=0; i <10; i++) {
    cout << arr[i] << endl;
  }*/
  
  return 0;
}
