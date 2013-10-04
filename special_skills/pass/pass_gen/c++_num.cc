#include <iostream>
#include <fstream>

using namespace std;

int main() {

  ofstream num_out("num_list");
  unsigned int i = 0;

  for (i; i < 30000000; i++) {

    num_out << i << "\n";
    //cout << i << "\n";
  }

  num_out.close();

  return 0;

}

