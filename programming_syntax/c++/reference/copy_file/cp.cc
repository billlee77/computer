// Copy a file
#include <fstream>
using namespace std;

int main () {
  char * buffer;
  long size;
  ifstream infile ("test.txt"); //,ifstream::binary);
  ofstream outfile ("new.txt"); //,ofstream::binary);

  // get size of file
  infile.seekg(0,ifstream::end);
  size=infile.tellg();
  infile.seekg(0);
  // allocate memory for file content
  buffer = new char [size];
  // read content of infile
  infile.read (buffer,size);
  // write to outfile
  outfile.write (buffer,size);
  // release dynamically-allocated memory
  delete[] buffer;

  outfile.close();
  infile.close();
  return 0;
}
