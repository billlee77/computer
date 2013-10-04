#include <vector>
#include <list>
#include <iostream>

using namespace std;

double findThreshold(const unsigned int nAbove, const vector<double> numbers) {
  if (nAbove > numbers.size())
    return 0.;

  list<double> max;
  for (unsigned int i = 0; i < nAbove; ++i)
    max.push_back(numbers[i]);
  max.sort();

  for (unsigned int i = nAbove; i < numbers.size(); ++i) {
    if (numbers[i] > max.front()) {
      max.front() = numbers[i];
      max.sort();
    }
  }

  return max.front();
}

void findMax () {
  double testData[10] = {
    6,1,2,5,9,
    3,4,8,7,0,
  };
  vector<double> tData;
  for (unsigned int i = 0; i < 10; i++) {
    tData.push_back(testData[i]);
  }

  const unsigned int nAbove = 3;
  cout << "threshold: " << findThreshold(nAbove, tData) << endl;

}

