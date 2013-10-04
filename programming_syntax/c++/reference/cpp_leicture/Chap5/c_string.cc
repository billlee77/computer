/*
  This is a example of C type string
*/

#include <iostream>
#include <cstring>
#include <string>
#include <cassert>

using namespace std;

int main()
  {
    
    char name[1];         
    char first_name[10];
    char family_name[10];

    // string name;  
    // getline(cin, name);   
    // cin >> name;    
    // std::getline(cin, first_name, sizeof(first_name));
 
    cout << "Give the first name output : "; 
    cin >> first_name;  
    cout << "Give the family name output : ";
    cin >> family_name;
   
    assert(sizeof(first_name) >= sizeof(name));
    assert(sizeof(family_name) >= sizeof(name)); 

    strcpy(name, first_name);
    strcat(name, " ");
    strcat(name, family_name); 
  
    cout << "Give me the full name : " << name << endl;
    cout << "The length of string is : " << strlen(name) << endl;
    cout << "The number of characters : " << strlen(first_name) + strlen(family_name) << endl; 

    return 0;
  }
