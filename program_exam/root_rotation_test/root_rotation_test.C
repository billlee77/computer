{

	
	gSystem->Load("libGenVector");

	double fPi = 3.1415926;

	double t1_theta    = 6*fPi/180;
//	double t1_phi      = fPi;
	double t1_phi      = 0*fPi/180;
	double t1_momentum = 5;
	
	TLorentzVector l_t1;

    double t1_Mom  = t1_momentum;
    double t1_MomZ = ( t1_Mom * cos(t1_theta) );  
    double t1_MomX = ( t1_Mom * sin(t1_theta) * cos(t1_phi) );
    double t1_MomY = ( t1_Mom * sin(t1_theta) * sin(t1_phi) );

    l_t1.SetPxPyPzE( t1_MomX, t1_MomY, t1_MomZ, t1_Mom );

	cout << l_t1.Vect().Theta()*180/fPi << "   " << l_t1.Vect().Phi()*180/fPi << endl;



	double t2_theta    = 3*fPi/180;
	double t2_phi      = 5*fPi/180;

//	double t2_phi      = fPi;
//	double t2_phi      = 0;

	double t2_momentum = 10;
	
	TLorentzVector l_t2;

    double t2_Mom  = t2_momentum;
    double t2_MomZ = ( t2_Mom * cos(t2_theta) );  
    double t2_MomX = ( t2_Mom * sin(t2_theta) * cos(t2_phi) );
    double t2_MomY = ( t2_Mom * sin(t2_theta) * sin(t2_phi) );

    l_t2.SetPxPyPzE( t2_MomX, t2_MomY, t2_MomZ, t2_Mom );

	TLorentzVector l_t1_r;

	l_t1_r = l_t1;

//	l_t1_r.Vect().RotationZYX(5, 10, 0);
//	l_t1_r.RotateX(15*fPi/180);

	TVector3 vz(0,0,1);

	cout << "t1: " << l_t1.Vect().Theta()*180/fPi << "   " << l_t1.Vect().Phi()*180/fPi << endl;
	cout << "t2: "<< l_t2.Vect().Theta()*180/fPi << "   " << l_t2.Vect().Phi()*180/fPi << endl;
	cout << "Rotation: "<< l_t1_r.Vect().Theta()*180/fPi << "   " << l_t1_r.Vect().Phi()*180/fPi << endl;

// //   l_t1_r.Vect().RotateZ(l_t2.Vect().Theta());
// 
// //     l_t1_r.RotateY(5*fPi/180);
//      l_t1_r.RotateY(l_t2.Vect().Theta());
// //    l_t1_r.RotateY(l_t2.Vect().Theta());
// //     l_t1_r.Rotate(l_t2.Vect().Phi(), vz);
// 
//      l_t1_r.RotateZ(l_t2.Vect().Phi());
// 
// //	 l_t1_r.Vect() = l_t1_r.Vect() * ROOT::Math::RotationZYX(1, 0.1, 0);
//<< "    " <<  l_t2.Vect().Psi()

	TRotation r;

// 	r.SetXEulerAngles(l_t2.Vect().Phi(), l_t2.Vect().Theta(), 0);
// 	r.SetYEulerAngles(l_t2.Vect().Phi(), l_t2.Vect().T heta(), 0);

//	double rot_phi   = l_t2.Vect().Phi();
//	double rot_theta = l_t2.Vect().Theta();

	double rot_theta = 0 *fPi/180;
	double rot_phi   = 5 *fPi/180;

//	cout << l_t2.Vect().Theta() << "   " << l_t2.Vect().Phi()  << endl;

	r.SetXEulerAngles(rot_phi, rot_theta, 0);
 	r.SetYEulerAngles(rot_phi, rot_theta, 0);


//	r.SetZAxis(l_t2.Vect());

	
	l_t1_r.Transform(r);


	cout << "Rotation: "<< l_t1_r.Vect().Theta()*180/fPi << "   " << l_t1_r.Vect().Phi()*180/fPi << endl;

//	ROOT::Math::XYZVector result = ROOT::Math::RotationZYX(0.5, 0, 0.5)*ROOT::Math::XYZVector(0, 0, 1);

//	Rotation3D r;
//	RotationZYX(0.5*fPi, 0, 0.5*fPi);

//	TLorenzVector t2;
//	t2.


//	TLorenzVector t1;
//	t1.





}
