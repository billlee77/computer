// typewriter
#include <iostream>
#include <fstream>
using namespace std;

int main () {

  char ch;
  ofstream outfile ("test.txt");

  do {
    ch=cin.get();
    outfile.put (ch);
  } while (ch!='.');

  return 0;
}
