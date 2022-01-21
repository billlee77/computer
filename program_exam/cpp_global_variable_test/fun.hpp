#ifndef FUN_HPP
#define FUN_HPP

#include <iostream>

class classA {
    friend void funct();
public:
    classA(int a=1,int b=2):propa(a),propb(b){std::cout<<"constructor\n";}
private:
    int propa;
    int propb;
    void outfun(){
//        std::cout<<"propa="<<propa<<endl<<"propb="<<propb<< std::endl;
    }
};

void funct();

extern double test_num;


#endif
