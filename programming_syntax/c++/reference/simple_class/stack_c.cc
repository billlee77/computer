
/**********************************************/

/* Program: Stack        */
/*  Auther: Wenliang Li  */
/*    Data: 05/July/2009 */

/**********************************************/

/*Program starts*/

#include <iostream>
#include <cassert>
#include <cstdlib>

/**********************************************/

/*global constant*/ 

const int STACK_SIZE = 100;

/**********************************************/

/*program header*/

class stack
{

private:
  int count;
  int data[STACK_SIZE];

public:
  //void init();
  stack();
  void push(const int item);
  int pop();  

};

/**********************************************/

/*Init--initialize the stack*/

//inline void stack::init()
  //{
  //count = 0;
  //} 

inline stack::stack()
{
  count=0;
}




/**********************************************/

/*Push--push an item into the stack*/

inline void stack::push(const int item)
{
  assert((count >= 0)&&
	 (count <= sizeof(data)/sizeof(data[0])));
  data[count] = item;
  ++count;
}

/**********************************************/

/*Pop--get an item off the stack*/

inline int stack::pop()
{
  --count;
  assert((count >= 0)&&
	 (count < sizeof (data)/sizeof(data[0])));
  return (data[count]);
}

/***********************************************/

/*Main function*/
//int stack_c()
int main()
{
  stack a_stack;

  //a_stack.init();
  a_stack.push(1);
  a_stack.push(2);
  a_stack.push(3);

  std::cout << "Expect a 3 ->" << a_stack.pop() << '\n';
  std::cout << "Expect a 2 ->" << a_stack.pop() << '\n';
  std::cout << "Expect a 1 ->" << a_stack.pop() << '\n';
  
  return(0);
}

/**********************************************/

/*End*/
