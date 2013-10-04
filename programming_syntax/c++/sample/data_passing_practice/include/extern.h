
#ifndef extern_h
#define extern_h 1

class MyClass {
	public:
	    int m_Number;
	    char m_Character;

        void param_set();
        int extern_data[];
        void data_in_extern();

    private:

        void private_out();
        int *private_data;
       
        int *extern_data1; 

        

};


void large_number_out();




#endif
