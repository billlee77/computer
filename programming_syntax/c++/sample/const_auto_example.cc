#include <iostream>
using namespace std;

int main() {
    int arr[4] = {1, 2, 3, 4};

    for(const auto& i : arr) {
        cout << i << " ";
    }
    return 0;
}
// outputs 1 2 3 4
