#include <iostream>

int main(){
  
  const int pit =5 ;
  const int *pit_ptr;
  // pit =5;
  pit_ptr = &pit;
  std::cout << pit_ptr; 
  std::cout << '\t'; //std::endl;
  std::cout << ' ' << *&*&pit;
  std::cout << std::endl;

  std::cout << pit<< std::endl;
  std::cout << *pit_ptr << " "<<pit_ptr << std::endl;
 

  return 0; 

}
