/*
  This is the typical example of sorting the number from b-s of s-b

*/

#include<iostream>

using namespace std;

void s_sort(int a[], int len);
void b_sort(int a[], int len);

int main();

/*
void n_sort(int x[],int length)
{
  int key,i;
  for(int j=1;j<length;j++)
  {
     key=x[j];
     i=j-1;
     while(x[i]>key && i>=0)
     {
               x[i+1]=x[i];
         i--;
     }
     x[i+1]=key;
  }
}
*/


int main()
{
 
  const int data = 6;
 
  int A[data] = {5, 2, 4, 6, 1, 3};

  /*s_sort(A,data);

  for(x=0; x<data; x++){
    cout << A[x] << endl;
  }*/

  b_sort(A,data);
  for(int p=0; p < data; p++){
    cout << A[p] << endl;
  }

  return 0;
}

/*
void s_sort(int a[], int len)
{
  int x, y;
  for(int i = 1; i < len; i++){
    //cout << a[i]<< endl;  
    x = a[i];
    y = i-1;
    while(a[y]>x && y>=0){
      a[y+1]=a[y];
      y--;
    }
    a[y+1] = x;
  }
}*/

void b_sort(int a[], int len)
{
  int x, y;
  for(int i = 1; i < len; i++){
    x = a[i];
    y = i-1;
    while(a[y]<x && y>=0){
      a[y+1]=a[y];
      y--;
    }
    a[y+1] = x;
  }
}

