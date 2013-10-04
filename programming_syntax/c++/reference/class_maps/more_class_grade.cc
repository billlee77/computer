/********************************
* More advanced -- clas to handle student data and grade
*
********************/

#include <iostream>
#include <string>
#include <vector>
#include <list>
#include <map>
#include <algorithm>

using namespace std;
const unsigned int max_student = 5;  	// Max number of student per class

class class_stuff {
  public:
	typedef vector<int> grades; 	// A set of grade
	map<string, grades> roster;	// Roster of the class
	list<string> waiting_list;      // People waiting on the list
  public:
	// Constructor defaults
	// Destructor defaults
	// Copy constructor defaults
	// Assignment
  public:
	void add_student(const string& name);
	void drop_student(const string& name);
	void record_grade(const string& name, const int grade, 
		const unsigned int assigned_number);
	void print_grades();

  private:
  	// Insert a student into the class
	void new_student(const string& name) {
	  grades no_grades;
	  roster.insert(pair<string, grades>(name, no_grades));
	}
};

//**************************************** 
// Here we add some new student 

void class_stuff::add_student(const string& name) {

  if (roster.find(name) != roster.end())
    return;

  if (roster.size() < max_student) {
    new_student(name);
  }
  else {
    waiting_list.push_back(name);
  }
}

//****************************************
// Here we drop some student

void class_stuff::drop_student(const string& name) {
  map<string, grades>::iterator the_student = roster.find(name);
  if (the_student == roster.end())
    return;
  roster.erase(name);
  
  //Add a person from the waiting-list if waiting-list is not empty

  if (waiting_list.size()>0) {
    string wait_name = waiting_list.front();
    waiting_list.pop_front();
    new_student(wait_name);
  }
}

//****************************************
// Record a grade for a student

void class_stuff::record_grade(const string& name, const int grade,
				const unsigned int assignment_number) {
  map<string, grades>:: iterator the_student = roster.find(name);
  
  if (the_student == roster.end()) {
    cerr << "Error: No such student " << name << '\n';
    return;
  }
 
  // Resize the grade list if there's not enough room
  if (the_student->second.size() <= assignment_number)
      the_student->second.resize(assignment_number+1);

  the_student->second[assignment_number] = grade;
}

//****************************************
// Print the students and their grades

void class_stuff::print_grades() {
  vector <string> sorted_names;

  map<string, grades>::iterator cur_student;
  for (cur_student = roster.begin(); 
	cur_student != roster.end(); ++cur_student) {
    sorted_names.push_back(cur_student->first);  
  }

 sort(sorted_names.begin(), sorted_names.end());

 vector<string>:: const_iterator cur_print;

  for (cur_print = sorted_names.begin();
	cur_print != sorted_names.end();
	++cur_print) {
    cout << * cur_print << '\t';
    grades:: const_iterator cur_grade;

    for (cur_grade = roster[*cur_print].begin(); 
	cur_grade != roster[*cur_print].end();
	++cur_grade) {
      cout << *cur_grade << ' ';
    }
    cout << '\n';
  }
}

int main() {

  class_stuff test_class;

  test_class.add_student("Baker, Mary");
  test_class.add_student("Johnson, Robin");
  test_class.add_student("Smith, Joe");
  test_class.add_student("Mouse, Micky");
  test_class.add_student("Able, Sam");
 
  test_class.add_student("Gadot, Waiting");
  test_class.add_student("Congreve, William");

  cout << "Before drop" << endl;
  test_class.print_grades();
  cout << "\n";
  
  test_class.drop_student("Johnson, Robin");
  
  cout << "After drop" << endl;
  test_class.print_grades(); 
  cout << "\n";

  int i;
  
  for (i=0; i<5; ++i) {
    test_class.record_grade("Baker, Mary",    i*10+50, i);
    test_class.record_grade("Smith, Joe",     i*10+50, i);
    test_class.record_grade("Mouse, Micky",   i*10+50, i);
    test_class.record_grade("Gadot, Waiting", i*10+50, i);
    test_class.record_grade("Able, Sam",      i*10+50, i);
  }

  cout << "Final" << endl;
  test_class.print_grades();
  cout << "\n";

  return (0);

}








