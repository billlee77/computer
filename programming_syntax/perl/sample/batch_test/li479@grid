#!/usr/bin/perl
use strict;

print "Do you want to Setup Job Frame or Run Jobs ? Choose set or run by typing: ";

my $option=<STDIN>;
chomp($option);

if ( $option eq "set"){
	&set_frame();
} elsif ($option eq "run") {
	&run_jobs();
} elsif ($option eq "plot") {
	&plot()
} 
else {
	print "The option you typed is not recorgnised.\n, Program terminated.\n";
}



exit(0);



sub set_frame() {

	print "Please specify number of Parallel Jobs! : ";
	my $job_num=<STDIN>;

	my @job_name=('orig_mirror_old_interleaving', 'full_mirror_old_interleaving','orig_mirror_new_interleaving','full_mirror_new_interleaving');
	my $num_particles=500000;

	my @copy_file=('cer_config.dat');
	my @link_file=('shms.dat',
	'hep.vis',
	'genkinfile.txt',
	'scan_ztar40cm_theta40deg_pe8gev_500k.dat',
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
		unless(-d "batch_job_$i" or -d "batch_job_$job_name[$i-1]"){
			if($job_name[$i-1]){
				mkdir "batch_job_$job_name[$i-1]";
			} else{
				mkdir "batch_job_$i";
			}

	#	print $dir, "\n";

		} else {
			if($job_name[$i-1]){
				print "batch_$job_name[$i-1] directory exists !\n";
			} else {
				print "batch_$i directory exists !\n";
			}

			exit(0);	
		}
	}



	#my @directory = `find batch_job*`;
	my @directory = `ls -d batch_job_*`;


	# print @directory;
	chomp (@directory);

	# print "@diretory";
		
	for my $var (@directory){
		&createfile($var, $num_particles, $full_dir);

		for my $cfile (@copy_file){
			system("cp $cfile $var");
		}

		for my $sfile (@link_file){
			system("ln -s $full_dir/$sfile $var ");
		}

	}


}


sub createfile {
	my ($dir1, $particles, $full_dir) = @_;
#	print "Create shms_batch file\n";

#	print $dir1;


# /*--------------------------------------------------
# Create the shms_batch file
	open(FILE, ">", "$dir1/shms_batch")
	or die "cannot open directory: $dir1 ";

	print FILE "#!/bin/csh\n", 
	"\n",
	"#PBS -N $dir1\n",
	"#PBS -r n\n",
	"#PBS -e /nobackup/gridiron/hadron/li479/log/$dir1.err\n",
	"#PBS -o /nobackup/gridiron/hadron/li479/log/$dir1.log\n",
	"#PBS -m abe\n",
	'#PBS -M wenliang.billlee@gmail.com', "\n",
	"#PBS -q hadron\n",
	"#PBS -l walltime=60:00:00\n",
	"## the limitation of our geat4 simulation is 500000 particles\n",
	"## 60 hour CPU time is the average running period\n",
	"\n",
	"date\n",
	"\n",
	"cd /backedup/gridiron/hadron/li479/geant4/SHMS_HeavyGasCer/$dir1\n",
	"shms_hvgascer batch_$particles.mac\n",
	"\n",
	"date\n",
	"exit\n";
	close(FILE);

# /*--------------------------------------------------
# Create the batch_500000.mac file

	open(FILE1, ">", "$dir1/batch_$particles.mac") ||
	die "cannot open directory: $dir1 ";
	print FILE1 "/run/beamOn $particles\n";
	close(FILE1);

# /*--------------------------------------------------
# Create the files.dat file for plotting

	open(FILE2, ">", "$dir1/files.dat") ||
	die "cannot open directory: $dir1 ";
	
	my $output_target = `ls cer_R*`;
	chomp($output_target);
	
	print FILE2 $output_target;
	close(FILE2); 

# /*--------------------------------------------------
# Ceate the plot_batch file

	open(FILE3, ">", "$dir1/plots_batch") || 
	die "cannot open directory: $dir1";

	print FILE3 "#!/bin/csh\n", 
	"\n",
	"#PBS -N $dir1"."_Plot2D\n",
	"#PBS -r n\n",
	"#PBS -e /nobackup/gridiron/hadron/li479/log/$dir1"."_Plot2D.err\n",
	"#PBS -o /nobackup/gridiron/hadron/li479/log/$dir1"."_Plot2D.log\n",
	"#PBS -m abe\n",
	'#PBS -M wenliang.billlee@gmail.com', "\n",
	"#PBS -q hadron\n",
	"#PBS -l walltime=5:00:00\n",
	"\n",
	"date\n",
	"\n",
	"cd $full_dir/$dir1\n",
# 	"$full_dir/Plots2D/src/main"
	"/home/billlee/geant4/SHMS_HeavyGasCer/Plots2D/src/main",
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


}
1;




sub run_jobs()
{
#	my @directory = `find batch_jo*`;
	my @directory = `ls -d batch_job_*`;


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
	my @directory = `ls -d batch_job_*`;


	# print @directory;
	chomp (@directory);

	# print "@diretory";
		
	for my $var (@directory){
	#	print $var, " ";
	#	system("cd $var && touch 123");	
	#	system("cd $var && qsub shms_batch");
	#	aprint "Job $var is now submitted.\n"
	#	system("cd $var && qsub shms_batch");

		system("cd $var && ~/geant4/SHMS_HeavyGasCer/Plots2D/src/main");
		print "Job $var is now submitted.\n"

	}
}
