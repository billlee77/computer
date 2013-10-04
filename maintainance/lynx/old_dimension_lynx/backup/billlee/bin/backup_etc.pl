#!/usr/bin/perl


print "hello world.\n";
$person = `whoami`;
# print $person;
chop($person);

$computer = `hostname -s`;
# print $computer;
chop($computer);


system ("sudo cp /etc/hosts /home/custom/etc/hosts");
print "/etc/hosts backed up to /home/etc/\n";

system ("sudo cp /etc/hosts.allow /home/custom/etc/hosts.allow");
print "/home/custom/etc/hosts.allow backed up /home/etc/\n";

system ("sudo cp /etc/hosts.deny /home/custom/etc/hosts.deny");
print "/home/custom/etc/hosts.deny backed up /home/etc/\n";

system ("sudo cp /etc/aliases /home/custom/etc/aliases");
print "/home/custom/etc/aliases backed up /home/etc/\n";

system ("sudo cp /etc/httpd/conf/httpd.conf /home/custom/etc/httpd.conf");
print "/home/custom/etc/httpd/conf/httpd.conf backed up /home/etc/\n";

system ("sudo cp /etc/cups/cupsd.conf /home/custom/etc/cupsd.conf");
print "/home/custom/etc/cups/cupsd/conf backed up /home/etc/\n";

system ("sudo cp /etc/ssh/ssh_config /home/custom/etc/ssh_config");
print "/home/custom/etc/ssh/ssh_config backed up /home/etc/\n";

system ("sudo cp /usr/share/logwatch/default.conf/logwatch.conf /home/custom/etc/logwatch.conf");
print "/usr/share/logwatch/default.conf/logwatch.conf backed up /home/etc/\n";

system ("sudo cp /usr/share/logwatch/scripts/logwatch.pl /home/custom/etc/logwatch.pl");
print "/usr/share/logwatch/scripts/logwatch.pl backed up /home/etc/\n";

system ("sudo cp -r ~/.addressbook ~/.pinerc ~/.bashrc ~/.cshrc ~/.login ~/.vimrc ~/bin /home/custom/$person");
print ".addressbook .pinerc .bashrc .cshrc .login .vimrc are backed up to /home/custom/$person";

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

 
system ("mkdir ~/computer/maintan_setting_backup/$computer/backup;
		 mkdir ~/computer/maintan_setting_backup/$computer/backup/billlee
         mkdir ~/computer/maintan_setting_backup/$computer/backup/etc
 		 realsync /home/custom/$person/ ~/computer/maintan_setting_backup/$computer/backup/$person
		 realsync /home/custom/etc/ ~/computer/maintan_setting_backup/$computer/backup/etc");



