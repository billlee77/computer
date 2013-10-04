#include <iostream>

class CThing {

  public:
	CThing() {}
	CThing* GetThis() {
	  return this;
	}

};

int main() {
  using namespace std;

  CThing qThing;
  cout << "Address of Object = " << &qThing << endl;
  cout << "Value of this ptr = " << qThing.GetThis() << endl;

  return 0;
}
