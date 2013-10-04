#include <TGButton.h>
#include <TGClient.h>
#include <TGButton.h>
#include <TGFrame.h>

class MyMainFrame : public TGMainFrame {

private:
   TGCompositeFrame *fCframe;
   TGTextButton     *fStart, *fPause, *fExit;
   Bool_t            start, pause;

public:
   MyMainFrame(const TGWindow *p, UInt_t w, UInt_t h);
   virtual ~MyMainFrame();
   ClassDef(MyMainFrame, 0)
};

MyMainFrame::MyMainFrame(const TGWindow *p, UInt_t w, UInt_t h) :
  TGMainFrame(p, w, h)
{

   fExit = new TGTextButton(this, "&Exit ","gApplication->Terminate(0)");
   AddFrame(fExit, new TGLayoutHints(kLHintsTop | kLHintsLeft | kLHintsExpandX,200,200,200,200));

   ftest = new TGTextButton(this, "&dfsfa ");
   AddFrame(ftest, new TGLayoutHints(kLHintsTop | kLHintsLeft | kLHintsExpandX,15,30,40,40));
   SetWindowName("TEST GUI");
   

   MapSubwindows();
   Resize(GetDefaultSize());
   MapWindow();
}


MyMainFrame::~MyMainFrame()
{
   // Clean up all widgets, frames and layouthints that were used
   fCframe->Cleanup();
   Cleanup();
}


void try_gui()
{
   // Popup the GUI...
   new MyMainFrame(gClient->GetRoot(), 950, 500);
}
