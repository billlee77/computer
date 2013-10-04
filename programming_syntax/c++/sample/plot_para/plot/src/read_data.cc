
#include <iostream>
#include <string>

#include <fstream>
#include "read_data.h"
#include <cstring>

// 	typedef struct HIT {
// 	  Float_t pos[3];
// 	  int mirror, plane, track;
// 	} HIT_STRUCT;
// 
// 	typedef struct MISS {
// 	  Float_t pos[3];
// 	  int mirror, plane, track;
// 	} MISS_STRUCT;

using namespace std;


TFile *ReadTree::open_file() {

	TFile *file;
//	TFile*file = new TFile("data/pmt42.root");
	
	string file_name;
	file_name = "data_tree.root";

	ifstream ifile(file_name.c_str());

	if (ifile) {
		file = new TFile(file_name.c_str());
		ifile.close();
	} else {
		cerr << "rootfile can not be found ! " << endl
			 << "Program Terminated !" << endl;
		exit(0);
	}


	return file;
}

// TTree *ReadTree::GetHitList() {
// 	TTree *hit_list = (TTree*)open_file()->Get("hit_list");
// 
// 	return hit_list;
// } 


TTree *ReadTree::GetParameters() {

	TTree *parameters  = (TTree*)open_file()->Get("input_parameters");
	return parameters;
}

TTree *ReadTree::GetHitData() {
	TTree *hit_tree  = (TTree*)open_file()->Get("hit_data");
	return hit_tree;
}
TTree *ReadTree::GetMissData() {
	TTree *miss_tree  = (TTree*)open_file()->Get("miss_data");
	return miss_tree;
}

void ReadTree::LoadParameters() {
  TTree *para_tree = GetParameters();
  para_tree -> SetBranchAddress("parameter_brach", &param);
  para_tree -> GetEntry(0);
  //cout << param.radius << "  " << param.MirrorTilt_12 << endl;
  //cout << param.PmtAngle[0] << "   " << param.PmtAngle[3] << endl;
  
  radius = param.radius;
  MirrorTilt_12 = param.MirrorTilt_12;
  MirrorTilt_34 = param.MirrorTilt_34;


  radius = param.radius;
  PmtRadii = param.PmtRadii;
  OffsetX = param.OffsetX;
  OffsetY = param.OffsetY;
  OffsetZ = param.OffsetZ;
  Momentum = param.Momentum;
  Pressure = param.Pressure;
  memcpy(&PmtAngle, &param.PmtAngle, sizeof(PmtAngle));
  memcpy(&PmtPos, &param.PmtPos, sizeof(PmtPos));
  
}


ReadTree::ReadTree() {

}

ReadTree::~ReadTree(){

};
