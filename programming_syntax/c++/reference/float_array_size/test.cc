#include<iostream>

using namespace std;


int main() { 

	int asd = 0;
	
	cout << "Please enter a number: ";
	cin >> asd;
	
	const int number=asd;
	
	
	int array[number];
	cout << number << "      " << sizeof array/sizeof(int)<< endl;
	
	
	
	
	
	return 0;
}

