#include<iostream>
#include<cstdlib>


using namespace std;
int main()
{
    int input;
    cout << "Can you give me a value between 1 - 4, plz? :";
    cin >> input; 
    cout << "The number you entered is : " << input << "\n";
    cout << endl;
    cout << endl;
    if( input < 1 || input > 4 )
    {
        cerr << "Why don't you give me a number between 1 - 4 ?\n"; 
        cout << endl;
        exit(1);
        
    }
    else
    {
       input = input;
       cout << "You have given me a number in correct range which is : "<< input << endl; 
    }

    int indata;
   
    cout << " give me : "; 
    cin  >> indata;
    cout << endl; 
    if( 0 < indata && indata < 5 )
    {
        cout << "The number chosen is :" << indata << "\n";
        cout << "Happy! :)" << endl;
    }
    
    else
    {
        cerr << "number chosen is not between 1 - 4 ! \n"; 
        exit(2);
    }
    return (0);
}

