#ifndef read_data_h
#define read_data_h


#include <iostream>
#include <fstream>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <set>

#include "TTree.h"
#include "TFile.h"




class ReadTree {

public:	


	typedef struct HIT {
	  Float_t pos[3];
	  Float_t energy;
	  int mirror, plane, track;
	} HIT_STRUCT;

	typedef struct MISS {
	  Float_t pos[3];
	  Float_t energy;
	  int mirror, plane, track;
	} MISS_STRUCT;

	
	typedef struct PARAMETERS {
	  float radius;
	  float MirrorTilt_12;
	  float MirrorTilt_34;
	  float PmtAngle[4];
	  float PmtRadii;
	  float OffsetX;
	  float OffsetY;
	  float OffsetZ;
	  float PmtPos[4][3];
	  int   Momentum;
	  float Pressure;
	} PARAM;



    float radius;
    float MirrorTilt_12;
    float MirrorTilt_34;
    float PmtAngle[4];
    float PmtRadii;

    // Offset X, Y, Z gives the detector offset, 
    // Offset Z gives the detector front distance from the focal plane

    float OffsetX;
    float OffsetY; 
    float OffsetZ;
    float PmtPos[4][3];
    int   Momentum;
    float Pressure;

	//TTree *GetHitList(); 
	TTree *GetParameters(); 
	TTree *GetHitData();
	TTree *GetMissData();

	void LoadParameters();

	ReadTree();
	~ReadTree();

	TFile rootfile;

private:
	
	TFile *open_file();
	PARAM param;
};

#endif
