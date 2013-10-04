#include<iostream>
#include<cstdlib>
#include<vector>
#include<fstream>
#include<string>

using namespace std;

class test{

   private:
          vector<double> data_array;       
   
   public:
          void add(double number);
          vector<double> ReadData( string name);
};


vector<double> test::ReadData(string name)
{
    //ifstream data_out("Real");
    cout << name <<endl; 
    ifstream data_out(name.c_str());
    double number;
    while (data_out >> number)
    {
        data_array.push_back(number);
        cout<<number<<endl<<endl;
    }
    return(data_array);
}

void test::add(double number)
{
      double result = number + 1;
      cout << " " << result << endl;
}

int main()
{
    test t;   
    string name; 
    while(true)
    {
       int select;
       cout << "Plz, choose the Theory(1) or Real(2) by entering 1 or 2 : \n";
       cin >> select;
       cout << endl;
       
       switch(select)
       {
       case  1:
       name = "Theory";
       break; 
    
       case  2:
       name = "Real";
       break;

       default:
       cout<< select << "The number you entered is neither 1 nor 2, please check!\n";
       continue;   
       }
       cout<< "111111111"<< name <<endl;
       break;
    }   
  
 
    vector<double> data = t.ReadData(name); 
    for(unsigned int i=0; i < data.size(); ++i )
    {
	    cout << " "<<data[i] << endl;
             
            t.add(data[i]);    
    }

    return 0;
}
