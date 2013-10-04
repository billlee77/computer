#include<iostream>
#include<string>
#include<cstdlib>
#include<vector>
#include<cmath>
#include<fstream>
#include<list>

using namespace std;

int main()
{
  
    string file_input;
    cout << " Please enter the name of the file which you want to open :";
    cout << endl <<" ";
    cin >> file_input;
    ifstream data_input(file_input.c_str());

    if(!data_input.is_open())
       {
           cerr << "There is not such file named : "<< file_input  <<endl			<< "Please check the file name carefully again." <<endl;
           exit(8);
       }
    if(data_input.bad())
       {
           cerr << "There is something wrong with the data from the file\n";  
           exit(8);
       }    
   
    /*unsigned int i = 0;
    unsigned const int size = 3;
    double data_array[size];   

    while( i < size)
       {
           data_input >> data_array[i];
           ++i;
       }
   
    double min = 9999;
    for(unsigned int i; i < size; ++i) 
      {
          if (data_array[i] < min) 
          min = data_array[i];
      }
          
    cout << min; 
    cout << endl;*/
   
    int num1;
    list<int> num;
    while (data_input >> num1)
      { 
        num.push_back(num1);  
      }
    

    /* 
    test[3] = {3,2,1};  
    int i =0 ;
    while (i<3)
      {
        cout << test[i] << endl;
        num1.push_back(test[i]);
        i++;
      }
     */
    
    num.sort();
    
    for(list<int>::iterator it = num.begin(); it!=num.end(); ++it)
      {
        cout << " " <<*it << endl;
      }
    
    for(list<int>::reverse_iterator rit = num.rbegin(); rit!=num.rend(); ++rit)
      {
        cout << " " <<*rit << endl;    
      }
    
    /*
    vector<double> value;
    double number;
    while (data_input >> number)
    { 
      cout<< " "<< number;
      cout << endl << endl;
      value.push_back(number);
    }
    */
   
    return(0);
  
}

