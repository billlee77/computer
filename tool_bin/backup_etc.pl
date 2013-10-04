#!/usr/bin/perl


print "hello world.\n";
$person = `whoami`;
# print $person;
chop($person);

$computer = `hostname -s`;
# print $computer;
chop($computer);

@backuped_up_file= (
'/etc/hosts', 
'/etc/hosts.allow',
'/etc/hosts.deny',
'/etc/aliases',
'/etc/httpd/conf/httpd.conf',
'/etc/cups/cupsd.conf',
'/etc/ssh/ssh_config',
'/usr/share/logwatch/default.conf/logwatch.conf',
'/usr/share/logwatch/scripts/logwatch.pl',
'/etc/fstab',
'/etc/X11/xorg.conf'
);

# print "$#backuped_up_file\n";

$backup_target=  '/home/custom/';
$backup_etc_target=  '/home/custom/etc/';

$backdir="/home/$person/computer/"."maintainance/" . $computer . "/";
$configdir="/home/".$person."/computer/config_files/";

foreach $var (@backuped_up_file) {
	#print "$var\n";
	
	if (-e "$var") {
		#system ("ls $var");
		system ("sudo cp -p $var $backup_etc_target");
		print "$var is backed up $backup_etc_target \n";	
	}
	else {
		print "$var does not exist. \n";
	}

}

print "hello world.\n";

# /*--------------------------------------------------
# Backup personal configuration
#

@backuped_up_personal_file = (
'addressbook',
'pinerc',
'bashrc',
'cshrc',
'login',
'vimrc',
'rootlogon.C',
'ssh'
);

# print "$ENV{'HOME'}\n";

$HOME = $ENV{'HOME'}."/";

#print "$HOME\n";

foreach $var (@backuped_up_personal_file) {

	if (-e "$HOME.$var") {
		# system ("ls $HOME.$var");
		system ("sudo cp -rp $HOME.$var $backup_target$person/");
		system ("sudo cp -rp $HOME.$var $backdir"."backup/$person/");
	    print "$var is backed up $backup_target$person/ \n";	
	}
	else {
		print "$HOME.$var does not exist. \n";
	}
}

#/*--------------------------------------------------
# Backup pine and ssh keys
system ("sudo cp -p $HOME.pinerc $configdir/pinerc");
system ("sudo cp -p $HOME.addressbook $configdir/addressbook");
system ("sudo cp -p $HOME.ssh/authorized_keys $configdir/authorized_keys");


# /*--------------------------------------------------
# Sychronize the backup file to the svn repository

@files = ("$backdir".'backup', "$backdir"."backup/$person");

print @files, "\n";

for $i (0 .. $#files) {

#	print "File $files[$i] ";
    if (-d $files[$i])
    {
        print "directory  Exists!\n";
    }
    else
    {
        print $files[$i], "directory does not exist!\n";
		$path = $files[$i];
		system(	"mkdir $path");  
    }
}



		#sudo echo n | realsync /home/custom/$person/ ~/computer/maintainance/$computer/backup/$person
		#sudo echo n | realsync /home/$person/.icewm/ ~/computer/linux_help/desktop/icewm/
system ("
		 sudo echo n | realsync /home/custom/etc/ ~/computer/maintainance/$computer/backup/etc
");

exit(0);





# 
# system ("sudo cp -p -r ~/.addressbook ~/.pinerc ~/.bashrc ~/.cshrc ~/.login ~/.vimrc ~/.rootlogon.C ~/.rootlogon.py $backup_target/$person/");
# print ".addressbook .pinerc .bashrc .cshrc .login .vimrc are backed up to /home/custom/$person \n";
# 
# 


#foreach (@back_up_file) {

#	if (-e "@_\n") {
#		system ("sudo cp -p /etc/X11/xorg.conf /home/custom/etc/xorg.conf");
#		print "Xorg.conf is backed up\n";
#		system ("ls @_");

#	}
#	else {
#		print "Xorg.config does not exist.";
#	}

#}


# 
# 
# 
# system ("sudo cp -p /etc/hosts /home/custom/etc/hosts");
# print "/etc/hosts backed up to /home/etc/\n";
# 
# system ("sudo cp -p /etc/hosts.allow /home/custom/etc/hosts.allow");
# print "/home/custom/etc/hosts.allow backed up /home/etc/\n";
# 
# system ("sudo cp -p /etc/hosts.deny /home/custom/etc/hosts.deny");
# print "/home/custom/etc/hosts.deny backed up /home/etc/\n";
# 
# system ("sudo cp -p /etc/aliases /home/custom/etc/aliases");
# print "/home/custom/etc/aliases backed up /home/etc/\n";
# 
# system ("sudo cp -p /etc/httpd/conf/httpd.conf /home/custom/etc/httpd.conf");
# print "/home/custom/etc/httpd/conf/httpd.conf backed up /home/etc/\n";
# 
# system ("sudo cp -p /etc/cups/cupsd.conf /home/custom/etc/cupsd.conf");
# print "/home/custom/etc/cups/cupsd/conf backed up /home/etc/\n";
# 
# system ("sudo cp -p /etc/ssh/ssh_config /home/custom/etc/ssh_config");
# print "/home/custom/etc/ssh/ssh_config backed up /home/etc/\n";
# 
# system ("sudo cp -p /usr/share/logwatch/default.conf/logwatch.conf /home/custom/etc/logwatch.conf");
# print "/usr/share/logwatch/default.conf/logwatch.conf backed up /home/etc/\n";
# 
# system ("sudo cp -p /usr/share/logwatch/scripts/logwatch.pl /home/custom/etc/logwatch.pl");
# print "/usr/share/logwatch/scripts/logwatch.pl backed up /home/etc/\n";
# 
# system ("sudo cp -p /etc/fstab /home/custom/etc/fstab");
# print "/etc/fstab backed up /home/etc/\n";
# 
# if (-e "/etc/X11/xorg.conf") {
# system ("sudo cp -p /etc/X11/xorg.conf /home/custom/etc/xorg.conf");
# print "Xorg.conf is backed up\n";
# }
# else {
# print "Xorg.config does not exist.";
# }


# $backup = "asdasd" . "backupsda";
# 
# print $backup,"\n" ;
# 
# print $computer;
# 
# $word1="light";
# $word2="house \n";
# $full_string = $computer . $word2;
# print $full_string


# print " \n \n \n";
# print $backdir;
# print " \n \n \n";
 






# if (-d "~/computer/maintainance/$computer/backup ~/computer/maintainance/$computer/backup/$person  ~/computer/maintainance/$computer/backup/etc") {
# # system("
# # 		mkdir ~/computer/maintainance/$computer/backup
# # 		mkdir ~/computer/maintainance/$computer/backup/$person
# #         mkdir ~/computer/maintainance/$computer/backup/etc"   
# # 		);
# print "They exist \n";
# }
# else {
# print "they do not exit \n";
# }
 



