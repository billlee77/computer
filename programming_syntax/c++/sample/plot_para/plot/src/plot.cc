
#include <iostream>
#include <math.h>
#include <string>

#include "read_data.h"
#include "plot.h"

#include <iterator>
#include <map>

#include <boost/lexical_cast.hpp>

#define PI 3.14159265

using namespace std;

int Plot::plot_data() {


  //ReadTree read;

  read.LoadParameters();

  TTree *hit_tree  = read.GetHitData();
  TTree *miss_tree  = read.GetMissData();

  hit_tree -> SetBranchAddress("hit_branch", &hit_data); 
  miss_tree -> SetBranchAddress("miss_branch", &miss_data); 
 
  UInt_t hit_num = hit_tree->GetEntries();
  UInt_t miss_num = miss_tree->GetEntries();


  SetStyle();

  TCanvas *cc = new TCanvas("cc","",800,600);

  cc->Range(-137.8066,-7.066735,575.7576,48.0359);

  cc->SetRightMargin(0.2);
  cc->SetLeftMargin(0.15);
  cc->Print( "results_plot.ps[" );

  Initialization();


  TFile *plot_box = new TFile("plots.root", "RECREATE");

  plot_box -> mkdir("efficiency_plot");
  plot_box -> mkdir("photon_status_plot");
  plot_box -> mkdir("x_z_plane_plot");
  plot_box -> mkdir("pmt_status_plot");
  plot_box -> cd();

  CountPlane();
 
  TH2F* mirror1_planes[int(plane_num)]; 
  TH2F* mirror2_planes[int(plane_num)]; 
  TH2F* mirror3_planes[int(plane_num)]; 
  TH2F* mirror4_planes[int(plane_num)]; 


  for (unsigned int i = 0; i <plane_num; i++) {


  	mirror1_planes[i] = new TH2F("" ,"", 350,  10,  45, 250,  55,  80);
  	mirror2_planes[i] = new TH2F("" ,"", 350, -45, -10, 250,  55,  80);
  	mirror3_planes[i] = new TH2F("" ,"", 350,  10,  45, 250, -65, -40);
  	mirror4_planes[i] = new TH2F("" ,"", 350, -45, -10, 250, -65, -40);

  }



  for (unsigned int i = 0; i < hit_num; i++) {
 	hit_tree -> GetEntry(i);
	HitFill( i, mirror1_planes, mirror2_planes, mirror3_planes, mirror4_planes);
  }


/*--------------------------------------------------*/
 // Here we try to identify the number of particle input into the Grant simulation 

  int pow_of_ten = log10(event_number);
 
  if(pow_of_ten > 4) {  
    total_event_number = int (ceil(float(event_number)/pow(10,4)) *pow(10,4));
    cout << "Total Event Number is : " << total_event_number << endl;
  }
  else {
    total_event_number = int (ceil(float(event_number)/pow(10,pow_of_ten)) *pow(10,pow_of_ten));
    cout << "Total Event Number is : " << total_event_number << endl;
  } 

/*--------------------------------------------------*/



  event_number = 0;
  event_itt = 0;
  temp_count = 0;

  GetRMS(mirror1_planes, mirror2_planes, mirror3_planes, mirror4_planes);

  for (unsigned int i = 0; i < miss_num; i++) {
	miss_tree -> GetEntry(i);
	MissFill(i);
  }  


/*--------------------------------------------------
 * Plotting Effiency
 * ----------------------------------------------------*/
  PlotEffiency(plot_box, cc, event_eff,  event_total);

/*--------------------------------------------------
 * Plotting Ratio
 * ----------------------------------------------------*/
  PlotPhotonRatio (plot_box, cc);

/*--------------------------------------------------
 * Plot Photon Energy Distribution 
 *----------------------------------------------------*/
  PlotPhotonEnergy(plot_box, cc);


/*--------------------------------------------------
 * Plotting All and Miss photons
 * ----------------------------------------------------*/
  PlotAllPhoton(plot_box, cc);
  PlotBackPlaneMiss(plot_box, cc);
// 
/*--------------------------------------------------
 * Plotting All and Miss photons
 * ----------------------------------------------------*/
  PlotCapture(plot_box, cc);
  PlotnoCapture(plot_box, cc);

/*--------------------------------------------------
 * Plotting Cerenkov Photon Track
 * ----------------------------------------------------*/

  cout << pmton << endl;

  if(pmton == false) {
  	PlotTracking(plot_box, cc);
  }

/*--------------------------------------------------
 * Plotting PMT plane (Plane 50) photon hit distribution
 *----------------------------------------------------*/
  PlotPmtPlane(plot_box, cc);
  PlotPmtRMS(plot_box, cc);
// 

/*--------------------------------------------------
 * Clean Up
 * ----------------------------------------------------*/
  CleanUp(cc, mirror1_planes, mirror2_planes, mirror3_planes, mirror4_planes);
  return(0);

}


//********************************************************
// Main program ends
//********************************************************


/*--------------------------------------------------
// Unility Functions Starts
----------------------------------------------------*/




Plot::Plot() {
	cout << "Program Start !" << endl; 
	event_number = 0;
}

/*--------------------------------------------------
  Parameter Initialization
----------------------------------------------------*/

void Plot::Initialization () {


  PMTR =  read.PmtRadii;
  PMT1X = read.PmtPos[0][0];
  PMT1Y = read.PmtPos[0][1];
  PMT2X = read.PmtPos[1][0];
  PMT2Y = read.PmtPos[1][1];
  PMT3X = read.PmtPos[2][0];
  PMT3Y = read.PmtPos[2][1];
  PMT4X = read.PmtPos[3][0];
  PMT4Y = read.PmtPos[3][1];
  
  PMTAng1 = read.PmtAngle[0];
  PMTAng2 = read.PmtAngle[1];
  PMTAng3 = read.PmtAngle[2];
  PMTAng4 = read.PmtAngle[3];

  momentum = read.Momentum; 


  mirrorxz[0] = new TH2F("mxz1" ,"", 360, 134, 152, 360, 60, 78);
  mirrorxz[1] = new TH2F("mxz2" ,"", 360, 131, 149, 360, 60, 78);
  mirrorxz[2] = new TH2F("mxz3" ,"", 360, 124, 142, 360, -59, -41);
  mirrorxz[3] = new TH2F("mxz4" ,"", 360, 122, 140, 360, -59, -41);

  mirrorxz_fit[0] = new TH2F("mxz1fit" ,"", 360, 134, 152, 360, 60, 78);
  mirrorxz_fit[1] = new TH2F("mxz2fit" ,"", 360, 131, 149, 360, 60, 78);
  mirrorxz_fit[2] = new TH2F("mxz3fit" ,"", 360, 124, 142, 360, -59, -41);
  mirrorxz_fit[3] = new TH2F("mxz4fit" ,"", 360, 122, 140, 360, -59, -41);

  pmthit[0] = new TH2F("Pmt Hit 1" ,"", 350 , 10, 45,   250, 55, 80);
  pmthit[1] = new TH2F("Pmt Hit 2" ,"", 350 , -45, -10, 250, 55, 80);
  pmthit[2] = new TH2F("Pmt Hit 3" ,"", 350 , 10, 45,   250, -65,-40);
  pmthit[3] = new TH2F("Pmt Hit 4" ,"", 350 , -45, -10, 250, -65, -40);
                        
  pmtall[0] = new TH2F("Pmt All 1" ,"", 350, 10, 45,   250, 55, 80);
  pmtall[1] = new TH2F("Pmt All 2" ,"", 350, -45, -10, 250, 55, 80);
  pmtall[2] = new TH2F("Pmt All 3" ,"", 350, 10, 45,   250, -65,-40);
  pmtall[3] = new TH2F("Pmt All 4" ,"", 350, -45, -10, 250, -65, -40);
  
  pmtmiss[0] = new TH2F("Pmt Miss 1" ,"", 350, 10, 45,   250, 55, 80);
  pmtmiss[1] = new TH2F("Pmt Miss 2" ,"", 350, -45, -10, 250, 55, 80);
  pmtmiss[2] = new TH2F("Pmt Miss 3" ,"", 350, 10, 45,   250, -65,-40);
  pmtmiss[3] = new TH2F("Pmt Miss 4" ,"", 350, -45, -10, 250, -65, -40);



  allphoton     =  new TH2F("All Photon" ,"", 360, -70, 70, 360, -80, 80);
  backplanemiss =  new TH2F(" Back Plane Miss" ,"", 360, -70, 70, 360, -80, 80);
  capture       =  new TH2F("Captured Photon" ,"", 360, -70, 70, 360, -80, 80);
  nocapture     =  new TH2F("Uncaptured Photon" ,"", 360, -70, 70, 360, -80, 80);

  event_eff = new TH1F("Hit Event","", 500, 0, 500);
  event_total = new TH1F("Total Event","", 500, 0, 500);
  photonenergy  =  new TH1F("Photon Energy Distribution" ,"", 121, 1, 7);

  photon_ratio = new TH1F("Photon Radio", "", 500, 0, 1);

  

  ntrack[0] = 0;
  ntrack[1] = 0;
  ntrack[3] = 0;
  ntrack[4] = 0;

  entry_num[0] = 0;
  entry_num[1] = 0;
  entry_num[2] = 0;
  entry_num[3] = 0;

  event_itt = 0;

  pmtrmsplot[0] = new TGraph();
  pmtrmsplot[1] = new TGraph();
  pmtrmsplot[2] = new TGraph();
  pmtrmsplot[3] = new TGraph();

  PmtRingInit();

  pmton = true;


}



void Plot::SetStyle () {

  gStyle->SetPalette(1,0);
  //gStyle->SetPaperSize(gStyle->kUSLetter);
  //gStyle->SetPaperSize(10,10);
  gStyle->SetCanvasColor(0);
  gStyle->SetStatColor(0);
  gStyle->SetPadColor(0);

  gStyle->SetOptStat(1111);

}






void Plot::HitFill (int i ,TH2F *mirror1_planes[], TH2F *mirror2_planes[], TH2F *mirror3_planes[], TH2F *mirror4_planes[]) {
	
    if(hit_data.mirror==1) {
      PlaneTracking_hit(hit_data.mirror, mirrorxz[0], mirrorxz_fit[0]);

	  for (unsigned int k = 0; k < int(plane_num); k++) {

		int tmp_num = k + (50- int(plane_num/2));

		if (hit_data.plane == tmp_num ) {
			mirror1_planes[k]->Fill(hit_data.pos[1], hit_data.pos[0]);
		}
	  }


    }
    else if (hit_data.mirror==2) {
      PlaneTracking_hit(hit_data.mirror, mirrorxz[1], mirrorxz_fit[1]);
	  for (unsigned int k = 0; k < int(plane_num); k++) {

		int tmp_num = k + (50- int(plane_num/2));

		if (hit_data.plane == tmp_num ) {
			mirror2_planes[k]->Fill(hit_data.pos[1], hit_data.pos[0]);
		}
	  }

    } 
    else if (hit_data.mirror==3) {
      PlaneTracking_hit(hit_data.mirror, mirrorxz[2], mirrorxz_fit[2]);

	  for (unsigned int k = 0; k < int(plane_num); k++) {

		int tmp_num = k + (50- int(plane_num/2));

		if (hit_data.plane == tmp_num ) {
			mirror3_planes[k]->Fill(hit_data.pos[1], hit_data.pos[0]);
		}
	  }

    } 
    else if (hit_data.mirror==4) {
      PlaneTracking_hit(hit_data.mirror, mirrorxz[3], mirrorxz_fit[3]);

	  for (unsigned int k = 0; k < int(plane_num); k++) {

		int tmp_num = k + (50- int(plane_num/2));

		if (hit_data.plane == tmp_num ) {
			mirror4_planes[k]->Fill(hit_data.pos[1], hit_data.pos[0]);
		}
	  }
	}


	if (i==0) {
		event_number = hit_data.track/1000;
	}

	if (event_number != hit_data.track/1000 &&  hit_data.plane == 50 ) {
		
		//event_itt;
		event_eff->Fill(event_itt);
		// cout << event_itt << endl;
	
		// cout << event_number << "  " << event_itt << endl;


		total_map.insert(pair<int, int>(event_number, event_itt));

		hit_map.insert(pair<int, int>(event_number, event_itt));

		event_number = hit_data.track/1000;
		event_itt = 0;
		// exit(0);

	}

	if (hit_data.plane == 50 ) {
	  event_itt++;
	} else if (hit_data.plane == 99) {
	  capture->Fill(hit_data.pos[1], hit_data.pos[0]);
	  allphoton->Fill(hit_data.pos[1], hit_data.pos[0]);
	  // Fill Photon Energy
	  energy = hit_data.energy * pow(10,6);
	  photonenergy->Fill(energy);
	}
	

}



void Plot::MissFill(int i) {

    if(miss_data.mirror==1) {
      PlaneTracking_miss(miss_data.mirror, mirrorxz[0], mirrorxz_fit[0]);
    }
    else if (miss_data.mirror==2) {
      PlaneTracking_miss(miss_data.mirror, mirrorxz[1], mirrorxz_fit[1]);
    } 
    else if (miss_data.mirror==3) {
      PlaneTracking_miss(miss_data.mirror, mirrorxz[2], mirrorxz_fit[2]);
    } 
    else if (miss_data.mirror==4) {
      PlaneTracking_miss(miss_data.mirror, mirrorxz[3], mirrorxz_fit[3]);
	}
		
	if (i==0) {
		event_number = 1;
	}

	if (miss_data.plane == 99 ) {
	  event_itt++;
	  allphoton->Fill(miss_data.pos[1], miss_data.pos[0]);
	  nocapture->Fill(miss_data.pos[1], miss_data.pos[0]);
 
      // Fill Photon Energy
      energy = miss_data.energy * pow(10,6);
      photonenergy->Fill(energy);

	} else if (miss_data.plane == 98) {
	  backplanemiss->Fill(miss_data.pos[1], miss_data.pos[0]);
	  allphoton->Fill(miss_data.pos[1], miss_data.pos[0]);

      // Fill Photon Energy
      energy = miss_data.energy * pow(10,6);
      photonenergy->Fill(energy);

	} 

	if (event_number != miss_data.track/1000) {

	  temp_count = total_map.find(event_number)->second + event_itt;
	  total_map.erase(event_number);
	  total_map.insert(pair<int, int>(event_number, temp_count));

 	  event_number = miss_data.track/1000;
 	  event_itt = 0;                     

	}
	
}


void Plot::PlaneTracking_hit(int m_num, TH2F* hxz, TH2F* hxz_fit) {

      int mirror_num = m_num -1;

	  x_pos = hit_data.pos[0];
	  y_pos = hit_data.pos[1];
	  z_pos = hit_data.pos[2];

	  hxz->Fill(z_pos, x_pos);


        if (hit_data.plane == 53 ) {

	      ntrack[mirror_num] = hit_data.track;
	      line_start_x[mirror_num] = x_pos;
	      line_start_y[mirror_num] = y_pos;
	      line_start_z[mirror_num] = z_pos;


	    } else if(hit_data.plane == 50 && ntrack[mirror_num] == hit_data.track ) {

	      line_mid_x[mirror_num] = x_pos;
	      line_mid_y[mirror_num] = y_pos;
	      line_mid_z[mirror_num] = z_pos;

	    } else if(hit_data.plane == 47 && ntrack[mirror_num] == hit_data.track ) { 
 	      line_end_x[mirror_num] = x_pos;
 	      line_end_y[mirror_num] = y_pos;
          line_end_z[mirror_num] = z_pos;
 
		  entry_num[mirror_num]++;



 	  	  graph = new TGraph();		  

	      graph->SetPoint(0,  line_start_z[mirror_num], line_start_x[mirror_num]);
	      graph->SetPoint(1,  line_mid_z[mirror_num],   line_mid_x[mirror_num]);
	      graph->SetPoint(2,  line_end_z[mirror_num],   line_end_x[mirror_num]);


  		  graph->Fit("pol1","0Q");
  		  TF1*fit = (TF1*)graph->FindObject("pol1");

 		  float grad = fit->GetParameter(1);
  		  float off = fit->GetParameter(0);
 		  float xx;
 
		  for(float zz = line_end_z[mirror_num]+0.1; zz <= line_start_z[mirror_num]-0.1; zz=zz+0.05) {
 			xx = grad*zz + off;                           
                                                          
                                                          
      		//cout << "Mirror number : "<< mirror_num << endl;
 			hxz_fit->Fill(zz,xx);

 		  }
		  
		  delete fit;
 		  delete graph;
        } 


	if (hit_data.plane==50) {

	  pmthit[mirror_num]->Fill(hit_data.pos[1], hit_data.pos[0]);		
	  pmtall[mirror_num]->Fill(hit_data.pos[1], hit_data.pos[0]);

	}



}





void Plot::PlaneTracking_miss(int m_num, TH2F* hxz, TH2F* hxz_fit) {

      int mirror_num = m_num -1;

	  x_pos = miss_data.pos[0];
	  y_pos = miss_data.pos[1];
	  z_pos = miss_data.pos[2];
      

     //cout << x_pos << "   " << y_pos << "    " << z_pos << endl;

	  //mirrorxz[0]->Fill(z_pos, x_pos);
	  hxz->Fill(z_pos, x_pos);


      if (miss_data.plane == 53) {
		ntrack[mirror_num] = miss_data.track;
	    line_start_x[mirror_num] = x_pos;
		line_start_y[mirror_num] = y_pos;
	    line_start_z[mirror_num] = z_pos;


	  } else if(miss_data.plane == 50 && ntrack[mirror_num] == miss_data.track ) {

		line_mid_x[mirror_num] = x_pos;
		line_mid_y[mirror_num] = y_pos;
		line_mid_z[mirror_num] = z_pos;

	  } else if(miss_data.plane == 47 && ntrack[mirror_num] == miss_data.track ) { 
 	    line_end_x[mirror_num] = x_pos;
 	    line_end_y[mirror_num] = y_pos;
        line_end_z[mirror_num] = z_pos;
// 		
// 		
// //		if (line_start_y < 28.71 && line_start_y >24.71 ) {
 
//       cout << x_pos << "   " << y_pos << "    " << z_pos << endl;


        entry_num[mirror_num]++;
      
  	    graph = new TGraph();		  
      
        graph->SetPoint(0,  line_start_z[mirror_num], line_start_x[mirror_num]);
        graph->SetPoint(1,  line_mid_z[mirror_num],   line_mid_x[mirror_num]);
        graph->SetPoint(2,  line_end_z[mirror_num],   line_end_x[mirror_num]);
        //multigraph -> Add(graph);		
	    graph->Fit("pol1","0Q");
	    TF1*fit = (TF1*)graph->FindObject("pol1");
      
	    float grad = fit->GetParameter(1);
	    float off = fit->GetParameter(0);
	    float xx;
      
	    for(float zz = line_end_z[mirror_num]+0.1; zz <= line_start_z[mirror_num]-0.1; zz=zz+0.05) {
	  	xx = grad*zz + off;
      
      
  	  	//cout << "Mirror number : "<< mirror_num << endl;
	  	hxz_fit->Fill(zz,xx);
      
	    }
	    delete fit;
 	    delete graph;
      
	   } 

	if (miss_data.plane==50) {

	  pmtmiss[mirror_num]->Fill(miss_data.pos[1], miss_data.pos[0]);		
	  pmtall[mirror_num]->Fill(miss_data.pos[1], miss_data.pos[0]);

	}
 } 


void Plot::DrawPlane50(int mirror_num, TGraph* plane_50) {

  ReadTree read;

  read.LoadParameters();
 
  //float pmt_1_center_z = read.FrontDis + read.PmtPos[mirror_num][2] ;
 
  float pmt_1_center_z = read.OffsetZ + read.PmtPos[mirror_num][2] ;

//   cout << read.OffsetZ << endl;
//   cout << endl;
//   exit(0);


  float pmt_1_center_x = read.PmtPos[mirror_num][0];

  float pmt_1_angle = read.PmtAngle[mirror_num];
  float pmt_radii = read.PmtRadii; 

  float delta_x = pmt_radii *sin((90-pmt_1_angle)*PI/180);
  float delta_z = pmt_radii *cos((90-pmt_1_angle)*PI/180);


  // cout << delta_x << "      " << delta_z  << "       " ;

  plane_50 -> SetPoint(0, pmt_1_center_z-delta_z, pmt_1_center_x-delta_x);
  plane_50 -> SetPoint(1, pmt_1_center_z+delta_z, pmt_1_center_x+delta_x);

}


void Plot::SetTitle() 
{
  TPaveText *pt = new TPaveText(0.3,.94,.6, 0.99,"blNDC");
  TText *title = pt->AddText("");
  title->SetTextSize(.03);
  pt->SetFillColor(0);
  pt->Draw();

  pt->Draw();

}


void Plot::SetPalette(TPaletteAxis* palette) {

  palette->SetY2NDC(0.75);
  //palette2->SetX1NDC(0.9);
  //palette2->SetX2NDC(0.92);
  
  //	palette2->SetLabelOffset(-0.01);
  //palette2->SetTitleOffset(-1);
  palette->SetLabelSize(0.025);
  palette->GetAxis()->SetTickSize(0.03);
  palette->SetX2NDC(0.825);

}


void Plot::PlotEffiency(TFile* file_box, TCanvas* c1, TH1F* hit_eff, TH1F* total_eff) {


  for ( total_it=total_map.begin() ; total_it != total_map.end(); total_it++ ) {
	//cout << (*total_it).first << "       " << (*total_it).second << endl;
	event_total->Fill((*total_it).second);
  }

  c1->Update();

  hit_eff->SetLineColor(kBlue);
  hit_eff->SetLineWidth(2); // Hits will be colored with blue
  hit_eff->SetFillColor(kBlue); // Hits will be colored with blue
  hit_eff->SetFillStyle(3004);

  total_eff->SetLineColor(kRed);
  total_eff->SetFillColor(kRed); // Hits will be colored with blue
  total_eff->SetLineWidth(3); // Hits will be colored with blue
  total_eff->SetFillStyle(3005);


  hit_eff->GetYaxis()->SetTitle("Number of Events");
  hit_eff->GetXaxis()->SetTitle("Number of Photons per Event");
  hit_eff->GetXaxis()->CenterTitle();
  hit_eff->GetYaxis()->CenterTitle();
  hit_eff->GetYaxis()->SetTitleOffset(1.60);

//  cout << "Detected Particle: " << hit_eff->Integral() << endl 
//	   << "Total Particle: " << total_eff->Integral() << endl;

  trigger_rate = new TGraph();
 
  double trig_eff;

  for (int i=1; i <41; i++ ) {
	
    
	trig_eff = hit_eff->Integral(i, 502) / total_event_number;

//  	cout << hit_eff->Integral(i, 502) << "     "  << total_event_number << 
//      "       "   << trig_eff << endl;


  
    if ( i !=1 ) {

		// Ignore the 1st bin, because of the 0 photon is detected.
		trigger_rate->SetPoint(trigger_rate->GetN(), i-1, trig_eff);
    }


	/*--------------------------------------------------*/
	// Note that at 7GeV Momentum the cutting threshold is at 10 photo-e 
	//           at 3GeV Momentum the cutting threshold is at 2 photo-e
	
	if( momentum ==7 && i ==11) {
		threshold_eff = trig_eff;
		threshold = 10;
        threshold_event_number = hit_eff->Integral(i, 502);
	} else if ( momentum ==3 && i == 3) {
		threshold_eff = trig_eff;
		threshold = 2;
        threshold_event_number = hit_eff->Integral(i, 502);
	}



  }

  hit_eff->Draw("HIST");
  c1->Update();
  
  TPaveStats * ps1 = (TPaveStats*)hit_eff->GetListOfFunctions()->FindObject("stats");
  ps1->SetX1NDC(0.35); 
  ps1->SetX2NDC(0.55);
  ps1->SetTextColor(kBlue);
  c1->Modified();
  c1->cd();


  total_eff->Draw("][sames");
  c1->Update();

  TPaveStats * ps2 = (TPaveStats*)total_eff->GetListOfFunctions()->FindObject("stats");
  ps2->SetTextColor(kRed);
  ps2->SetX1NDC(0.6); 
  ps2->SetX2NDC(0.8);

  c1->Modified();
  c1->cd();

  file_box -> cd("efficiency_plot");

  hit_eff -> Write();
  total_eff -> Write();

  c1->Write();
  c1->Print("results_plot.ps");
  c1->cd();
  c1->Clear();

  delete ps1;
  delete ps2;


  trigger_rate -> SetMarkerStyle(21);
  trigger_rate -> SetMarkerSize(1);
  trigger_rate -> SetMarkerColor(kBlue);
  //trigger_rate -> SetTitle("Trigger Effiency");

  trigger_rate -> GetYaxis() -> SetTitleOffset(1.30);
  trigger_rate -> SetName("eff");
  trigger_rate -> Draw("ACP");


  if ( momentum ==7 || momentum ==3 ) {

    effiency_output();

  }


  file_box -> GetDirectory("efficiency_plot") -> WriteTObject(trigger_rate, "eff");

  
  
  trigger_rate -> GetXaxis() -> SetTitle("Threshold");
  trigger_rate -> GetXaxis() -> CenterTitle();
  trigger_rate -> GetYaxis() -> SetTitle("Efficiency");
  trigger_rate -> GetYaxis() -> CenterTitle();


  c1->Update();
  
  c1->Write();
  c1->Print("results_plot.ps");
  c1->cd();
  c1->Clear();

  delete hit_eff;
  delete total_eff;

}




void Plot::PlotTracking(TFile* file_box, TCanvas* c1) {

  for(int i =0; i<4; i++) {

    TGraph *plane_50 = new TGraph();

    DrawPlane50(i, plane_50);
    mirrorxz[i]->GetYaxis()->SetTitle("X (cm)");
    mirrorxz[i]->GetXaxis()->SetTitle("Z (cm)");
    mirrorxz[i]->GetXaxis()->CenterTitle();
    mirrorxz[i]->GetYaxis()->CenterTitle();
    mirrorxz[i]->GetYaxis()->SetTitleOffset(1.30);
    mirrorxz[i] -> Draw("COLZ");

	c1->Update();
    TPaletteAxis *palette1 = (TPaletteAxis*)mirrorxz[i]->GetListOfFunctions()->FindObject("palette");
	//SetPalette(palette1);
    plane_50 -> Draw();
	//SetTitle();

	file_box -> cd("x_z_plane_plot");
	c1->Write();
    c1->Print("results_plot.ps");
    c1->cd();
    c1->Clear();

    mirrorxz_fit[i]->GetYaxis()->SetTitle("X (cm)");
    mirrorxz_fit[i]->GetXaxis()->SetTitle("Z (cm)");
    mirrorxz_fit[i]->GetXaxis()->CenterTitle();     
    mirrorxz_fit[i]->GetYaxis()->CenterTitle();     
    mirrorxz_fit[i]->GetYaxis()->SetTitleOffset(1.30);

    mirrorxz_fit[i]->SetEntries(entry_num[i]);   

 	// cout << entry_num[i] << endl;

    mirrorxz_fit[i]-> Draw("COLZ");
	c1->Update();
    TPaletteAxis *palette2 = (TPaletteAxis*)mirrorxz_fit[i]->GetListOfFunctions()->FindObject("palette");
	//SetPalette(palette2);
    plane_50 -> Draw();
	//SetTitle();
	file_box -> cd("x_z_plane_plot");

	c1->Write();

    c1->Print("results_plot.ps");
    c1->cd();
    c1->Clear();

	delete palette1;
	delete palette2;
    delete plane_50;
  }
}





void Plot::CleanUp(TCanvas* c1, TH2F *mirror1_planes[], TH2F *mirror2_planes[], TH2F *mirror3_planes[], TH2F *mirror4_planes[]) {

  c1->Print( "results_plot.ps]" );

  for (int i=0; i < 4; i++) {
 	delete mirrorxz[i];
  	delete mirrorxz_fit[i];
	delete pmtrmsplot[i];
  }

  
  ClearRing();

  delete allphoton;
  delete backplanemiss;
  delete capture;  
  delete nocapture;
  delete photon_ratio;

  delete c1;

  for (unsigned int i = 0; i <plane_num; i++) {

  	delete mirror1_planes[i];
  	delete mirror2_planes[i];
  	delete mirror3_planes[i];
  	delete mirror4_planes[i];

  }

}

void Plot::effiency_output() {


   //cout << total_event_number << "   " <<   threshold_event_number << endl;

   string eff_output = "Effiency at " ;
   string tmp = boost::lexical_cast<string>(threshold);
   eff_output.append(tmp.c_str());
   eff_output.append(" Photo-e (Cut): ");
   tmp = boost::lexical_cast<string>(threshold_eff);
   eff_output.append(tmp.c_str(), 6);


   string total_event = "Total Events: ";
   tmp = boost::lexical_cast<string>(total_event_number);
   total_event.append(tmp.c_str());


   string hit_event = "Events Above Cut: ";
   tmp = boost::lexical_cast<string>(threshold_event_number);
   hit_event.append(tmp.c_str());


   TPaveText *pt = new TPaveText(0.5,0.8,0.8,0.9, "lbNDC");
	  pt->SetBorderSize(1);
	  pt->SetFillColor(0);
   	  pt->AddText(eff_output.c_str());
   	  pt->AddText(hit_event.c_str());
   	  pt->AddText(total_event.c_str());
      pt->SetTextAlign(12);

   	  pt->Draw();
   
   

}



void Plot::PlotPhotonRatio(TFile* file_box, TCanvas* c1) {



//   total_it = total_map.begin();
// 
//   hit_it = hit_map.begin();

  //cout << total_map.size() << endl;
  //cout << total_map[6] << endl;
  
//   for (unsigned i =0; i < total_map.size(); i++) {
// 
//     advance(total_it, i);
// 
//     cout << *hit_it<< "    " << *total_it << endl;
// 
// 
// 
//   }

  double ratio;

  for ( total_it=total_map.begin() ; total_it != total_map.end(); total_it++ ) {

	//hit_map.find((*total_it).first);
    //cout  << (*total_it).second << "    "<< hit_map[(*total_it).first] << endl;
	
    ratio =  double (hit_map[(*total_it).first]) / double ((*total_it).second);
	
    //cout << hit_map[(*total_it).first] << "  " << (*total_it).second << "    " << "      " << ratio << endl;
    //cout << ratio <<  "     "; 

 	photon_ratio -> Fill(ratio);  

  }
  photon_ratio -> GetYaxis()->SetTitle("Number of Event");
  photon_ratio -> GetXaxis()->SetTitle("Detected Photon/Generated Photon (per event)");
  photon_ratio -> GetXaxis()->CenterTitle();     
  photon_ratio -> GetYaxis()->CenterTitle(); 

  photon_ratio ->SetLineWidth(3);
  photon_ratio ->SetLineColor(kBlue);  

  photon_ratio ->Draw("HIST");
  c1->Update();
  c1->SetLogy(1);


//  c1 -> Update();

//  c1 -> SetLogy();
//  c1 -> Update();

  file_box -> cd("efficiency_plot");
  photon_ratio->Write();
  c1->Write();

  c1->Print("results_plot.ps");

  c1->SetLogy(0);
  c1->cd();
  c1->Clear();


}












void Plot::PlotAllPhoton(TFile* file_box, TCanvas* c1) {

  allphoton-> GetYaxis()->SetTitle("X (cm)");
  allphoton-> GetXaxis()->SetTitle("Y (cm)");
  allphoton-> GetXaxis()->CenterTitle();     
  allphoton-> GetYaxis()->CenterTitle();   

  allphoton -> Draw("COLZ");
  c1->Update();
  palette = (TPaletteAxis*)allphoton->GetListOfFunctions()->FindObject("palette");
  SetPalette(palette);

  PlotMirrorFrame();

  file_box -> cd("photon_status_plot");
  allphoton->Write();
  c1->Write();
 
  c1->Print("results_plot.ps");
  c1->cd();
  c1->Clear();
  ClearFrame();
 
  //delete palette;
}


void Plot::PlotBackPlaneMiss(TFile* file_box, TCanvas* c1) {

  backplanemiss -> GetYaxis()->SetTitle("X (cm)");
  backplanemiss -> GetXaxis()->SetTitle("Y (cm)");
  backplanemiss -> GetXaxis()->CenterTitle();     
  backplanemiss -> GetYaxis()->CenterTitle();     
  backplanemiss -> Draw("COLZ");

  c1->Update();
  palette = (TPaletteAxis*)backplanemiss->GetListOfFunctions()->FindObject("palette");
  //SetPalette(palette);

  PlotMirrorFrame();

  file_box -> cd("photon_status_plot");
  backplanemiss->Write();
  c1->Write();

  c1->Print("results_plot.ps");
  c1->cd();
  c1->Clear();
  ClearFrame();

  //delete palette;
}


void Plot::PlotCapture(TFile* file_box, TCanvas* c1) {

  capture -> GetYaxis()->SetTitle("X (cm)");
  capture -> GetXaxis()->SetTitle("Y (cm)");
  capture -> GetXaxis()->CenterTitle();     
  capture -> GetYaxis()->CenterTitle();     

  capture->Draw("COLZ");
  c1->Update();
  palette = (TPaletteAxis*)capture->GetListOfFunctions()->FindObject("palette");
  SetPalette(palette);

  PlotMirrorFrame();

  file_box -> cd("photon_status_plot");
  capture->Write();
  c1->Write();

  c1->Print("results_plot.ps");
  c1->cd();
  c1->Clear();
  ClearFrame();

}



void Plot::PlotnoCapture(TFile* file_box, TCanvas* c1) {

  nocapture -> GetYaxis()->SetTitle("X (cm)");
  nocapture -> GetXaxis()->SetTitle("Y (cm)");
  nocapture -> GetXaxis()->CenterTitle();     
  nocapture -> GetYaxis()->CenterTitle(); 

  nocapture->Draw("COLZ");
  c1->Update();
  palette = (TPaletteAxis*)nocapture->GetListOfFunctions()->FindObject("palette");
  SetPalette(palette);

  PlotMirrorFrame();

  file_box -> cd("photon_status_plot");
  nocapture->Write();
  c1->Write();

  c1->Print("results_plot.ps");
  c1->cd();
  c1->Clear();
  ClearFrame();


}


void Plot::PlotPmtPlane(TFile* file_box, TCanvas* c1) {


    for (unsigned int i =0; i < 4; i++ ) {

	  pmthit[i] -> GetYaxis()->SetTitle("X (cm)");
      pmthit[i] -> GetXaxis()->SetTitle("Y (cm)");
      pmthit[i] -> GetXaxis()->CenterTitle();     
      pmthit[i] -> GetYaxis()->CenterTitle(); 
      
  	  pmtmiss[i] -> GetYaxis()->SetTitle("X (cm)");
      pmtmiss[i] -> GetXaxis()->SetTitle("Y (cm)");
      pmtmiss[i] -> GetXaxis()->CenterTitle();     
      pmtmiss[i] -> GetYaxis()->CenterTitle(); 
      
	  pmtall[i] -> GetYaxis()->SetTitle("X (cm)");
      pmtall[i] -> GetXaxis()->SetTitle("Y (cm)");
      pmtall[i] -> GetXaxis()->CenterTitle();     
      pmtall[i] -> GetYaxis()->CenterTitle(); 


	  // Plot hit photon on PMT

	  pmthit[i] -> Draw("COLZ");
      PlotPmtRing();

      c1->Update();
      palette = (TPaletteAxis*)pmthit[i]->GetListOfFunctions()->FindObject("palette");
      SetPalette(palette);

      file_box -> cd("pmt_status_plot");
      pmthit[i] -> Write();
      c1 -> Write();
      c1 -> Print("results_plot.ps");
      c1 -> cd();
      c1 -> Clear();



	  // Plot all photon on PMT
	  pmtall[i] -> Draw("COLZ");
      PlotPmtRing();

      c1->Update();
      palette = (TPaletteAxis*)pmtall[i]->GetListOfFunctions()->FindObject("palette");
      SetPalette(palette);

      file_box -> cd("pmt_status_plot");
      pmtall[i] -> Write();
      c1 -> Write();
      c1 -> Print("results_plot.ps");
      c1 -> cd();
      c1 -> Clear();


	  // Plot miss photon on PMT
	  pmtmiss[i] -> Draw("COLZ");

      PlotPmtRing();

      c1->Update();
      palette = (TPaletteAxis*)pmtmiss[i]->GetListOfFunctions()->FindObject("palette");
      SetPalette(palette);

      file_box -> cd("pmt_status_plot");
      pmtmiss[i] -> Write();
      c1 -> Write();
      c1 -> Print("results_plot.ps");
      c1 -> cd();
      c1 -> Clear();

      //delete palette1;
      //delete palette2;
      //delete palette3;

	}


}


void Plot::PlotMirrorFrame() {

  double x[2], y[2];
  double xmax=60.0; 
  double xmid=5.0; 
  double xmin=-50.0; 
  double ymax=55.0; 
  double ymid=0.0; 
  double ymin=-55.0; 

  x[0]=xmin;
  x[1]=xmax;
  y[0]=ymid;
  y[1]=ymid; 
  vercent = new TGraph(2,y,x);
  
  x[0]=xmid;
  x[1]=xmid;
  y[0]=ymin;
  y[1]=ymax; 
  horcent = new TGraph(2,y,x);

  x[0]=xmin;
  x[1]=xmax;
  y[0]=ymax;
  y[1]=ymax; 
  top = new TGraph(2,y,x);
  
  x[0]=xmin;
  x[1]=xmax;
  y[0]=ymin;
  y[1]=ymin; 
  bot = new TGraph(2,y,x);
  
  x[0]=xmin;
  x[1]=xmin;
  y[0]=ymin;
  y[1]=ymax; 
  left = new TGraph(2,y,x);

  x[0]=xmax;
  x[1]=xmax;
  y[0]=ymin;
  y[1]=ymax; 
  right = new TGraph(2,y,x);

  vercent->Draw("C");
  horcent->Draw("C");
  top->Draw("C");
  bot->Draw("C");
  left->Draw("C");
  right->Draw("C");

}

void Plot::ClearFrame() {
  delete vercent;
  delete horcent;
  delete top;
  delete bot;
  delete left;
  delete right;
}



void Plot::PmtRingInit() {

  double pmt1x[91], pmt1y[91];
  double pmt2x[91], pmt2y[91];
  double pmt3x[91], pmt3y[91];
  double pmt4x[91], pmt4y[91];
  
  double pmto1x[91], pmto1y[91];
  double pmto2x[91], pmto2y[91];
  double pmto3x[91], pmto3y[91];
  double pmto4x[91], pmto4y[91];

  //cout << PMTAng1 << "  " << PMTAng2 << "  " << PMTAng3 << "  " << PMTAng4 << endl;


  // Fill the ellipse representing the PMT edge parametrically by looping through
  // 360 degrees in 4 degree increments
  for(int i=0; i<91; i++) {
	pmt1x[i] = PMT1X + PMTR*cos(PMTAng1*PI/180)*cos(4*i*PI/180);
	pmt1y[i] = PMT1Y + PMTR*sin(4*i*PI/180);
	pmt2x[i] = PMT2X + PMTR*cos(PMTAng2*PI/180)*cos(4*i*PI/180);
	pmt2y[i] = PMT2Y + PMTR*sin(4*i*PI/180);
	pmt3x[i] = PMT3X + PMTR*cos(PMTAng3*PI/180)*cos(4*i*PI/180);
	pmt3y[i] = PMT3Y + PMTR*sin(4*i*PI/180);
	pmt4x[i] = PMT4X + PMTR*cos(PMTAng4*PI/180)*cos(4*i*PI/180);
	pmt4y[i] = PMT4Y + PMTR*sin(4*i*PI/180);
	
	pmto1x[i] =PMT1X + 8.0*cos(PMTAng1*PI/180)*cos(4*i*PI/180);
	pmto1y[i] =PMT1Y + 8.0*sin(4*i*PI/180);
	pmto2x[i] =PMT2X + 8.0*cos(PMTAng2*PI/180)*cos(4*i*PI/180);
	pmto2y[i] =PMT2Y + 8.0*sin(4*i*PI/180);
	pmto3x[i] =PMT3X + 8.0*cos(PMTAng3*PI/180)*cos(4*i*PI/180);
	pmto3y[i] =PMT3Y + 8.0*sin(4*i*PI/180);
	pmto4x[i] =PMT4X + 8.0*cos(PMTAng4*PI/180)*cos(4*i*PI/180);
	pmto4y[i] =PMT4Y + 8.0*sin(4*i*PI/180);
  }

  gPMT1  = new TGraph(91,pmt1y,pmt1x);
  gPMT2  = new TGraph(91,pmt2y,pmt2x);
  gPMT3  = new TGraph(91,pmt3y,pmt3x);
  gPMT4 = new TGraph(91,pmt4y,pmt4x);
  
  gPMTo1 = new TGraph(91,pmto1y,pmto1x);
  gPMTo2 = new TGraph(91,pmto2y,pmto2x);
  gPMTo3 = new TGraph(91,pmto3y,pmto3x);
  gPMTo4 = new TGraph(91,pmto4y,pmto4x);

}





void Plot::PlotPmtRing() {  
  
  gPMT1->SetLineWidth(2);
  gPMT2->SetLineWidth(2);
  gPMT3->SetLineWidth(2);
  gPMT4->SetLineWidth(2);
  
  gPMTo1->SetLineWidth(2);
  gPMTo2->SetLineWidth(2);
  gPMTo3->SetLineWidth(2);
  gPMTo4->SetLineWidth(2);


  gPMT1->Draw();
  gPMT2->Draw();
  gPMT3->Draw();
  gPMT4->Draw();
  gPMTo1->Draw();
  gPMTo2->Draw();
  gPMTo3->Draw();
  gPMTo4->Draw();

}

void Plot::ClearRing() {

  delete gPMT1;
  delete gPMT2;
  delete gPMT3;
  delete gPMT4;
  delete gPMTo1;
  delete gPMTo2;
  delete gPMTo3;
  delete gPMTo4;

}



void Plot::PlotPmtRMS(TFile* file_box, TCanvas* c1) {


  c1->Clear();
  c1->cd(1);

  file_box -> cd("pmt_status_plot");

  pmtrmsplot[0]->SetMarkerColor(kBlue);
  pmtrmsplot[0]->SetMarkerStyle(20);
  pmtrmsplot[0]->SetLineColor(kBlue);

  pmtrmsplot[1]->SetMarkerColor(kRed);
  pmtrmsplot[1]->SetMarkerStyle(21);
  pmtrmsplot[1]->SetLineColor(kRed);

  pmtrmsplot[0] -> Draw("APL");
  pmtrmsplot[1] -> Draw("PLsame");

  TPaveText *pt1 = new TPaveText(0.85,.8,1,.9,"NDC");
  TText *t1 = pt1->AddText("PMT 1");
  TText *t2 = pt1->AddText("PMT 2");
  t1->SetTextColor(kBlue);
  t2->SetTextColor(kRed);
  t1->SetTextSize(.04);
  t2->SetTextSize(.04);
  pt1->SetFillColor(0);
  pt1->Draw();

  c1->Print("results_plot.ps");


  c1->Write();

  c1->cd();
  c1->Clear();

  pmtrmsplot[2]->SetMarkerColor(kBlue);
  pmtrmsplot[2]->SetMarkerStyle(20);
  pmtrmsplot[2]->SetLineColor(kBlue);

  pmtrmsplot[3]->SetMarkerColor(kRed);
  pmtrmsplot[3]->SetMarkerStyle(21);
  pmtrmsplot[3]->SetLineColor(kRed);

  pmtrmsplot[2] -> Draw("APL");
  pmtrmsplot[3] -> Draw("PLsame");

  TPaveText *pt2 = new TPaveText(0.85,.8,1,.9,"NDC");
  TText *t3 = pt2->AddText("PMT 3");
  TText *t4 = pt2->AddText("PMT 4");
  t3->SetTextColor(kBlue);
  t4->SetTextColor(kRed);
  t3->SetTextSize(.04);
  t4->SetTextSize(.04);
  pt2->SetFillColor(0);
  pt2->Draw();

  c1->Print("results_plot.ps");
  c1->Write();
  c1->cd();
  c1->Clear();


   delete pt1;
   delete pt2;
//   delete t1;
//   delete t2;
//   delete t3;
//   delete t4;
}



void Plot::GetRMS(TH2F *mirror1_planes[], TH2F *mirror2_planes[], TH2F *mirror3_planes[], TH2F *mirror4_planes[]) {

    double rms_mirror1_x[int(plane_num)];
    double rms_mirror2_x[int(plane_num)];
    double rms_mirror3_x[int(plane_num)];
    double rms_mirror4_x[int(plane_num)];
    double rms_mirror1_y[int(plane_num)];
    double rms_mirror2_y[int(plane_num)];
    double rms_mirror3_y[int(plane_num)];
    double rms_mirror4_y[int(plane_num)];
  
    double rms1, rms2, rms3, rms4;
  

    if (pmton==false) {
      for (int i = 0; i < int(plane_num) ; i++) {

		int tmp_num = i + (50- int(plane_num/2));

		rms_mirror1_x[i] = mirror1_planes[i]-> GetRMS(2);
		rms_mirror1_y[i] = mirror1_planes[i]-> GetRMS(1);

		rms_mirror2_x[i] = mirror2_planes[i]-> GetRMS(2);
		rms_mirror2_y[i] = mirror2_planes[i]-> GetRMS(1);

		rms_mirror3_x[i] = mirror3_planes[i]-> GetRMS(2);
		rms_mirror3_y[i] = mirror3_planes[i]-> GetRMS(1);

		rms_mirror4_x[i] = mirror4_planes[i]-> GetRMS(2);
		rms_mirror4_y[i] = mirror4_planes[i]-> GetRMS(1);

		rms1 = ( rms_mirror1_x[i]/cos(PMTAng1*PI/180)) * rms_mirror1_y[i] * PI;
		rms2 = ( rms_mirror2_x[i]/cos(PMTAng2*PI/180)) * rms_mirror2_y[i] * PI;
		rms3 = ( rms_mirror3_x[i]/cos(PMTAng3*PI/180)) * rms_mirror3_y[i] * PI;
		rms4 = ( rms_mirror4_x[i]/cos(PMTAng4*PI/180)) * rms_mirror4_y[i] * PI;
		
		if ( rms1 != 0 ) {
			pmtrmsplot[0] -> SetPoint( pmtrmsplot[0]->GetN(), tmp_num,  rms1);
		} 
		if ( rms2 != 0 ) {
			pmtrmsplot[1] -> SetPoint( pmtrmsplot[1]->GetN(), tmp_num,  rms2);
		}
		if ( rms3 != 0) {
			pmtrmsplot[2] -> SetPoint( pmtrmsplot[2]->GetN(), tmp_num,  rms3);
		}
		if ( rms4 != 0) {
			pmtrmsplot[3] -> SetPoint( pmtrmsplot[3]->GetN(), tmp_num,  rms4);
		}

      } 
    } else {

      for (int i = 0; i < int(count_plane.size()) ; i++) {

		int tmp_num = i + 50;
	
 		int n = i+3;

		rms_mirror1_x[n] = mirror1_planes[n]-> GetRMS(2);
		rms_mirror1_y[n] = mirror1_planes[n]-> GetRMS(1);

		rms_mirror2_x[n] = mirror2_planes[n]-> GetRMS(2);
		rms_mirror2_y[n] = mirror2_planes[n]-> GetRMS(1);

		rms_mirror3_x[n] = mirror3_planes[n]-> GetRMS(2);
		rms_mirror3_y[n] = mirror3_planes[n]-> GetRMS(1);

		rms_mirror4_x[n] = mirror4_planes[n]-> GetRMS(2);
		rms_mirror4_y[n] = mirror4_planes[n]-> GetRMS(1);

		rms1 = ( rms_mirror1_x[n]/cos(PMTAng1*PI/180)) * rms_mirror1_y[n] * PI;
		rms2 = ( rms_mirror2_x[n]/cos(PMTAng2*PI/180)) * rms_mirror2_y[n] * PI;
		rms3 = ( rms_mirror3_x[n]/cos(PMTAng3*PI/180)) * rms_mirror3_y[n] * PI;
		rms4 = ( rms_mirror4_x[n]/cos(PMTAng4*PI/180)) * rms_mirror4_y[n] * PI;

		//cout << rms4 << endl;
		
		if ( rms1 != 0 ) {
			pmtrmsplot[0] -> SetPoint( pmtrmsplot[0]->GetN(), tmp_num,  rms1);
		} 
		if ( rms2 != 0 ) {
			pmtrmsplot[1] -> SetPoint( pmtrmsplot[1]->GetN(), tmp_num,  rms2);
		}
		if ( rms3 != 0) {
			pmtrmsplot[2] -> SetPoint( pmtrmsplot[2]->GetN(), tmp_num,  rms3);
		}
		if ( rms4 != 0) {
			pmtrmsplot[3] -> SetPoint( pmtrmsplot[3]->GetN(), tmp_num,  rms4);
		}

      } 

  }

}


void Plot::CountPlane () {

  TTree *hit_tree  = read.GetHitData();
  hit_tree -> SetBranchAddress("hit_branch", &hit_data); 

  for (unsigned int i =0; i < 50; i++) {

 	hit_tree -> GetEntry(i);

	if ( i< 50 && hit_data.plane!=99) {
		if (i<3) {
		  count_plane.push_back(hit_data.plane);
		}
	
        plane_itt = find(count_plane.begin(), count_plane.end(), hit_data.plane);

		if (plane_itt == count_plane.end()) {
		  count_plane.push_back(hit_data.plane);
		}
	}
  }

  //cout << count_plane.size()%2 << endl << endl;

  if (count_plane.size()%2 ==0 ) {
	plane_num = count_plane.size() *2 - 1;
  } else {
	plane_num = count_plane.size();
	pmton=false;

	//cout << "sdasdfsa " << endl;
  };

  //cout << pmton << endl;

}


void Plot::PlotPhotonEnergy(TFile* file_box, TCanvas* c1) {

  photonenergy->SetLineColor(kBlue);
  //photonenergy->SetFillColor(kBlue); // Hits will be colored with blue
  photonenergy->SetLineWidth(2); // Hits will be colored with blue

  photonenergy->GetXaxis()->SetTitle("Photon Energy (eV)");
  photonenergy->GetYaxis()->SetTitle("Counts");
  photonenergy->GetXaxis()->CenterTitle();
  photonenergy->GetYaxis()->CenterTitle();
  photonenergy->GetYaxis()->SetTitleOffset(1.60);

  c1->cd();
  file_box -> cd("efficiency_plot");

  photonenergy->Draw("HIST");

  c1->Update();
  c1->Print("results_plot.ps");
  photonenergy->Write();
  c1->Clear();

}


