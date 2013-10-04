{

  string x;


  string input;


  float a, b;

  float n, m;
  char c, xx[11];

  ifstream infile;
  infile.open("data.dat");





  if(!infile.is_open()) {
     cerr << "File is not found" << endl;
     exit(0);
  };



/*-------------------------------------------------- 
// Method 1 to read out 2 colomn data
//
//
//   getline(infile, x);
//   while(infile.good()) {
//      cout << x << endl;
//      getline( infile, x );
//      sscanf(x.c_str(),"%f %f", &a, &b); 
//      cout << a << "         " << b << endl;
//    }
// 
// 
// 
----------------------------------------------------*/



/*-------------------------------------------------- 
// Method 2 to read out 2 colomn data


  infile.clear();
  infile.seekg (0, ios::beg);
  infile.getline( xx, 100);

  while(!infile.eof()) {
     cout << xx << endl;
     infile.getline( xx, 100 );
     sscanf(xx,"%f %f", &a, &b); 
     cout << a << "         " << b << endl;
   }

----------------------------------------------------*/



/*-------------------------------------------------- 
// Method 3 to read out 2 colomn data


  infile.clear();
  infile.seekg (0, ios::beg);
  getline(infile, x);
  size_t pos, pos2;

  while(!infile.eof()) {
    cout << x << endl;
    pos = x.find(" ");
    pos2 = x.find(" ");
	cout << pos << endl; 
	cout << pos2 << endl; 
    getline(infile, x);
  }

----------------------------------------------------*/


/*-------------------------------------------------- 
// Method 4 to read out 2 colomn data

  infile.clear();
  infile.seekg (0, ios::beg);
  while(!infile.eof()) {
    infile >> a >> b;
	if (infile.good())
    cout << a << " xx " << b << endl;  
  }

----------------------------------------------------*/




/*-------------------------------------------------- 
// Method 5 to read out 2 colomn data
*/
//   infile.clear();
//   infile.seekg (0, ios::beg);
//     while (infile.good()) {
//       getline( infile, x );
//       if (infile.good()) {
//          stringstream stream(x);
//          while(1) {
//            stream >> n >> m;
//            if(!stream)
//              break;
//              cout << "Found integer: " << n << "  " << m << "\n";
//          }
//        }
//     }

/*
----------------------------------------------------*/



//   infile.clear();
//   infile.seekg (0, ios::beg);
// 
//   string str;
//   stringstream ss;
// 
//   while (infile.good())     // loop while extraction from file is possible
//   {
//     c = infile.get();       // get character from file
//     if (infile.good()) {
//       cout << c;
//       str.append(1,c);
//     }
//   }

//   char* ccc;
// 
//   a = 100.09;
// 
//   ss <<  a ;
//   ccc = ss.str().c_str();
// 
// 
//   stringstream ss;
//   b = 200.09;
//   ss <<  b ;
//   ccc = ss.str().c_str();
//   str.append(ccc);
//   cout << str << endl;
// 
// 



  infile.close();
}



