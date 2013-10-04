/********
  istream >> fixed_pt -- read a fixed_pt number
  Parameters
	in_file -- file to read
	number -- place to put the number	

  Returns
	refrence to the input file
*******/
#include <iostream>


std::istream& operator >> (std::istream& in_file, fixed_pt& number) {
  
  long int before_dp;
  char after_dp1, after_dp; 
  char ch;

  number = 0.0;
  assert(fixed_exp == 100);
  std::istream::sentry the_sentry(infile, true);

  if (the_sentry) {

    if (in_file.bad()) return (in_file);
    in_file >> before_dp;
    if (in_file.bad()) return (in_file);    
    in_file >> ch;
    if (in_file.bad()) return (in_file);

    if (ch != '.') {
      in_file.setstate(std::ios::failbit);
      return (in_file);
    } 

    in_file >> after_dp1 >> after_dp2;
    if (in_file.bad()) return (in_file);

    if ((!isdigit(after_dp1))||(!isdigit(after_dp2))) {
      in_file.setstate(std::ios::failbit);
      return (in_file);
    }

    number.value = before_dp * fixed_exp +
	(after_dp1 - '0') * 10 +
	(after_dp2 - '0');

  }
  else {
    in_file.setstate(std::ios::failbit);
  }

  return (in_file);

}
