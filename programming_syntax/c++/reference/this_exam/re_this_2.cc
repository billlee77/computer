#include <iostream>

double x = 10.0;

class CMyClass {
  
  public:
	CMyClass() : x(2.0) {}
	//void Set (double dArg) {
	void Set (double dArg) {
	  //double x(3.0);
	  this->x = dArg;
	}
 	double x;

};

/*
class fix {
	
  public: 
	inline fix& operator +=(const fix* oper2)
	{
	  oper2 += oper2;
	  return (*this);
	}
};
*/

int main() {
  
  using namespace std;
  
  CMyClass qMyObject;
  fix f;

  qMyObject.Set(4.0);
  // cout << "Global x = " << x << endl;
  // cout << "Member x = " << qMyObject.x << endl;

  // cout << "qMyObject ID " << &x << endl;
  // cout << "x ID " << &qMyObject << endl;
  // cout << "x ID " << &qMyObject.x << endl;


  return 0;

}
