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

class ChannelData {
	public:
	ChannelData(){;}
	ChannelData(uint32_t Crate, uint32_t Slot, uint32_t Channel, Int_t Logical){
	crate=Crate;slot=Slot;channel=Channel;logical=Logical;
	}
	~ChannelData(){;}
	uint32_t crate, slot, channel, module, logical;
	int SiPM;
};
class Event {
	public:
	Event(){;}
	Event(int HVBias, int Column, int Eventnumber){
		HVbias=HVBias;column=Column;eventnumber=Eventnumber;
	}
	~Event(){
		for (unsigned int i = 0 ; i < channelDataVector.size(); i++){
			delete channelDataVector[i];
		}	
	}
	void AddChannelData(uint32_t Crate, uint32_t Slot, uint32_t Channel, uint32_t module, Int_t Logical){
		ChannelData* ChanDataInfo = new ChannelData(Crate, Slot, Channel, Logical);
       		 ChanDataInfo->module=module;
		channelDataVector.push_back(ChanDataInfo);
		int SiPM=0;
		//translation table for Upstream 
		if (HVbias== 1){
			if (column==4){
				if(Slot%2==1){
					if (Channel==7) SiPM=12;
					if (Channel==15) SiPM=12;
				}
				if(Slot%2==0){
					if(Channel==7) SiPM=28;
					if (Channel==15) SiPM=28;
				}
			}
			if (column==3){ 
				if(Slot%2==1){
					if (Channel==6) SiPM=11;
					if (Channel== 14) SiPM=11;
				}
				if(Slot%2==0){
					if(Channel==6) SiPM=27;
					if (Channel==14) SiPM=27;
				}
			}
			if (column==2){
				if(Slot%2==1){
					if(Channel==1) SiPM=2;
					if(Channel==9) SiPM=2;
					if(Channel==5) SiPM=10;
					if(Channel==13) SiPM=10;
				}
				if (Slot%2==0){
					if(Channel==5) SiPM=26;
					if(Channel==13) SiPM=26;
				}
			}
			if (column==1){
				if (Slot%2==1){
					if(Channel==0) SiPM=1;
					if(Channel==8) SiPM=1;
					if(Channel==4) SiPM=9;
					if(Channel==12) SiPM=9;
				}
				if (Slot%2==0){
					if(Channel==4) SiPM=25;
					if(Channel==12) SiPM=25;
				}
			}
		}
		else if(HVbias==2){
			if (column==4){
				if(Slot%2==1){
					if (Channel==3) SiPM=4;
					if (Channel==11) SiPM=4;
				}
				if(Slot%2==0){
					if (Channel==3) SiPM=16;
					if (Channel==11) SiPM=16;
					if (Channel==7) SiPM=32;
					if (Channel==15) SiPM=32;
				}
			}
			if (column==3){ 
				if(Slot%2==1){
					if (Channel==2) SiPM=3;
					if (Channel ==10) SiPM=3;
				}
				if(Slot%2==0){
					if (Channel==2) SiPM=15;
					if (Channel==10) SiPM=15;
					if (Channel==6) SiPM=31;
					if (Channel==14) SiPM=31;
				}
			}
			if (column==2){
				if(Slot%2==1) SiPM=0;
				if(Slot%2==0){
					if(Channel==1) SiPM=14;
					if(Channel==9) SiPM=14;
					if(Channel==5) SiPM=30;
					if(Channel==13) SiPM=30;
				}
			}
			if (column==1){
				if(Slot%2==1) SiPM=0;
				if(Slot%2==0){
					if(Channel==0) SiPM=13;
					if(Channel==8) SiPM=13;
					if(Channel==4) SiPM=29;
					if(Channel==12) SiPM=29;
				}	
			}
		}
		else if (HVbias==3){
			if (column==4){
				if(Slot%2==1)SiPM=0;
				if(Slot%2==0){
					if (Channel==3) SiPM=20;
					if (Channel==11) SiPM=20;
					if (Channel==7) SiPM=36;
					if (Channel==15) SiPM=36;

				}
			}
			if (column==3){
				if(Slot%2==1)SiPM=0;
				if(Slot%2==0){ 
					if (Channel==2) SiPM=19;
					if (Channel==10) SiPM=19;
					if (Channel==6) SiPM=35;
					if (Channel==14) SiPM=35;
				}
			}
			if (column==2){
				if(Slot%2==1){
					if(Channel==5) SiPM=6;
					if(Channel==13) SiPM=6;
				}
				if(Slot%2==0){
					if(Channel==1) SiPM=18;
					if(Channel==9) SiPM=18;
					if(Channel==5) SiPM=34;
					if(Channel==13) SiPM=34;
				}
			}
			if (column==1){
				if(Slot%2==1){
					if(Channel==4) SiPM=5;
					if(Channel==12) SiPM=5;
				}
				if(Slot%2==0){
					if(Channel==0) SiPM=17;
					if(Channel==8) SiPM=17;
					if(Channel== 4) SiPM=33;
					if(Channel==12) SiPM=33;
				}
			}
		}
		else if(HVbias==4){
			if (column==4){
				if(Slot%2==1){
					if (Channel==7) SiPM=8;
					if (Channel==15) SiPM=8;
				}
				if(Slot%2==0){
					if (Channel==3) SiPM=24;
					if (Channel==11) SiPM=24;
					if (Channel==7) SiPM=40;
					if (Channel==15) SiPM=40;
				}
			}
			if (column==3){
				if(Slot%2==1){ 
					if (Channel==6) SiPM=7;
					if (Channel==14) SiPM=7;
				}
				if(Slot%2==0){
					if (Channel==2) SiPM=23;
					if (Channel==10) SiPM=23;
					if (Channel==6) SiPM=39;
					if (Channel==14) SiPM=39;
				}
			}
			if (column==2){
				if(Slot%2==1) SiPM=0;
				if(Slot%2==0){
					if(Channel==1) SiPM=22;
					if(Channel==9) SiPM=22;
					if(Channel==5) SiPM=38;
					if(Channel==13) SiPM=38;
				}
			}
			if (column==1){
				if(Slot%2==1) SiPM=0;
				if(Slot%2==0){
					if(Channel==0) SiPM=21;
					if(Channel==8) SiPM=21;
					if(Channel==4) SiPM=37;
					if(Channel==12) SiPM=37;
				}
			}
		}			
		else{
			SiPM=0;
		}    
		ChanDataInfo->SiPM = SiPM;
	}
	
	int HVbias, column, eventnumber;
	vector<ChannelData*> channelDataVector;
	
};


map < int, Event*> EventMap;

void SiPM_Tester(TString filename = "0", Double_t threshold =20, Int_t starteventnum=0) {

	if (filename == "0") {
		printf("\nUseage:\n\n\t.x dump_tree_waveform_dalton.C+(TString filename, Double_t threshold = 20, Bool_t subtractpedestal=1, Int_t starteventnum=0)\n\n");
		return;
	}

    // Constants for analysis
    //Int_t numPedestalSamps = 5;
    //Int_t numChannelsPage = 16;
    
    // Bool_t subtractpedestal=1;

 //   gStyle->SetPalette(1,0);
    // gStyle->SetOptStat(kTRUE);
    gStyle->SetOptStat(kFALSE);
    // gStyle->SetOptFit(kTRUE);
   // gStyle->SetOptFit(kFALSE);
    // gStyle->SetOptFit(11111);
    // gStyle->SetOptStat(111111);
   // gStyle->SetPadRightMargin(0.05);
    //gStyle->SetPadLeftMargin(0.17);
    //gStyle->SetPadBottomMargin(0.15);
    //gStyle->SetFillColor(0);
    //gStyle->SetTitleOffset(1.2, "Y");
  

    //char fname[132];

    // Read input file generated by DAQ and converted to ROOT using DAQTree plugin
    TFile* f = new TFile(filename.Data());   // cosmic run
    //TTree* tr2 = (TTree*)f->Get("DBCALDigiHit");
    TTree* tr = (TTree*)f->Get("BCALdigi");
    //TTree* tr2 = NULL;
	//tr2=(TTree*)f->Get("DBCALDigiHit");
	//if(tr2 == NULL) {cout << "Problem loading second tree" << endl; return;}
	cout << "tree loaded " << endl;

	
    TFile* kissy_kissy = new TFile("Kissy_kissy_file.root", "RECREATE");  

    
 // uint32_t channelnum;         /// Arbitrary global channel number
 
   // Declaration of leaf types
   UInt_t          channelnum;
   UInt_t          eventnum;
   UInt_t          rocid;
   UInt_t          slot;
   UInt_t          channel;
   UInt_t          itrigger;
   vector<uint32_t> *waveform=0;
   UInt_t          nsamples;
   UInt_t          w_integral;
   UInt_t          w_min;
   UInt_t          w_max;
   UInt_t          w_samp1;
   UInt_t          module;
   UInt_t          layer;
   UInt_t          sector;
   UInt_t          end;

cout << "initialization complete" << endl;

   tr->SetBranchAddress("channelnum", &channelnum);
   tr->SetBranchAddress("eventnum", &eventnum);
   tr->SetBranchAddress("rocid", &rocid);
   tr->SetBranchAddress("slot", &slot);
   tr->SetBranchAddress("channel", &channel);
   tr->SetBranchAddress("itrigger", &itrigger);
   tr->SetBranchAddress("waveform", &waveform);
   tr->SetBranchAddress("nsamples", &nsamples);
   tr->SetBranchAddress("w_integral", &w_integral);
   tr->SetBranchAddress("w_min", &w_min);
   tr->SetBranchAddress("w_max", &w_max);
   tr->SetBranchAddress("w_samp1", &w_samp1);
   tr->SetBranchAddress("module", &module);
   tr->SetBranchAddress("layer", &layer);
   tr->SetBranchAddress("sector", &sector);
   tr->SetBranchAddress("end", &end);
 
cout << "branch addresses set" << endl;

 // tr->SetBranchStatus("waveform",0);
  
//cout << " end banished " << endl;

    // Entries over events
    Int_t maxevents = 10000*40;

  //  Int_t slot_select=8;
   // Int_t crate_select=11;
    // Int_t crate = 11;
    // get tree
   //tr->GetEntry(0) ;
   //tr2->GetEntry(0);
   //

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



   // define histos
    for (int jchannel=0; jchannel<16; jchannel++) {
        //sprintf(histName,"Crate %02i Slot %02i Channel %02i",crate_select,slot_select,jchannel);
        sprintf(histName,"Channel %02i",jchannel);
        histPulse[jchannel] = new TH1F(histName,histName,_samp,0,_samp);
    }

cout << " histos defined" << endl;


  //  tr->GetEntry(0);

    Int_t nsize = (Int_t) tr->GetEntries();
    tr->GetEntry(nsize-1);
    double lasteventnum = eventnum;
    int nScan =ceil((lasteventnum-2.0)/32.0);
    //int nScan = 10;
    cout << " number of scans = " << nScan << endl;
  //  Int_t nsize2 = (Int_t) tr2->GetEntries();
    if (nsize < maxevents) maxevents = nsize;
    //if (nsize != nsize2 ) cout << "different num of entries " << endl;
    

    printf ("\nNumber of events to process=%d\n\n",maxevents);

    // ************
    // Loop Over Events in tree
    for (Int_t entry=starteventnum; entry<maxevents; entry++){
       // tr2->GetEntry(entry);
	tr->GetEntry(entry);
      //  if (N!=N2) cout << " N not ewual to N2" << endl;
  
//cout << " tr got entries" << endl;
     
	pedestal[channel]=0;
	pulse[channel]=0;

        for (Int_t jj=0; jj<numPedestalSamps; jj++){
            // Get adc value for first five samples;
            int adc_value = (*waveform)[jj];
            pedestal[channel] += adc_value;
        }
        pedestal[channel] = pedestal[channel]/numPedestalSamps;
        // cout << "channel=" << channel << " pedestal=" << pedestal[channel] << endl;
    
        min[channel]=w_min;
        max[channel]=w_max;
        integ[channel]=w_integral;
        //int wsize = waveform->size(); // 100 samples
        Double_t maxadcval;


        if (subtractpedestal) maxadcval = w_max - w_min + 10;
        else maxadcval = w_max + 10;
      
        if (maxadcval > globalmax)  globalmax = maxadcval; 
        //printf("%i  %.2f  %.2f  %.2f  %.2f \n", channel, w_max, pedestal[channel], maxadcval, globalmax);

        // ******************
        // Loop Over Waveform
        // ******************
        // cout << endl;
        for (Int_t jj=0; jj<_samp; jj++){
      
            // Get adc value
            int adc_value = (*waveform)[jj];

//            if (rocid==34 && slot==3) cout << " event=" << entry << " rocid=" << rocid << " slot=" << slot << " channel=" << channel << " sample=" << jj << " adc sample=" << adc_value << endl;

            if (pulse[channel] < adc_value - pedestal[channel]) pulse[channel] = adc_value - pedestal[channel];
      
            // Fill pedestal histogram with all samples
            if (subtractpedestal) histPulse[channel]->SetBinContent(jj+1,adc_value - w_min);
            else  histPulse[channel]->SetBinContent(jj+1,adc_value);

        } // End Loop Over Waveform

        // cout << "channel=" << channel << " pedestal=" << pedestal[channel] << " pulse=" << pulse[channel]+pedestal[channel] << endl;

        // Check to see if there is a signal in the data



//cout << " is it making it this far? " << endl;

       Int_t logical=0;
     //   if (channel == 0) logical = 0;

        if (pulse[channel] > threshold) logical=1;
        if (pulse[channel] < threshold) logical=0;


			int column = 0, HVbias = 0;
			if ((eventnum-(step+(quadrant-1)*16)*nScan - 3) == 0) step++;
			if (step == 17){
                  		     quadrant++;
                   		    step = 1;
              			 }
			if((step % 4) != 0) column = step % 4;
				else column = 4;
				HVbias = (step-1)/4+1;
		//	if((step%4)=0)column=1;
		//	if((step%4)=1)column=2;
		//	if((step%4)=2)column=3;
		//	if((step%4)=3)column=4;
		//		HVbias= (step-1)/4+1;  

				//cout << "eventnum = " << eventnum << " entry = " << entry << " step = " << step << " quadrant = " << quadrant << " column  = " << column << " HVBias = " << HVbias << endl;
			

	// cout << "eventnum=" << eventnum << " entry%16= " << entry%16 << " slot=" << slot << " channel=" << channel << " pulse=" << pulse[channel] << " logical=" << logical << endl;
	if (logical==1){
		

			

		if (EventMap[eventnum]==NULL){
			EventMap[eventnum] = new Event(HVbias,column,eventnum);
			EventMap[eventnum]->AddChannelData(rocid, slot, channel, module, logical);
		}
		else{
			EventMap[eventnum]->AddChannelData(rocid, slot, channel,module, logical);
		}
		
                  if (EventMap[eventnum]->channelDataVector.back()->SiPM ==0  ){
                              cout << " eventnum = " << eventnum << " entry= " << entry << " column = " << column << " HVbias = " << HVbias << " crate = " << rocid << " slot=" << slot << " channel= " << channel << " module = " << module << " layer= "<< layer << " sector= "<< sector <<" pulse = " << pulse[channel] << " logical = " << logical << " SiPM = " << EventMap[eventnum]->channelDataVector.back()->SiPM << endl;
                                       }
		
	}
	
		
     } // End Loop Over Tree
    
    Int_t nModules = 48, nSiPM = 40;
    
    TH2F * oneEventHistUpstream = new TH2F("oneEventUpstream", "One Event (upstream)",nModules+1, -0.5, (Double_t) nModules+0.5, nSiPM+1, -0.5, (Double_t) nSiPM+0.5);
    TH2F * oneEventHistDownstream = new TH2F("oneEventDownstream", "One Event (downstream)",nModules+1, -0.5, (Double_t) nModules+0.5, nSiPM+1, -0.5, (Double_t) nSiPM+0.5);
    TH2F * allEventHistUpstream = new TH2F("allEventsUpstream", "All Events (upstream)",nModules+1, -0.5, (Double_t) nModules+0.5, nSiPM+1, -0.5, (Double_t) nSiPM+0.5);
    TH2F * allEventHistDownstream = new TH2F("allEventsDownstream", "All Events (downstream)",nModules+1, -0.5, (Double_t) nModules+0.5, nSiPM+1, -0.5, (Double_t) nSiPM+0.5);
    //vector<TH2F *>  oneEventHists;
    allEventHistUpstream->SetMaximum(2*nScan);
    allEventHistDownstream->SetMaximum(2*nScan);
    TCanvas * c2 = new TCanvas("c2","c2",1000,600);
    c2->Divide(2,1);
    //0-7 upstream
    map < Int_t , Event* >::const_iterator iter;
    bool drawFlag = true;


	


    for(iter = EventMap.begin(); iter != EventMap.end(); iter++){
        oneEventHistUpstream->Reset();
        oneEventHistDownstream->Reset();
        //TH2F * oneEventHist = new TH2F("oneEvent", "One Event Hist",nModules, 0, (Double_t) nModules, nSiPM, 0, (Double_t) nSiPM);
        //oneEventHists.push_back(oneEventHist);
        Event * thisEvent = (*iter).second;
        Int_t thisEventNumber = (*iter).first;
        vector<ChannelData*> channelData = thisEvent->channelDataVector;
        //cout << "Channel Data has " << channelData.size() << " entries" << endl;
        for (int i=0; i < (int) channelData.size(); i++){
            ChannelData * thisChannelData = channelData[i];
            uint32_t thisChannel = thisChannelData->channel;
            uint32_t thisModule = thisChannelData->module;
            uint32_t SiPM = thisChannelData->SiPM;
            Int_t logical = thisChannelData->logical;
            if(thisChannel <=7){
                oneEventHistUpstream->Fill(thisModule, SiPM, logical);
                allEventHistUpstream->Fill(thisModule, SiPM, logical);
            }
            else if (thisChannel <= 15){
                oneEventHistDownstream->Fill(thisModule, SiPM, logical);
                allEventHistDownstream->Fill(thisModule, SiPM, logical);
            }
        }
	string input;
	if(drawFlag){
        	cout << "Drawing event # " << thisEventNumber << " Press enter to continue, e to skip to end" <<endl;
        	c2->cd(1);
        	oneEventHistUpstream->Draw("colz");
        	oneEventHistUpstream->Draw("box same");
		c2->cd(1)->SetGrid();
        	c2->cd(2);
        	oneEventHistDownstream->Draw("colz");
		oneEventHistDownstream->Draw("box same");
		c2->cd(2)->SetGrid();
        	c2->Update();
        	//gPad->WaitPrimitive();
        	//sleep(3);
        	getline(cin, input);






	} else {


        	cout << "Drawing event # " << thisEventNumber << " Press enter to continue, e to skip to end" <<endl;
        	c2->cd(1);
        	oneEventHistUpstream->Draw("colz");
        	oneEventHistUpstream->Draw("box same");
		c2->cd(1)->SetGrid();
        	c2->cd(2);
        	oneEventHistDownstream->Draw("colz");
		oneEventHistDownstream->Draw("box same");
		c2->cd(2)->SetGrid();
        	c2->Update();

			TString filename111;

			filename111.Form("Event_%i_kissy_kissy_from_little_Billy.eps", thisEventNumber);

			c2->Print(filename111);

			kissy_kissy->cd();
			c2->Write(filename111);


	}





	if(input =="e") drawFlag = false;





	if(input == "q") return;
    }
    
    TCanvas * c1 = new TCanvas("c1","c1",1000,600);
    c1->Divide(2,1);
    
    c1->cd(1);
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


}

/*
    c2->cd();
    for (int i = 0 ; (int) oneEventHists.size(); i++){
        oneEventHists[i]->Draw("colz");
        c2->Update();
        //gPad->WaitPrimitive();
        string input;
        getline(cin, input);
    }
*/

	// sprintf(fname,"dump_tree_waveform_%02d_%02d_c1.pdf",crate_select,slot[j]);
	//c1_m->SaveAs(fname);
	//sprintf(fname,"dump_tree_waveform_%02d_%02d_c1.png",crate_select,slot[j]);
	//c1_m->SaveAs(fname); 
