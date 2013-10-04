/*
  Book:O'Reilly
  Charpter 4 Exercise 1
  This program is created out print the given name, date of birth and passport number  
*/

#include <iostream>
#include <string>

using namespace std;

int main()
  {

    // Ask name of the person
    string first_name;
    string farmily_name; 
    cout << "Give me your farmily name, please : ";  
    cin >> farmily_name; 
    cout <<"Give me your first name, please : ";
    cin >> first_name; 

    // Ask date of birth
    string data_birth;
    cout << "Give me your date of birth, please : ";
    cin >> data_birth;

    // Ask passport number
    string pass_num;
    cout << "Give me your passport number, please : ";
    cin >> pass_num;

    // Final output
    cout << endl << "Name of the person is : "<< first_name<<" "<< farmily_name
    << endl << "His date of birth is : " << data_birth                              << endl << "Also the passport number is : " << pass_num << endl;

    return 0; 

 }
