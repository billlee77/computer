  // Here we will determine if we are using spherical or parabolic mirrors

  getline( fin , line );
  loc_beg = line.find(":" , 0);
  Mtype = line.find("s",loc_beg);
  
  if(Mtype != string::npos) {
      MirrorSphere = true;
  } else {
      MirrorSphere = false;
  }

  G4cout << "test" << string::npos 	<< "test" << G4endl; 


  string MirrorType = (MirrorSphere)? "Spherical" : "Parabolic";
  
  // Here we will determine if we are measuring from the corners or the middle 
  getline( fin , line );
  loc_beg = line.find(":",0);
  Mtype = line.find("c",loc_beg);

  G4cout << "test" << loc_beg 		<< "test" << G4endl; 
  G4cout << "test" << Mtype 		<< "test" << G4endl; 
  G4cout << "test" << string::npos 	<< "test" << G4endl; 

  if(Mtype != string::npos) {
      MirrorCorner = true;
  } else {
      MirrorCorner = false;
  }

  G4cout << "test" << MirrorCorner << "test" << G4endl; 
  G4cout << "test" << string::npos 	<< "test" << G4endl; 

  string MeasureType = (MirrorCorner)? "Measured from Corner to corner" : "Measured from middle to middle";

