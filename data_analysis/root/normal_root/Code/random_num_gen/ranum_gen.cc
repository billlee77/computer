#include<iostream>
#include<TRandom.h>
using namespace std;

int ranum_gen(){
  unsigned int t;
  t = gRandom->Integer(10);
  cout << t << endl;
  return 0;
}
