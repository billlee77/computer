#include "struct_test.h"

#include <stdio.h>
#include <stdlib.h>

#include <string.h>


using namespace std;

int main() {

test *test1 = new test;

test1->string1 = '2';
test1->string2 = '4';
test1->number1 = 1000;

cout << "Test String 1: " << test1->string1 << endl;
cout << "Test String 2: " << test1->string2 << endl;
cout << "Test Number 1: " << test1->number1 << endl;

cout << "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" << endl;


test *test2 = new test;
test test3;

test2 = &test3;

test3.string1 = 'a';
test3.string2 = 'b';
test3.number1 = 2000;

cout << "Test String 1: " << test2->string1 << endl;
cout << "Test String 2: " << test2->string2 << endl;
cout << "Test Number 1: " << test2->number1 << endl;

cout << "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" << endl;




//test *test1;

//test1=&test2;


test* test4;
test_name.string1 = 'c';
test_name.string2 = 'd';
test_name.number1 = 4000;

test4 = &test_name;

cout << "Test String 1: " << test4->string1 << endl;
cout << "Test String 2: " << test4->string2 << endl;
cout << "Test Number 1: " << test4->number1 << endl;

cout << "Test String 1 name: " << test_name.string1 << endl;
cout << "Test String 2 name: " << test_name.string2 << endl;
cout << "Test Number 1 name: " << test_name.number1 << endl;

cout << "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" << endl;


//cout << "Test Number 1: " << test2.string1 << endl;
//cout << "Test Number 2: " << test2.string2 << endl;


test test8;
test *test7;

//test8 = Test_function();
// 

 test7 = &test8;

 test7 = Test_function();

 cout << "Test String 1: " << test7->string1 << endl; 
 cout << "Test String 2: " << test7->string2 << endl;
 cout << "Test number 1: " << test7->number1 << endl;

 

// cout << "Test String 1: " << test8.string1 << endl; 
// cout << "Test String 2: " << test8.string2 << endl;
// cout << "Test number 1: " << test8.number1 << endl;
// 

cout << "This is working" << endl;


//character = new char[9];

char *character1 = "asdasaaaaaaaaad  1";
char character2[] = "asdasaaaaaaaaad  2";
char character3[100] = "asdasaaaaaaaaad  3";


char *character4 = new char;
char *character5 = new char;


character4 = "asdasaaaaaaaaad  4";

sprintf(character5, "copy successful_%i", 10);

//character2 = "asdasaaaaaaaaad";

cout << "Charactor test 1: " << character1 << endl;
cout << "Charactor test 2: " << character2 << endl;
cout << "Charactor test 3: " << character3 << endl;
cout << "Charactor test 4: " << character4 << endl;
cout << "Charactor test 5: " << character5 << endl;
//cout << "Charactor test : " << character2 << endl;



// 
// string s = 100000;
// char const *pchar = s.c_str(); 
// 
//itoa (10000, character5, 10);

//delete character;
 


return 0;

}

test* Test_function() 
{

cout << "asdasd" << endl;

test *test5 = new test;
test5->string1 = "dsdfsa";
test5->string2 = "sadfsafc";
test5->number1 = 222;

return test5;
}


// test Test_function() 
// {
// 
// cout << "asdasd" << endl;
// 
// test test5;
// test5.string1 = "dsdfsa";
// test5.string2 = "sadfsafc";
// test5.number1 = 222;
// 
// return test5;
// }
