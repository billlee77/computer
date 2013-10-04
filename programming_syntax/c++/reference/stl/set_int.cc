#include <iostream>
#include <set>

using namespace std;

int main() {

  int num;
  cout << "Give the a number"<< endl;
  cin  >> num;
  cout << endl;

  set<int> myset;
  set<int>:: iterator it;
  for(int i=1; i<=5; i++) myset.insert(i*10); // set: 10 20 30 40 50
 
  it = myset.find(num);

  if (it != myset.end())
    cout << "there is something like that in the set"<<endl;
  else
    cout << "there is no such number"<<endl;

  return 0;

}
