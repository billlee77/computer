/*
  This is the simple program created to convert temperature in Fahrenheit(F) into Celsius(C) and vice-verse
*/
#include <iostream>
#include <cstdlib>
#include <cmath>

using namespace std;

int main()
  {
    
    char choice;

    cout << "Please enter F to convert Fahrenheit to Celsius, or \n"
         << "C to convert Celsius to Fahrenheit, anything else would terminate program!"  << endl;
    cout << "Enter the choice : ";
    cin  >> choice;
    if (choice != 'F' && choice != 'C')
      { 
        cerr << "The program is terminated!" << endl;        
        exit(8);               
      }

    float input_temp;
    float Fahrenheit;
    float Celsius;

    cout << "Enter the temperature : ";
    cin >> input_temp;

    if (choice == 'F')
      {
        Fahrenheit = (9*input_temp/5) + 32;	
        cout << "The Fahrenheit temperature is : " << Fahrenheit << endl;
      }

    if (choice == 'C')
      {
        Celsius = 5*(input_temp-32)/9;
        cout << "The Celsius temperature is : " << Celsius << endl;
      }
    
    return 0;

  }
