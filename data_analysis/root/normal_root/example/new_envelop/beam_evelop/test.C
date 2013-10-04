{
   TCanvas *c1 = new TCanvas("c1","c1",600,400);
   TH2F *h2 = new TH2F("h2","Example of a resized palette ",40,-4,4,40,-20,20);
   Float_t px, py;
   for (Int_t i = 0; i < 25000; i++) {
      gRandom->Rannor(px,py);
      h2->Fill(px,5*py);
   }
   gStyle->SetPalette(1);
   h2->Draw("COLZ");
   gPad->Update();
   TPaletteAxis *palette = (TPaletteAxis*)h2->GetListOfFunctions()->FindObject("palette");
   palette->SetY2NDC(0.7);
//    c1->Update();
//    c1->Update();
    return c1;
}
