/*
  This is example program from O'Reilly  
*/

#include <iostream>
#include <cassert>

using namespace std;

int primes[] = {2, 3, 5, 7, 11, 13, 17};

int main()
  {
    
    unsigned const int index = 10;
   
    cout << "size of Primes : " << sizeof(primes) << endl;
    cout << "size of Prime 0 : " << sizeof(primes[0]) << endl;
    cout << "Results is : " << sizeof(primes)/sizeof(primes[0]);
    assert (index < (sizeof(primes)/sizeof(primes[0])));
    assert (index >= 0);
  
    cout << "The thenthprime is : " << primes[index] << endl;
    return 0;

  }
