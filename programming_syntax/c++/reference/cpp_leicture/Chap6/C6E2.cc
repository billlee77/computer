#include <iostream>
#include <cstdlib>

using namespace std;

int main()
  {
    
    int num_grade;
    char let_grade;  
    char op;
    int op_num;

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

    op_num = num_grade % 10; 
    
    if (op_num >= 1 && op_num < 4)
      {
        op = '-'; 
      }
 
    if (op_num >= 4 && op_num < 8)
      {
        op = ' ';
      } 

    if (op_num >= 8 && op_num < 10)
      {
        op = '+';
      }
    if (op_num == 0)
      {
        op = '+';
      }
 
    cout << let_grade << op << endl;
 
    return 0;

  }
