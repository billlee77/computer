#!/usr/bin/perl
use strict;

# our $job_prefix=('orig_job_');
#our $job_prefix=('job_');

#our $num_particles=100;
our $num_particles=250000;
#our $num_particles=1000;
#our $num_particles=1000;
#our $num_particles=500000;
#our $num_particles=100000;

#our $num_particles=1000;

#our $job_dir=('/home/gridiron/li479/nobackup/job_running_ground/');
our $job_dir=('/home/gridiron/li479/nobackup/job_running_ground/');
#our $job_dir=('/home/gridiron/li479/backedup/jobs_running/');

#our $job_dir=('/home/gridiron/li479/scratch/');

#our $job_prefix=($job_dir."sample_".$num_particles."_");
#our $job_prefix=($job_dir."mis_alignment_".$num_particles."_");
#our $job_prefix=($job_dir."job_".$num_particles."_");
our $job_prefix=($job_dir."job_".$num_particles."_");

our $shms_time=100;
our $plot_time=100;

print "Do you want to setup job frame, run jobs or plots ? Choose set, run, plot, rootfile, rootplot, fullplot or help by typing: ";

my $option=<STDIN>;
chomp($option);

# Choose a job to run
if ( $option eq "set"){
	&set_frame();
} elsif ($option eq "run") {
	&run_jobs();
} elsif ($option eq "plot") {
	&plot(); 
} elsif ($option eq "rootfile") {
	&rootfile;
} elsif ($option eq "rootplot") {
	&rootplot;
} elsif ($option eq "fullplot") {
	&fullplot;
} elsif ($option eq "help") {
	&help;
} else {
	print "The option you typed is not recorgnised.\n, Program terminated.\n";
}

exit(0);

sub set_frame() {

	print "Please specify number of Parallel Jobs! : ";
	my $job_num=<STDIN>;

	# my @job_name=('interleaving_1234_PMToff', 'interleaving_1234_PMTon' ,'interleaving_1324_PMToff', 'interleaving_1324_PMTon',);
	#my @job_name=('interleaving_4231_PMToff', 'interleaving_4231_PMTon');
	# my @job_name=('oblate', 'sphere');
	# my @job_name=('4321_oblate_pmt_on_tran');

	# my @job_name=('46_52', '43_51','49_53');
	# my @job_name=('52_54', '55_55');
	# my @job_name=('58_56', '61_57');
	# my @job_name=('40_49', '37_47');
	# my @job_name=('43_45', '42_43', '41_41');
	
	#my @job_name=('42_42_pmton','42_42_pmtoff');
#	my @job_name=('particle_file');
#	my @job_name=('particle_file_fp', 'matrix_fp');
#	my @job_name=('matrix_fp');

# 	my @job_name=('no_change',
# 				  'x+2',
# 				  'y+2',
# 				  'z+2',
# 				  'x-2',
# 				  'y-2',
# 				  'z-2',
# 				  'mirror_x_angle+2',
# 				  'mirror_x_angle-2',
# 				  'pmt_angle+2',
# 				  'pmt_angle-2');

# 	my @job_name=('mirror_x_angle+1',
# 				  'mirror_x_angle-1',
# 				  'mirror_x_angle+0p5',
# 				  'mirror_x_angle-0p5');
# 
# 	my @job_name=('mirror_x_angle+0p75',
# 				  'mirror_x_angle-0p75');
	
# 	my @job_name=('100000_proton_PMT_on',
# 				  '150000_kaon_PMT_on',
# 				  '250000_pi_PMT_on');

#	my @job_name=('100000_proton_7GeV_PMT_on',
#				  '150000_kaon_7GeV_PMT_on',
#				  '250000_pi_7GeV_PMT_on');




# ----------------------------------------------------*/
# ----------------------------------------------------*/
# Mis-alignment Study

# 	my @job_name=('no_change',
# 				  'x+2',
# 				  'y+2',
# 				  'z+2',
# 				  'x-2',
# 				  'y-2',
# 				  'z-2',
# 				  'mirror_x_angle+2',
# 				  'mirror_x_angle-2',
# 				  'pmt_angle+2',
# 				  'pmt_angle-2',
# 				  'mirror_x_angle+1',
# 				  'mirror_x_angle-1',
# 				  'mirror_x_angle+0p5',
# 				  'mirror_x_angle-0p5',
# 				  'mirror_x_angle+0p75',
# 				  'mirror_x_angle-0p75');
# 	

#  	my @job_name=('pmt_x+1_y+1',
# 				  'pmt_x+2_y+2',
# 				  'pmt_x-2_y-2',
# 				  'pmt_x+3_y+3' );

#   	my @job_name=('pmt_x+2_y+1.5',
# 				  'pmt_x+3_y+1.5',
# 				  'pmt_x+4_y+1.5' );


#   	my @job_name=( 'mirror_y_angle+0p5',
# 				   'mirror12_x_angle-0p5',
# 				   'mirror34_x_angle-0p5',
# 				   'mirror_x_angle-0p5_pmt_y+0p5',
# 				   'mirror_x_angle-0p5_y_angle+0p5');		

#  	my @job_name=( 'mirror_x_angle_-0p5_-0p7_0p75_-0p75',
#				   'mirror_x_angle_-0p5_-0p7_0p75_-0p75__pmt_y_+0p5_+0p5_+0p5_+0',
#				   'mirror_x_angle_-0p5_-0p7_0p75_-0p75__y_angle_+0p25_+0p25_+0p25_+0');	

#  	my @job_name=( 'new_envolope', 'old_envolope' );
#  	my @job_name=( 'new_without_offset' );
#  	my @job_name=( 'new_10cm_offset' );
# 	my @job_name=( 'new_no_offset' );
# 	my @job_name=( 'old_no_offset' );
# 	my @job_name=( '7GeV_new_reflectivity',
#                   '3GeV_new_reflectivity');


# 	my @job_name=( 'old_reflectivity_sample');
# 	my @job_name=( 'perfect_reflectivity_sample');
# 	my @job_name=( 'half_reflectivity_sample');
# 	my @job_name=( 'reflectivity_test');

	my @job_name=( 'old_with_offset_new_method' );
#	my @job_name=( 'new_without_offset' );
#	my @job_name=( 'new_without_offset_with_delta_cut' );

#  	my @job_name=( 'test_parabola',
#  				   'test_sphere', 
#  				   'test_oblate' );
#

#	my @job_name=( 'test_new_envolop_pmt_on', 
#				   'test_new_envolop_pmt_off' );
 
#	my @job_name = ('parabola_dbg');

# ----------------------------------------------------*/
# ----------------------------------------------------*/



	my @copy_file=('cer_config.dat');
	my @link_file=('shms.dat',
	'hep.vis',
	'genkinfile.txt',
	'scan_ztar40cm_theta40deg_pe8gev_500k.dat',
	'shms_40cmtarg_40deg_8gev_cer.dat',
	'shms_40cmtarg_40deg_8gev_cer_cut.dat',
	'vis.mac');


	# /*--------------------------------------------------
	# Under this point, are all coding

	my $dir='';
	my $full_dir=`pwd`;

	chomp($full_dir);


	# print "Number of Job specified is: $job_num";

	if($job_num =~ /^[+-]?\d+$/ || $job_num >= 0){
		print "Number of Job specified is: $job_num";
	} else {
		print "Option you entered is not a Positive Number.\n";
		exit(0);
	}

	for my$i (1 .. $job_num) {
		unless(-d "multi_job_$i" or -d "$job_prefix$job_name[$i-1]"){
			if($job_name[$i-1]){
				mkdir "$job_prefix$job_name[$i-1]";
			} else{
				mkdir "$job_prefix$i";
			}

	#	print $dir, "\n";

		} else {
			if($job_name[$i-1]){
				print "$job_prefix$job_name[$i-1] directory exists !\n";
			} else {
				print "$job_prefix directory exists !\n";
			}

			exit(0);	
		}
	}



	#my @directory = `find batch_job*`;
	my @directory = `ls -d $job_prefix*`;

	#print "@directory";

	# print @directory;
	chomp (@directory);

	# print "@diretory";
		
	for my $var (@directory){
		&createfile($var, $full_dir);

		for my $cfile (@copy_file){
			system("cp $cfile $var");
		}

		for my $sfile (@link_file){
			system("ln -s $full_dir/$sfile $var ");
		}

	}


}


sub createfile {
	my ($dir1, $full_dir) = @_;
#	print "Create shms_batch file\n";

#	print $dir1;

	my @file_name = split(/\//, $dir1);
#	print $file_name[-1]; 
	
	my $name_tmp = $file_name[-1]; 

	# my $shms_dir = `which shms_hvgascer`;

# /*--------------------------------------------------
# Create the shms_batch file
	open(FILE, ">", "$dir1/shms_batch")
	or die "cannot open directory: $dir1 ";

	print FILE "#!/bin/csh\n", 
	"\n",
	"#PBS -N $name_tmp\n",
	"#PBS -r n\n",
	"#PBS -e /nobackup/gridiron/hadron/li479/log/$name_tmp.err\n",
	"#PBS -o /nobackup/gridiron/hadron/li479/log/$name_tmp.log\n",
	"#PBS -m abe\n",
	'#PBS -M wenliang.billlee@gmail.com', "\n",
	"#PBS -q hadron\n",
	"#PBS -l walltime=$shms_time:59:00\n",
	"## the limitation of our geat4 simulation is 500000 particles\n",
	"## 60 hour CPU time is the average running period\n",
	"\n",
	"date\n",
	"\n",
	"cd $dir1\n",
	"shms_hvgascer batch_$num_particles.mac\n",
	"\n",
	"date\n",
	"exit\n";
	close(FILE);

# /*--------------------------------------------------
# Create the batch_500000.mac file

	open(FILE1, ">", "$dir1/batch_$num_particles.mac") ||
	die "cannot open directory: $dir1 ";
	print FILE1 "/run/beamOn $num_particles\n";
	close(FILE1);

# /*--------------------------------------------------
# Ceate the plot_batch file

	open(FILE3, ">", "$dir1/plots_batch") || 
	die "cannot open directory: $dir1";

	print FILE3 "#!/bin/csh\n", 
	"\n",
	"#PBS -N $name_tmp"."_Plot2D\n",
	"#PBS -r n\n",
	"#PBS -e /nobackup/gridiron/hadron/li479/log/$name_tmp"."_Plot2D.err\n",
	"#PBS -o /nobackup/gridiron/hadron/li479/log/$name_tmp"."_Plot2D.log\n",
	"#PBS -m abe\n",
	'#PBS -M wenliang.billlee@gmail.com', "\n",
	"#PBS -q hadron\n",
	"#PBS -l walltime=$plot_time:59:00\n",
	"\n",
	"date\n",
	"\n",
	"cd $dir1\n",
# 	"$full_dir/Plots2D/src/main"
	"~/geant4/SHMS_HeavyGasCer/Plots2D/src/main",
	"\n",
	"\n",
	"date\n",
	"exit\n";
	close(FILE3);
	

	open(FILE4, ">", "$dir1/config.dat") ||
	die "cannot open directory: $dir1";

	print FILE4 
	"# This is the configuration file for Plots2D\n",
	"# This file will ask if you want certain features turned on\n",
	"# or off. Answer y or n of yes or no.\n",
	"All plots on a single plane: n\n",
	"Show plots of hits and misses: y\n",
	"Separate hits file: y\n",
	"PMT's on: n\n";
	
	close(FILE4);

	open(FILE5, ">","$dir1/area.dat") ||
	die "cannot open directory: $dir1";

	print FILE5
	"47  0  0  83.7758\n",
	"47  0  -0  83.7758\n",
	"48  0  0  80.46\n",
	"48  0  -0  80.46\n";

	close(FILE5);


  # /*--------------------------------------------------
  # Create rootfile batch file

	open(FILE6, ">", "$dir1/rootfile_batch")
	or die "cannot open directory: $dir1 ";

	print FILE6 "#!/bin/csh\n", 
	"\n",
	"#PBS -N $name_tmp"."_rootfile\n",
	"#PBS -r n\n",
	"#PBS -e /nobackup/gridiron/hadron/li479/log/$name_tmp"."_rootfile.err\n",
	"#PBS -o /nobackup/gridiron/hadron/li479/log/$name_tmp"."_rootfile.log\n",
	"#PBS -m abe\n",
	'#PBS -M wenliang.billlee@gmail.com', "\n",
	"#PBS -q hadron\n",
	"#PBS -l walltime=$shms_time:59:00\n",
	"\n",
	"date\n",
	"\n",
	"cd $dir1\n",
	"~/plot_para/root_tree/main\n",
	"\n",
	"date\n",
	"exit\n";
	close(FILE6);

  # /*--------------------------------------------------
  # Create root plot batch file

	open(FILE7, ">", "$dir1/rootplot_batch")
	or die "cannot open directory: $dir1 ";

	print FILE7 "#!/bin/csh\n", 
	"\n",
	"#PBS -N $name_tmp"."_rootplot\n",
	"#PBS -r n\n",
	"#PBS -e /nobackup/gridiron/hadron/li479/log/$name_tmp"."_rootplot.err\n",
	"#PBS -o /nobackup/gridiron/hadron/li479/log/$name_tmp"."_rootplot.log\n",
	"#PBS -m abe\n",
	'#PBS -M wenliang.billlee@gmail.com', "\n",
	"#PBS -q hadron\n",
	"#PBS -l walltime=$shms_time:59:00\n",
	"\n",
	"date\n",
	"\n",
	"cd $dir1\n",
	"~/plot_para/plot/main\n",
	"\n",
	"date\n",
	"exit\n";
	close(FILE7);

	my $string = q^perl -e 'open FILE, ">files.dat" or die $!;$filename=`ls cer_R*.dat`;print FILE $filename; close FILE;'^;
	#my $string = 'asd';

	# /*--------------------------------------------------
    # Create a batch file to run, rootfile and rootplot
	open(FILE8, ">", "$dir1/fullplot_batch")
	or die "cannot open directory: $dir1 ";

	print FILE8 "#!/bin/csh\n", 
	"\n",
	"#PBS -N $name_tmp"."_fullplot\n",
	"#PBS -r n\n",
	"#PBS -e /nobackup/gridiron/hadron/li479/log/$name_tmp"."_fullplot.err\n",
	"#PBS -o /nobackup/gridiron/hadron/li479/log/$name_tmp"."_fullplot.log\n",
	"#PBS -m abe\n",
	'#PBS -M wenliang.billlee@gmail.com', "\n",
	"#PBS -q hadron\n",
	"#PBS -l walltime=$shms_time:59:00\n",
	"## the limitation of our geat4 simulation is 500000 particles\n",
	"## 60 hour CPU time is the average running period\n",
	"\n",
	"\n",
	"date\n",
	"\n",
	"cd $dir1\n",
	"shms_hvgascer batch_$num_particles.mac\n",
	"sleep 5\n",
	$string,
	"\n",
	"sleep 5\n",
	"~/plot_para/root_tree/main\n",
	"~/plot_para/plot/main\n",
	"\n",
	"date\n",
	"exit\n";
	close(FILE8);

}
1;




sub run_jobs()
{
#	my @directory = `find batch_jo*`;
	my @directory = `ls -d $job_prefix*`;


	# print @directory;
	chomp (@directory);

	# print "@diretory";
		
	for my $var (@directory){
	#	print $var, " ";
	#	system("cd $var && touch 123");	
		system("cd $var && qsub shms_batch");
		print "Job $var is now submitted.\n";
	#	system("cd $var && qsub shms_batch");
	#	system("sleep 10");
	}
}

sub plot()
{

#	my @directory = `find batch_jo*`;
	my @directory = `ls -d $job_prefix*`;


	# print @directory;
	chomp (@directory);

	# print "@diretory";
		
	for my $var (@directory){

		# /*--------------------------------------------------
		# Create the files.dat file for plotting
	
		open(FILE2, ">", "$var/files.dat") ||
		die "cannot open directory: $var ";
	
		my $file_target = `ls $var/cer_R*dat`;


		chomp($file_target);

		#print $file_target, "\n";

		my @output_target = split('/', $file_target);
	
		print FILE2 $output_target[-1];
		close(FILE2); 


	#	print $var, " ";
	#	system("cd $var && touch 123");	
	#	system("cd $var && qsub shms_batch");
	#	aprint "Job $var is now submitted.\n"
	#	system("cd $var && qsub shms_batch");

	#	system("cd $var && ~/geant4/SHMS_HeavyGasCer/Plots2D/src/main");
		system("cd $var && qsub plots_batch");
		print "Job $var is now submitted.\n"

	}
}


sub rootfile()
{
	print "Start create root file !\n" ;
	my @directory = `ls -d $job_prefix*`;


	# print @directory;
	chomp (@directory);

	# print "@diretory";
		
	for my $var (@directory){

		open(FILE2, ">", "$var/files.dat") ||
		die "cannot open directory: $var ";
	
		my $file_target = `ls $var/cer_R*dat`;

		chomp($file_target);

		#print $file_target, "\n";

		my @output_target = split('/', $file_target);
	
		print FILE2 $output_target[-1];
		close(FILE2); 


		system("cd $var && qsub rootfile_batch");
		print "Job $var"."_rootfile is now submitted.\n";
	}

}

sub rootplot()
{
	print "Start root ploting !\n" ;

	my @directory = `ls -d $job_prefix*`;

	# print @directory;
	chomp (@directory);

	# print "@diretory";
		
	for my $var (@directory){
		system("cd $var && qsub rootplot_batch");
		print "Job $var"."_rootplot is now submitted.\n";
	}
}

sub fullplot()
{
	print "Start root ploting !\n" ;

	my @directory = `ls -d $job_prefix*`;

	# print @directory;
	chomp (@directory);

	# print "@diretory";
		
	for my $var (@directory){
		system("cd $var && qsub fullplot_batch");
		print "Job $var"."_fullplot is now submitted.\n";
	}
}

sub help() 
{
	print "\n";
	print "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n";
	print "set: Set the job frames in the file indicated directory.\n";
	print "run: Run jobs in the indicated directory.\n";
	print "plot: Use Plot2D program to plot the results (buggy, so be careful).\n";
	print "rootfile: Convert number files to root files.\n";
	print "rootplot: Plot from the root files.\n";
	print "fullplot: Run+rootfile+rootplot.\n";
	print "enjoy: No such option, sorry.\n";
	print "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n";
	print "\n";
}
1;
