#include <iostream>
#include <cstdlib>

using namespace std;

int main()
  {
    
    float num_grade;
    char let_grade;  
    cout << " Please enter the numerical grade : ";
    cin  >> num_grade;
 
    cout << " The letter grade is : ";

    if (num_grade >= 0 && num_grade < 61)
      {
        let_grade = 'F';
      }

    if (num_grade >= 61 && num_grade < 71)
      {
        let_grade = 'D';
      }
    
    if (num_grade >= 71 && num_grade < 80) 
      {
        let_grade = 'C';
      }

    if (num_grade >= 81 && num_grade < 91)
      {
        let_grade = 'B';
      }

    if (num_grade >=91 && num_grade <= 100)
      {
        let_grade = 'A';
      }

    if (num_grade < 0 || num_grade > 100)
      {
        cerr << "The numerical grade is out of range!" << endl;
        exit(8);
      }
 
    cout << let_grade << endl;
 
    return 0;

  }
