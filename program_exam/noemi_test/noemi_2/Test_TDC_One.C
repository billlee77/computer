#include <inttypes.h>
#include <iostream>
#include <fstream>
#include <utility>
#include <vector>
#include <map>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <cstring>
#include <sstream>

#include "TLatex.h"
#include "TPaveStats.h"
#include "TGraphPainter.h"
#include "TString.h"
#include "TCollection.h"
#include "TCanvas.h"
#include "TFile.h"
#include "TH1F.h"
#include "TF1.h"
#include "TGraph.h"
#include "TGraphErrors.h"
#include "TMinuit.h"
#include "TKey.h"
#include "TDatime.h"
#include "TAxis.h"
#include "TLine.h"
#include "TTree.h"
#include "TBranch.h"
#include "TStyle.h"
#include "TH2F.h"
#include "TROOT.h"
class ChannelData {
	public:
	ChannelData(){;}
	ChannelData(uint32_t Crate, uint32_t Slot, uint32_t Channel, Int_t Logical, uint32_t Time){
	crate=Crate;slot=Slot;channel=Channel;logical=Logical;time=Time;
	}
	~ChannelData(){;}
	uint32_t crate, slot, channel, module, logical, time;
	int SiPM;
};

//---------------------------
//---EVENT class definition
//---------------------------
class Event {
	public:
	Event(){;}
	Event(int HVBias, int Column, int Eventnumber, int Time){
		HVbias=HVBias;column=Column;eventnumber=Eventnumber;time=Time;
	}
	~Event(){
		for (unsigned int i = 0 ; i < channelDataVector.size(); i++){
			delete channelDataVector[i];
		}	
	}

//----AddChannelData starts here-----
void AddChannelData(uint32_t Crate, uint32_t Slot, uint32_t Channel, uint32_t module, Int_t Logical, uint32_t Time){
	ChannelData* ChanDataInfo = new ChannelData(Crate, Slot, Channel, Logical, Time);
	ChanDataInfo->module=module; 
	channelDataVector.push_back(ChanDataInfo);
	int SiPM=0;
// ** Translation table for TDCs ** //
// There are 9 slots in a crate; there are repeating patterns for every third slot
// Slot%3==0 corresponds to slots 3,6,9
// Slot%3==1 && Slot!=13 corresponds to slots 4,7,10
// Slot==5||Slot==8||Slot==13) corresponds to slots 5,8,13
if (HVbias ==1){
    if (column==1){ // SiPM 1,9, Not 25 (too high) -> Channel 0,4 for every module
       	if (Channel%12==0 && Slot%3==0) SiPM = 1; // Channel 0
       	if (Channel%12==4 && Slot%3==0) SiPM = 9; // Channel 4
    	if (Channel%12==4 && Slot%3==1 && Slot!=13) SiPM = 1; // Channel 0
    	if (Channel%12==8 && Slot%3==1 && Slot!=13) SiPM = 9; // Channel 4
    	if (Channel%12==8 && (Slot==5||Slot==8||Slot==13)) SiPM = 1; //Channel 0
    	if (Channel%12==0 && (Slot==5||Slot==8||Slot==13)) SiPM = 9; //Channel 4
  	}
  	if (column==2){
    	if (Channel%12==1 && Slot%3==0) SiPM = 2; //Channel 1
    	if (Channel%12==5 && Slot%3==0) SiPM = 10; // Channel 5
    	if (Channel%12==5 && Slot%3==1 && Slot!=13) SiPM = 2;
    	if (Channel%12==9 && Slot%3==1 && Slot!=13) SiPM = 10;
    	if (Channel%12==9 && (Slot==5||Slot==8||Slot==13)) SiPM = 2;
    	if (Channel%12==1 && (Slot==5||Slot==8||Slot==13)) SiPM = 10;
  	}
  	if (column==3){
    	if (Channel%12==6 && Slot%3==0) SiPM = 11;
    	if (Channel%12==10 && Slot%3==1 && Slot!=13) SiPM = 11;
    	if (Channel%12==2 && (Slot==5||Slot==8||Slot==13)) SiPM = 11;
  	}
  	if (column==4){
    	if (Channel%12==7 && Slot%3==0) SiPM = 12;
    	if (Channel%12==11 && Slot%3==1 && Slot!=13) SiPM = 12;
    	if (Channel%12==3 && (Slot==5||Slot==8||Slot==13)) SiPM = 12;
  	}
 }
else if (HVbias == 2){
  if (column==1){
	  if (Channel%12==8 && Slot%3==0) SiPM = 13; // Channel 8
	  if (Channel%12==0 && Slot%3==1 && Slot!=13) SiPM = 13;
      if (Channel%12==4 && (Slot==5||Slot==8||Slot==13)) SiPM = 13;
  }
  if (column==2){
    if (Channel%12==9 && Slot%3==0) SiPM = 14;
    if (Channel%12==1 && Slot%3==1 && Slot!=13) SiPM = 14;
    if (Channel%12==5 && (Slot==5||Slot==8||Slot==13)) SiPM = 14;
  }
  if (column==3){
    if (Channel%12==2 && Slot%3==0) SiPM = 3;
    if (Channel%12==10 && Slot%3==0) SiPM = 15;
    if (Channel%12==6 && Slot%3==1 && Slot!=13) SiPM = 3;
    if (Channel%12==2 && Slot%3==1 && Slot!=13) SiPM = 15;
    if (Channel%12==10 && (Slot==5||Slot==8||Slot==13)) SiPM = 3;
    if (Channel%12==6 && (Slot==5||Slot==8||Slot==13)) SiPM = 15;
  }
 if (column==4){
    if (Channel%12==3 && Slot%3==0) SiPM = 4;
    if (Channel%12==11 && Slot%3==0) SiPM = 16;
    if (Channel%12==7 && Slot%3==1 && Slot!=13) SiPM = 4;
    if (Channel%12==3 && Slot%3==1 && Slot!=13) SiPM = 16;
    if (Channel%12==11 && (Slot==5||Slot==8||Slot==13)) SiPM = 4;
    if (Channel%12==7 && (Slot==5||Slot==8||Slot==13)) SiPM = 16;
  }
 }
else if (HVbias == 3){
  if (column==1){
	if (Channel%12==4 && Slot%3==0) SiPM = 5;
	if (Channel%12==8 && Slot%3==0) SiPM = 17;
  	if (Channel%12==8 && Slot%3==1 && Slot!=13) SiPM = 5;
	if (Channel%12==0 && Slot%3==1 && Slot!=13) SiPM = 17;
	if (Channel%12==0 && (Slot==5||Slot==8||Slot==13)) SiPM = 5;
	if (Channel%12==4 && (Slot==5||Slot==8||Slot==13)) SiPM = 17;
  }
    if (column==2){
    if (Channel%12==5 && Slot%3==0) SiPM = 6;
    if (Channel%12==9 && Slot%3==0) SiPM = 18;
    if (Channel%12==9 && Slot%3==1 && Slot!=13) SiPM = 6;
    if (Channel%12==1 && Slot%3==1 && Slot!=13) SiPM = 18;
    if (Channel%12==1 && (Slot==5||Slot==8||Slot==13)) SiPM = 6;
    if (Channel%12==5 && (Slot==5||Slot==8||Slot==13)) SiPM = 18;

    }
    if (column==3){
    if (Channel%12==10 && Slot%3==0) SiPM = 19;
    if (Channel%12==2 && Slot%3==1 && Slot!=13) SiPM = 19;
    if (Channel%12==6 && (Slot==5||Slot==8||Slot==13)) SiPM = 19;
    }
    if (column==4){
    if (Channel%12==11 && Slot%3==0) SiPM = 20;
    if (Channel%12==3 && Slot%3==1 && Slot!=13) SiPM = 20;
    if (Channel%12==7 && (Slot==5||Slot==8||Slot==13)) SiPM = 20;
    }
   }
else if (HVbias == 4){
  if (column==1){
    if (Channel%12==8 && Slot%3==0) SiPM = 21;
    if (Channel%12==0 && Slot%3==1 && Slot!=13) SiPM = 21;
    if (Channel%12==4 && (Slot==5||Slot==8||Slot==13)) SiPM = 21;
  }
  if (column==2){
    if (Channel%12==9 && Slot%3==0) SiPM = 22;
    if (Channel%12==1 && Slot%3==1 && Slot!=13) SiPM = 22;
    if (Channel%12==5 && (Slot==5||Slot==8||Slot==13)) SiPM = 22;
  }
  if (column==3){
    if (Channel%12==6 && Slot%3==0) SiPM = 7;
    if (Channel%12==10 && Slot%3==0) SiPM = 23;
    if (Channel%12==10 && Slot%3==1 && Slot!=13) SiPM = 7;
    if (Channel%12==2 && Slot%3==1 && Slot!=13) SiPM = 23;
    if (Channel%12==2 && (Slot==5||Slot==8||Slot==13)) SiPM = 7;
    if (Channel%12==6 && (Slot==5||Slot==8||Slot==13)) SiPM = 23;
  }
  if (column==4){
    if (Channel%12==7 && Slot%3==0) SiPM = 8;
    if (Channel%12==11 && Slot%3==0) SiPM = 24;
    if (Channel%12==11 && Slot%3==1 && Slot!=13) SiPM = 8;
    if (Channel%12==3 && Slot%3==1 && Slot!=13) SiPM = 24;
    if (Channel%12==3 && (Slot==5||Slot==8||Slot==13)) SiPM = 8;
    if (Channel%12==7 && (Slot==5||Slot==8||Slot==13)) SiPM = 24;
  }
 }
	else{SiPM=0;}
	ChanDataInfo->SiPM = SiPM;
		}
//-------- end of AddChannelData()--------

	int HVbias, column, eventnumber, time;
	vector<ChannelData*> channelDataVector;
};
map < int, Event*> EventMap;

//-------------------------------------
//---FUNCTION starts here
//-------------------------------------
void Test_TDC_One(TString filename = "0", Double_t threshold =10, Int_t starteventnum=0) {
	gROOT->Reset();

	if (filename == "0") {
	printf("\nUseage:\n\n\t.x dump_tree_waveform_dalton.C+(TString filename, Double_t threshold = 20, Bool_t subtractpedestal=1, Int_t starteventnum=0)\n\n");
    return;
	}
    // Bool_t subtractpedestal=1;
    // gStyle->SetPalette(1,0);
    // gStyle->SetOptStat(kTRUE);
    // gStyle->SetOptFit(kTRUE);
    // gStyle->SetOptStat(111111);
    // gStyle->SetOptStat(kFALSE);
    TString fname = filename;//taking out .root extension of file
    fname.Remove(18,33);
cout << "filename is  :" << filename << "fname is  :" << fname << endl;

//Read input file generated by DAQ and converted to ROOT using DAQTree plugin
    TFile* f = new TFile(filename.Data());   // cosmic run
    TTree* tr = (TTree*)f->Get("BCALTDCdigi");//reads the tree
//--global channel numbers    
    UInt_t          channelnum;
  	UInt_t          eventnum;
   	UInt_t          rocid;
   	UInt_t          slot;
   	UInt_t          channel;
   	UInt_t          itrigger;
  	UInt_t					time;
   	UInt_t          module;
   	UInt_t          layer;
   	UInt_t          sector;
   	UInt_t          end;
		tr->SetBranchAddress("channelnum", &channelnum);
    tr->SetBranchAddress("eventnum", &eventnum);
   	tr->SetBranchAddress("rocid", &rocid);
   	tr->SetBranchAddress("slot", &slot);
   	tr->SetBranchAddress("channel", &channel);
   	tr->SetBranchAddress("itrigger", &itrigger);
   	tr->SetBranchAddress("time", &time); 
   	tr->SetBranchAddress("module", &module);
   	tr->SetBranchAddress("layer", &layer);
   	tr->SetBranchAddress("sector", &sector);
   	tr->SetBranchAddress("end", &end);
  
//--Entries over events
    Int_t maxevents = 10000*40;
    Bool_t subtractpedestal=1;
    Int_t numPedestalSamps=5;
    const int _samp=100;
    char histName[255];
    TH1F* histPulse[16];
    Double_t pedestal[16];
    Double_t pulse[16];
    Double_t globalmax=0;
    Int_t min[16];
    Int_t max[16];
    Int_t integ[16];
    int step = 0;
    int quadrant = 1;

    Int_t nsize = (Int_t) tr->GetEntries();
    tr->GetEntry(nsize-1);
    double lasteventnum = eventnum;
    int nScan =ceil((lasteventnum-2.0)/32.0); // number of Scans over the 322 eventnum on file (n=1, or n=10)
    if (nsize < maxevents) maxevents = nsize;
    printf ("\nNumber of events to process=%d\n\n",maxevents);

//----------------------------------------------------------------------------
//-------Loop Over Events in tree (starteventnum is 0, eventnum is 322)
//----------------------------------------------------------------------------
    for (Int_t entry=starteventnum; entry<maxevents; entry++){
    tr->GetEntry(entry);
    Int_t logical=0;
       if (time != 0) logical = 1;
       if (time == 0) logical = 0;

		int column = 0, HVbias = 0;
		if ((eventnum-(step+(quadrant-1)*16)*nScan - 3) == 0) step++; //gives a HVbias and column so you can relate it to SiPM
		if (step == 17){
                   quadrant++;
                   step = 1;
              			 }
		if((step%4) != 0) column = step%4;
		//if((step%4)=0)column=1;
		//if((step%4)=1)column=2; 
		//if((step%4)=2)column=3;
		//if((step%4)=3)column=4;
			else column = 4;
			HVbias = (step-1)/4+1;
//cout << "eventnum = " << eventnum << " entry = " << entry << " step = " << step << " quadrant = " << quadrant << " column  = " << column << " HVBias = " << HVbias <<"  time= " << time << endl;
// cout << " entry%16= " << entry%16 << " slot=" << slot << " channel=" << channel << " pulse=" << pulse[channel] << " logical=" << logical << "  time???= "<< time << endl;
		
		if (logical==1){
		if (EventMap[eventnum]==NULL){
		  EventMap[eventnum] = new Event(HVbias,column,eventnum,time); // HVbias and column make a SiPM # for the event, time added
		  EventMap[eventnum]->AddChannelData(rocid, slot, channel, module, logical, time);
		}
		else{
			EventMap[eventnum]->AddChannelData(rocid, slot, channel,module, logical, time);//time added
		}
		
		if (EventMap[eventnum]->channelDataVector.back()->SiPM ==0 && module==10 && rocid==33 ){
//cout << " eventnum = " << eventnum << " entry= " << entry << " column = " << column << " HVbias = " << HVbias << " crate = " << rocid << " slot=" << slot << " channel= " << channel << " module = " << module << " layer= "<< layer << " sector= "<< sector <<" time = " << time << " logical = " << logical << " SiPM = " << EventMap[eventnum]->channelDataVector.back()->SiPM << endl;
		    }
	}
  } 
//--------------------------------------------------------------
//--------------- End Loop Over Tree
//--------------------------------------------------------------
  Int_t nModules = 48, nSiPM = 25;
  TH2F *oneEventHistUpstream = new TH2F("oneEvUp","One Event-Up",nModules+1, -0.5, (Double_t) nModules+0.5, nSiPM+1, -0.5,(Double_t) nSiPM+0.5);
  TH2F *oneEventHistDownstream = new TH2F("oneEvDown","One Event-Down",nModules+1, -0.5, (Double_t) nModules+0.5, nSiPM+1, -0.5,(Double_t) nSiPM+0.5);
  TH2F *allEventHistUpstream = new TH2F("allEvsUp","Upstream "+filename ,nModules+1, -0.5, (Double_t) nModules+0.5, nSiPM+1, -0.5, (Double_t) nSiPM+0.5);
  TH2F *allEventHistDownstream = new TH2F("allEvsDown", "Downstream "+filename ,nModules+1, -0.5, (Double_t) nModules+0.5, nSiPM+1, -0.5, (Double_t) nSiPM+0.5);
//---- time for two events on a SiPM??--------------------------
  TH2F *twoEventDeltaTimeU = new TH2F("DeltaTimeUp","twoEventDT Up",time+1, -0.5, 65000, nSiPM+1,-0.5, (Double_t) nSiPM+0.5);
  TH2F *twoEventDeltaTimeD = new TH2F("DeltaTimeDown","twoEventDT Down",time+1, -0.5,65000 , nSiPM+1,-0.5, (Double_t) nSiPM+0.5);
  TH2F *allEventDeltaTimeU = new TH2F("allDeltaTimeUp","allEventDT Up",time+1,0,(Double_t) time+0.5,nSiPM+1, -0.5, (Double_t) nSiPM+0.5);
  TH2F *allEventDeltaTimeD = new TH2F("allDeltaTimeDown","allEventDT Down",time+1,0,(Double_t) time+0.5,nSiPM+1, -0.5, (Double_t) nSiPM+0.5);

  //vector<TH2F *>  oneEventHists;
  allEventHistUpstream->SetMaximum(2*nScan); 
  allEventHistDownstream->SetMaximum(2*nScan);
	allEventDeltaTimeU->SetMaximum(12000);
	allEventDeltaTimeD->SetMaximum(12000);
  TCanvas * c2 = new TCanvas("c2","c2",400,400);
  c2->Divide(2,1);
  TCanvas * c3 = new TCanvas("c3","c3",400,400);
  c3->Divide(2,1);
	
	
  //0-7 upstream
  map < Int_t , Event* >::const_iterator iter;
  bool drawFlag = true;
  Int_t logical_prev = 0;
	uint32_t thisModuleu_prev = 0;
	uint32_t SiPMu_prev = 0;
	uint32_t thisModuled_prev = 0;
	uint32_t SiPMd_prev = 0;

	for(iter = EventMap.begin(); iter != EventMap.end(); iter++){
        oneEventHistUpstream->Reset();
        oneEventHistDownstream->Reset();
				twoEventDeltaTimeU->Reset();
				twoEventDeltaTimeD->Reset();
        Event * thisEvent = (*iter).second;
        Int_t thisEventNumber = (*iter).first;
        vector<ChannelData*> channelData = thisEvent->channelDataVector;//channelData.size() is the # of entries in a channel
     		//------loop over the entries on each channel----------------------------------------- 
				for (int i=0; i < (int) channelData.size(); i++){ 
	    			ChannelData *thisChannelData = channelData[i]; //"thisChannel" is the channel for that entry, and so on
						
						uint32_t thisChannel = thisChannelData->channel;
						uint32_t thisModule = thisChannelData->module;
						uint32_t SiPM = thisChannelData->SiPM;
						uint32_t thisTime = thisChannelData->time;//added
						Int_t logical = thisChannelData->logical;
						uint32_t thisCrate = thisChannelData->crate; 
		
						//CRATES 36 AND 39 ARE UPSTREAM
	    			if(thisCrate == 36 || thisCrate == 39){ 
			 					if(SiPM != SiPMu_prev || thisModuleu_prev != thisModule) {
								oneEventHistUpstream->Fill(thisModule, SiPM, logical);
								allEventHistUpstream->Fill(thisModule, SiPM, logical);
								twoEventDeltaTimeU->Fill(thisTime, SiPM, logical);
								allEventDeltaTimeU->Fill(thisTime, SiPM, logical);
								SiPMu_prev = SiPM;
								thisModuleu_prev = thisModule;
			 					}
						}
						
						//CRATES 33 AND 42 ARE DOWNSTREAM //else if (thisChannel <=15){If rocid==36??
						else if (thisCrate == 33 || thisCrate == 42){
								if(SiPM != SiPMd_prev || thisModuled_prev != thisModule) {
								oneEventHistDownstream->Fill(thisModule, SiPM, logical);
								allEventHistDownstream->Fill(thisModule, SiPM, logical);
								twoEventDeltaTimeD->Fill(thisTime, SiPM, logical);
								allEventDeltaTimeD->Fill(thisTime, SiPM, logical);
								SiPMd_prev = SiPM;
								thisModuled_prev = thisModule;
			 					}
						}
     		}
	
	string input;

	
	if(drawFlag){
    cout << "Drawing event # " << thisEventNumber << " Press enter to continue, e to skip to end" <<endl;
    c2->cd(1);
		gStyle->SetOptStat(kFALSE);
    oneEventHistUpstream->Draw("colz");
    oneEventHistUpstream->Draw("box same");
		c2->cd(1)->SetGrid();
		c3->cd(1);
		//gStyle->SetOptStat(kTRUE);
		twoEventDeltaTimeU->Draw("colz");
		twoEventDeltaTimeU->Draw("box same");
		c3->Update();

    c2->cd(2);
		gStyle->SetOptStat(kFALSE);
    oneEventHistDownstream->Draw("colz");
		oneEventHistDownstream->Draw("box same");
		c2->cd(2)->SetGrid();
    c2->Update();

		c3->cd(2);
		//gStyle->SetOptStat(kTRUE);
		twoEventDeltaTimeD->Draw("colz");
		twoEventDeltaTimeD->Draw("box same");
    c3->Update();

    getline(cin, input);
		/* before
		c2->cd(1);
		gStyle->SetOptStat(kFALSE);
    oneEventHistUpstream->Draw("colz");
    oneEventHistUpstream->Draw("box same");
		c2->cd(1)->SetGrid();
    c2->cd(2);
    oneEventHistDownstream->Draw("colz");
		oneEventHistDownstream->Draw("box same");
		c2->cd(2)->SetGrid();
    c2->Update();
    getline(cin, input);
		*/
	}
	if(input =="e") drawFlag = false;
	if(input =="q") return;
    }
   
//------------------------------------------------------------
//---- Drawing the plots
//----------------------------------------------------------- 
  TCanvas * c1 = new TCanvas("c1","c1",400,400);
	TCanvas * c4 = new TCanvas("c4","c4",300,300);
  c1->Divide(2,1);    
  c1->cd(1);
  gStyle->SetOptStat(kFALSE);
  allEventHistUpstream->Draw("colz");
  allEventHistUpstream->Draw("box same");
  allEventHistUpstream->GetXaxis()->SetTitle("Module Number");
  allEventHistUpstream->GetYaxis()->SetTitle("SiPM Number");
  c1->cd(1)->SetGridx(1);
  c1->cd(1)->SetGridy(1);
  c1->cd(2);
  allEventHistDownstream->Draw("colz");
  allEventHistDownstream->Draw("box same");
  allEventHistDownstream->GetXaxis()->SetTitle("Module Number");
  allEventHistDownstream->GetYaxis()->SetTitle("SiPM Number");
  c1->cd(2)->SetGrid();
	c1->SaveAs("plots/"+ fname + "TDC.pdf");
//----------------------------------------------------------
	c4->Divide(2,1);
  c4->cd(1);
	twoEventDeltaTimeU->SetMarkerStyle(5);
	twoEventDeltaTimeU->SetMarkerColor(2);
	gStyle->SetOptStat(kTRUE);
	gStyle->SetTitleOffset(1.2,"Y");
  allEventDeltaTimeU->Draw("colz");
	allEventDeltaTimeU->GetXaxis()->SetTitle("time");
	allEventDeltaTimeU->GetYaxis()->SetTitle("SiPM Number U");
  c4->cd(1)->SetGridx(1);
	c4->cd(1)->SetGridy(1);
  
	c4->cd(2);
  allEventDeltaTimeD->Draw("colz");//box same
	allEventDeltaTimeD->GetXaxis()->SetTitle("time");
	allEventDeltaTimeD->GetYaxis()->SetTitle("SiPM Number D");
  c4->cd(2)->SetGrid();
	/*c4->cd(2);
	allEventDeltaTime->SetMarkerStyle(5);
	allEventDeltaTime->SetMarkerColor(2);
  allEventDeltaTime->Draw();//box same
	allEventDeltaTime->GetXaxis()->SetTitle("time");
	allEventDeltaTime->GetYaxis()->SetTitle("Number of All Events");
  c4->cd(2)->SetGridx();*/
//c4->SaveAs("plots/"+ fname + "TDC_DT.pdf");


}



