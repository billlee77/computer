#!/usr/bin/perl


print "hello world.\n";
$person = `whoami`;
# print $person;
chop($person);

$computer = `hostname -s`;
# print $computer;
chop($computer);


system ("sudo cp -p /etc/hosts /home/custom/etc/hosts");
print "/etc/hosts backed up to /home/etc/\n";

system ("sudo cp -p /etc/hosts.allow /home/custom/etc/hosts.allow");
print "/home/custom/etc/hosts.allow backed up /home/etc/\n";

system ("sudo cp -p /etc/hosts.deny /home/custom/etc/hosts.deny");
print "/home/custom/etc/hosts.deny backed up /home/etc/\n";

system ("sudo cp -p /etc/aliases /home/custom/etc/aliases");
print "/home/custom/etc/aliases backed up /home/etc/\n";

system ("sudo cp -p /etc/httpd/conf/httpd.conf /home/custom/etc/httpd.conf");
print "/home/custom/etc/httpd/conf/httpd.conf backed up /home/etc/\n";

system ("sudo cp -p /etc/cups/cupsd.conf /home/custom/etc/cupsd.conf");
print "/home/custom/etc/cups/cupsd/conf backed up /home/etc/\n";

system ("sudo cp -p /etc/ssh/ssh_config /home/custom/etc/ssh_config");
print "/home/custom/etc/ssh/ssh_config backed up /home/etc/\n";

system ("sudo cp -p /usr/share/logwatch/default.conf/logwatch.conf /home/custom/etc/logwatch.conf");
print "/usr/share/logwatch/default.conf/logwatch.conf backed up /home/etc/\n";

system ("sudo cp -p /usr/share/logwatch/scripts/logwatch.pl /home/custom/etc/logwatch.pl");
print "/usr/share/logwatch/scripts/logwatch.pl backed up /home/etc/\n";

system ("sudo cp -p /etc/fstab /home/custom/etc/fstab");
print "/etc/fstab backed up /home/etc/\n";


#system ("sudo cp -p -r ~/.addressbook ~/.pinerc ~/.bashrc ~/.cshrc ~/.login ~/.vimrc ~/bin /home/custom/$person/");
system ("sudo cp -p -r ~/.addressbook ~/.pinerc ~/.bashrc ~/.cshrc ~/.login ~/.vimrc ~/.rootlogon.C ~/.rootlogon.py /home/custom/$person/");
print ".addressbook .pinerc .bashrc .cshrc .login .vimrc are backed up to /home/custom/$person \n";


if (-e "/etc/X11/xorg.conf") {
system ("sudo cp -p /etc/X11/xorg.conf /home/custom/etc/xorg.conf");
print "Xorg.conf is backed up\n";
}
else {
print "Xorg.config does not exist.";
}



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

$backdir="/home/billlee/computer/"."maintainance/" . $computer . "/";

# print " \n \n \n";
# print $backdir;
# print " \n \n \n";
 
@files = ("$backdir".'backup', "$backdir"."backup/$person", "$backdir".'backup/etc' ,"/home/billlee/computer/linux_help/desktop/icewm");

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
 
system ("
 		 sudo echo n | realsync /home/custom/$person/ ~/computer/maintainance/$computer/backup/$person
		 sudo echo n | realsync /home/custom/etc/ ~/computer/maintainance/$computer/backup/etc
		 sudo echo n | realsync /home/$person/.icewm/ ~/computer/linux_help/desktop/icewm/
");

exit;

