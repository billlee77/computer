/* 
  This program is created to test out string features
*/

#include <iostream>
#include <string>

using namespace std;

int main()
  {
    string input= "1234567890";
     
    cout << "The second element of the input string : " << input[5] << endl;
    cout << "The third element of the input string : " << input.at(5) << endl;
    cout << "The length of the input string : " << input.length() << endl;  
    cout << "The substring from position 3 to position 6 : "<< input.substr(2,5)<<endl; 
 
    return 0;

  }
