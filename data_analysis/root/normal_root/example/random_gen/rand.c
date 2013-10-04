{

double num_gen;
int num;

ofstream data_out;
data_out.open("test.dat");

TRandom1 *c1 = new TRandom1();

for (int i=0; i < 10000; i++) {
	// num= c1->Integer(100);	
    num_gen = c1->Rndm();
	// cout << num_gen*100 << endl;
    num = num_gen*100;
	cout << num << endl;
    data_out << num << endl;
}

return (0);
}
