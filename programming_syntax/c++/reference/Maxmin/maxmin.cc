#include <iostream>
#include <fstream>
#include <cstdlib>
#include <cassert>
#include <vector>

using namespace std;

//class maxmin
//{
//public:
//   	int read(); 

//private:
//        vector<double> value;
//        static double max = 0.;
//        static double min = 999999999999.;
//};


int maxmin()
{
   vector<double> value;
   ifstream data_out("DATA");

   if (data_out.bad())
     {
        cerr << "data is bad?!\n";
        exit(8);
     }   
   
   /*while (data_out.good())
     {
	if (data_out.eof())
   	    break;
       	double number;
	data_out >> number;
	value.push_back(number);
     }*/
   //double max = 0.;
   //double min = 999999999999.;

   double number;
   while (data_out >> number)
   {
     value.push_back(number);
   }

   double max = 0;
   double min = 9999999;
   i = 0;
 
   while( i < value.size())
   {
     if (max < value[i])
        max = value[i];
     else         
        max = max;
     if (min > value[i])
        min = value[i];
     else
        min = min;
     i++;
   }
   double A  = value.size();
 
   cout << "The size of data file is : " << A << endl; 
   cout << "The maximum number if all is : " << max << endl;
   cout << "The minimum number of all is : " << min << endl;
   
return (0);
}
