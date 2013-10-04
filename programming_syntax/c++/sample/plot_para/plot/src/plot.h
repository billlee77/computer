#ifndef plot_h
#define plot_h


#include "TTree.h"
#include "TFile.h"

#include "TCanvas.h"
#include "TH2D.h"
#include "TStyle.h"

#include <iostream>

#include <algorithm>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <vector>
#include <set>

#include <math.h>

#include "TTree.h"
#include "TFile.h"

#include "TCanvas.h"
#include "TH2D.h"
#include "TStyle.h"
#include "TLine.h"
#include "TPad.h"
#include "TGraph.h"
#include "TMultiGraph.h"
#include "TAttLine.h"
#include "TF1.h"
#include "TText.h"
#include "TPaveText.h"
#include "TPaletteAxis.h"
#include "TPaveStats.h"

class Plot{

  public: 
	Plot();
	int plot_data();

	std::map<int, int> total_map;
	std::map<int, int>::iterator total_it;
	std::string hit;

	std::map<int, int> hit_map;
	std::map<int, int>::iterator hit_it;

  private:

    ReadTree read;

	void Initialization(); 
	void HitFill(int i, TH2F *mirror1_planes[], TH2F *mirror2_planes[], TH2F *mirror3_planes[], TH2F *mirror4_planes[]);
	void MissFill(int i);


    void PlaneTracking_hit(int m_num, TH2F*hxz, TH2F*hxz_fit);
    void PlaneTracking_miss(int m_num, TH2F*hxz, TH2F*hxz_fit);
  	void SetStyle();
    void SetTitle();
	void SetPalette(TPaletteAxis* palette);

	// Plotting Fuction
	void PlotEffiency(TFile* file_box, TCanvas* c1, TH1F* hit_eff, TH1F* total_eff );
	void PlotPhotonRatio(TFile* file_box, TCanvas* c1);

	void PlotPhotonEnergy(TFile* file_box, TCanvas* c1);

	void PlotTracking(TFile* file_box, TCanvas* c1);

    void DrawPlane50(int mirror_num, TGraph* plane_50); 


	void PlotMirrorFrame();
	void ClearFrame();

	void PlotAllPhoton(TFile* file_box, TCanvas* c1);
	void PlotBackPlaneMiss(TFile* file_box, TCanvas* c1);
	void PlotCapture(TFile* file_box, TCanvas* c1);
	void PlotnoCapture(TFile* file_box, TCanvas* c1);

	void PlotPmtPlane(TFile* file_box, TCanvas* c1);


    void PlotPmtRMS(TFile* file_box, TCanvas* c1);


    void PmtRingInit();
    void PlotPmtRing();
    void ClearRing();

	// Clean Up
	void CleanUp(TCanvas* c1, TH2F *mirror1_planes[], TH2F *mirror2_planes[], TH2F *mirror3_planes[], TH2F *mirror4_planes[]);


	

	UInt_t hit_id;
  	ReadTree::HIT_STRUCT hit_data;
  	ReadTree::MISS_STRUCT miss_data;


    float x_pos, y_pos, z_pos;
    float energy;
    float line_start_x[4], line_mid_x[4], line_end_x[4];
    float line_start_y[4], line_mid_y[4], line_end_y[4];
    float line_start_z[4], line_mid_z[4], line_end_z[4];

//     float line_start_x, line_mid_x, line_end_x;
//     float line_start_y, line_mid_y, line_end_y;
//     float line_start_z, line_mid_z, line_end_z;

    TH2F* mirrorxz[4];
    TH2F* mirrorxz_fit[4]; 
    TH2F* allphoton;  
    TH2F* backplanemiss;  
    TH2F* capture;  
    TH2F* nocapture;  

	TH2F* pmthit[4];
	TH2F* pmtall[4];
	TH2F* pmtmiss[4]; 



    TGraph* graph;

	TGraph* trigger_rate;

	TH1F* event_eff;
	TH1F* event_total;
	TH1F* photon_ratio;
	TH1F* photonenergy; 

    int ntrack[4];

	double entry_num[4];

	int event_number;
	int event_itt;
	int temp_count;


    void effiency_output();

	float threshold;    
	float threshold_eff;



    double PMTR;
    double PMT1X; 
    double PMT1Y; 
    double PMT2X; 
    double PMT2Y; 
    double PMT3X; 
    double PMT3Y; 
    double PMT4X; 
    double PMT4Y; 
  
    double PMTAng1;
    double PMTAng2;
    double PMTAng3;
    double PMTAng4;

    double momentum;

	bool pmton; 


    std::vector<int> count_plane;
    std::vector<int>::iterator plane_itt;
	
    double plane_num;

	int total_event_number;
	double threshold_event_number;

	TGraph* vercent, *horcent, *top, *bot, *left, *right;

    TGraph *gPMT1;
    TGraph *gPMT2;  
    TGraph *gPMT3;  
    TGraph *gPMT4;  
       
    TGraph *gPMTo1; 
    TGraph *gPMTo2; 
    TGraph *gPMTo3; 
    TGraph *gPMTo4; 

	
	TPaletteAxis* palette;
 
	// PMT Photon RMS Area Plot
	TGraph* pmtrmsplot[4];


	void CountPlane();

	void GetRMS(TH2F *mirror1_planes[], TH2F *mirror2_planes[], TH2F *mirror3_planes[], TH2F *mirror4_planes[]);


	


};

#endif
