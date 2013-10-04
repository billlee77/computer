#include <iostream>

class CInt {
  
  public:
 	void Set(int iX) {
	  this->miX = iX;
	}

  int Get() {
    //return miX;
    return this->miX;
  }

  private:
	int miX;

};

int main() {

  using namespace std;
  
  CInt qMyInt;
  qMyInt.Set(3);
  cout << "Int Value = " << qMyInt.Get() << endl;

  return 0;

}
