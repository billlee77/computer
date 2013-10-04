// This is the example program to dimenstrate flush function

#include <fstream>
using namespace std;

int main()
  {
    ofstream outfile("test.out");    
    ofstream orgfile("test.org");   
  
    for(unsigned int i=0; i < 100; i++ )
      {
        outfile << i;      
        outfile.flush();
        
        orgfile << i;
   
     }
    outfile.close(); 
    orgfile.close();
     
    return 0;

  }


