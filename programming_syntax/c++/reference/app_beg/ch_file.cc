#include <iostream>
#include <fstream>
#include <vector>
#include <string>

using namespace std;

int main(){

  ifstream fs("foo.out", ios_base::in);
  ofstream is("foo", ios_base::out);  

  vector<string> things;  

  string obj;

  while(fs>>obj){
  things.push_back(obj);
  }

  is << 1;  
 
  for(unsigned int i =0; i < things.size(); i++){
    is<< things[i] << endl;
  }  

  fs.close();
  return 0;
}
