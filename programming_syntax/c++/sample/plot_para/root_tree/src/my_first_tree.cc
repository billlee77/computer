#include <iostream>
#include <fstream>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <set>

#include "TTree.h"
#include "TFile.h"


void cerfile_open(); 
void hitfile_open();



ifstream namefile;
ifstream cer_data;
ifstream hit_data;



struct PARAM {
  float radius;
  float MirrorTilt_12;
  float MirrorTilt_34;
  float PmtAngle[4];
  float PmtRadii;
  float OffsetX;
  float OffsetY;
  float OffsetZ;
  float PmtPos[4][3];
  int   PlaneNum;
  float Pressure;

};

struct DATA { 
  float x,y,z;
  float energy;
  int mirror, plane, track;
};
// 
// struct MISS{ 
//   float m_x,m_y,m_z;
//   int m_mirror, m_plane, m_track;
// };
// 

// struct ID {
//   int n_mirror, n_plane, track_id;
// };

DATA data;
PARAM para;

// MISS miss;
//ID id;  




float xpos,ypos,zpos;
double energy;

int nMirror, nPlane, pid, ntrack;

int event_num = 0;

std::string cer_line, hit_line;

float hit_time;
float hit_x, hit_y, hit_z;
int hit_track;

std::set<int> hit_map;
std::set<int>::iterator hit_it;

int hit_id;

std::string cer_file;
std::string hit_file;


using namespace std;

int main() {



  TFile *tree_file = new TFile("data_tree.root","RECREATE");
// 
//   TTree *hit_list = new TTree("hit_list","hit list");
//   hit_list -> Branch("hit_data", &hit_id , "hit_id/i");


  namefile.open("files.dat");

  if (namefile.is_open())
    cout << "files.dat file is found" << endl;
  else {
    cerr << "files.dat file is not found!" << endl;
	exit(0);
  }

  getline( namefile , cer_file ); 


  hit_file = cer_file;

  hit_file.replace(0, 3, "hits");

//   cout << cer_file << endl;
//   cout << hit_file << endl;

	



  cerfile_open(); 
  hitfile_open();

  TTree *parameter = new TTree("input_parameters", "Input parameters");
  parameter -> Branch("parameter_brach", &para.radius, "radius/F:MirrorTilt_12:MirrorTilt_34:PmtAngle[4]:PmtRadii:OffsetX:OffsetY:OffsetZ:PmtPos[4][3]:PlaneNum/i:Pressure/F");

  getline( hit_data, hit_line );
  getline( cer_data , cer_line ); 
  sscanf( cer_line.c_str() , "%f %f %f %f %f %f %f %f %f %f %f", &para.radius, &para.MirrorTilt_12, &para.MirrorTilt_34, &para.PmtAngle[0], &para.PmtAngle[1], &para.PmtAngle[2], &para.PmtAngle[3], &para.PmtRadii, &para.OffsetX, &para.OffsetY, &para.OffsetZ);

  getline( cer_data , cer_line );
  sscanf( cer_line.c_str() , "%f %f %f %f %f %f %f %f %f %f %f %f", &para.PmtPos[0][0], &para.PmtPos[0][1], &para.PmtPos[0][2], &para.PmtPos[1][0], &para.PmtPos[1][1], &para.PmtPos[1][2], &para.PmtPos[2][0], &para.PmtPos[2][1], &para.PmtPos[2][2], &para.PmtPos[3][0], &para.PmtPos[3][1],&para.PmtPos[3][2]);

  getline( cer_data , cer_line );
  sscanf( cer_line.c_str() , "%i %f", &para.PlaneNum, &para.Pressure);

  // cout << para.radius << "  " << para.MirrorTilt_12 << "  " << para.MirrorTilt_34 << " "<< para.PmtRadii << "  " << para.FrontDis << "  "<< endl;
  
  parameter->Fill();

  while (!hit_data.eof()) {

    sscanf( hit_line.c_str() , "%f %f %f %f %i", &hit_time, &hit_x, &hit_y, &hit_z, &hit_track);
    getline( hit_data, hit_line );
	hit_map.insert(hit_track);

    // hit_id = hit_track;
	// cout <<  hit_id <<  endl;

	// hit_list->Fill();
  }

  TTree *hit_data = new TTree("hit_data", "Hit data");
  hit_data-> Branch("hit_branch", &data.x, "x/F:y:z:Energy:mirror/i:plane:track");

  TTree *miss_data = new TTree("miss_data","Miss data");
  miss_data-> Branch("miss_branch", &data.x, "x/F:y:z:Energy:mirror/i:plane:track");


  //cer_tree_mirr1-> Branch("miss_data", &miss, "m_x/F:m_y:m_z:m_mirror/i:m_plane:m_track");

//   TTree *cer_tree_mirr2 = new TTree("cer_tree_mirr2","Mirror 2 data");
//   cer_tree_mirr2-> Branch("hit_Data", &hit, "h_x/F:h_y:h_z:h_mirror/i:h_plane:h_track");
//   //cer_tree_mirr2-> Branch("miss_data", &miss, "m_x/F:m_y:m_z:m_mirror/i:m_plane:m_track");
// 
//   TTree *cer_tree_mirr3 = new TTree("cer_tree_mirr3","Mirror 3 data");
//   cer_tree_mirr3-> Branch("hit_Data", &hit, "h_x/F:h_y:h_z:h_mirror/i:h_plane:h_track");
//   //cer_tree_mirr3-> Branch("miss_data", &miss, "m_x/F:m_y:m_z:m_mirror/i:m_plane:m_track");
// 
//   TTree *cer_tree_mirr4 = new TTree("cer_tree_mirr4","Mirror 4 data");
//   cer_tree_mirr4-> Branch("hit_Data", &hit, "h_x/F:h_y:h_z:h_mirror/i:h_plane:h_track");
//   //cer_tree_mirr4-> Branch("miss_data", &miss, "m_x/F:m_y:m_z:m_mirror/i:m_plane:m_track");
// 
//   TTree *cer_tree_nomirr = new TTree("cer_tree_nomirr","Other data");
//   cer_tree_nomirr-> Branch("hit_Data", &hit, "h_x/F:h_y:h_z:h_mirror/i:h_plane:h_track");
//   //cer_tree_nomirr-> Branch("miss_data", &miss, "m_x/F:m_y:m_z:m_mirror/i:m_plane:m_track");

  getline( cer_data, cer_line );


  int test_num = 0; 
  int test_num1 = 0; 

  while (!cer_data.eof()) {

    sscanf( cer_line.c_str() , "%f %f %f %lf %i %i %i %i", &xpos , &ypos , &zpos , &energy , &nMirror , &nPlane , &pid, &ntrack );
    
    getline( cer_data, cer_line );

    int num = int (ntrack/1000);
  
    if (event_num != num){
      event_num =num;
  	//cout << "Event = " << event_num << endl;
    };


	if(pid == 0) {
	  data.x = xpos;
	  data.y = ypos;
	  data.z = zpos;    
	  data.energy = energy;    

	  data.mirror = nMirror;
      data.plane  = nPlane;
      data.track  = ntrack;

	  hit_it = hit_map.find(ntrack);

	 // if(hit_it != hit_map.end() && nPlane ==50 ) {

	  if(hit_it != hit_map.end()) {

	//	if(test_num1 != ntrack) {
		if(test_num1 != nPlane) {
		  //cout << test_num1 << endl;
		  //test_num ++;

		  hit_data->Fill();

		}

		test_num1 = nPlane;

		//cout << "I am here " << endl;
		
	  } else {
		
		miss_data->Fill();

	  }


	
	//  hit_data->Fill();


    }

// 

//     pos.x = xpos;
//     pos.y = ypos;
//     pos.z = zpos;
//   

    //cout << xpos <<"  " << ypos << "   " << zpos << endl;
    //cout << pos.x <<"  " << pos.y << "   " << pos.z << endl;



  }

  cout << "We are there now!      " << test_num << endl;
  cer_data.close();

  // hit_list->Print();

  parameter->Print();
  hit_data->Print();
  miss_data->Print();

  tree_file->Write();

  return(0);
}


void cerfile_open() {

  cer_data.open(cer_file.c_str());
  
  if (cer_data.is_open())
    cout << cer_file << " is loaded" << endl;
  else {
    cerr << cer_file << " is not found !" << endl;
	exit(0);
  }


  
}

void hitfile_open() {

  hit_data.open(hit_file.c_str());

  if (hit_data.is_open())
    cout << hit_file << " is loaded" << endl;
  else {
    cerr << hit_file << " is not found !" << endl;
	exit(0);
  }
  getline( hit_data , hit_line );
}
