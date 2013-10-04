#!/usr/bin/perl
 
 ## ***************************************************************************
 #
 #  genpass v1.0 (06.2007) Password Generation Program
 #  Copyright (C) 2007 Jon Brown
 #
 #  This program is free software; you can redistribute it and/or modify
 #  it under the terms of the GNU General Public License as published by
 #  the Free Software Foundation; either version 2 of the License, or
 #  (at your option) any later version.
 #
 #  To read the full text go to [url="http://www.gnu.org/licenses/gpl.txt"]http://www.gnu.org/licenses/gpl.txt[/url]
 #
 #  This program is distributed in the hope that it will be useful,
 #  but WITHOUT ANY WARRANTY; without even the implied warranty of
 #  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 #  GNU General Public License for more details.
 #
 #  You should have received a copy of the GNU General Public License
 #  along with this program; if not, write to the Free Software
 #  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 #
 ## ***************************************************************************
 
 use strict;
 use warnings;
 use Getopt::Long;
 Getopt::Long::Configure ("bundling");
 
 ## PARSE AND SET COMMAND-LINE OPTIONS
 ## -----------------------------------------------------
 my %flags=('symbols', 0, 'numbers', 0, 'uppercase', 0, 'lowercase', 0, 'confusable', 0, 'help', 0, 'qty', 1, 'version', 0);
 
 GetOptions( 's|S|symbols' => \$flags{symbols},
         'n|N|numbers' => \$flags{numbers},
         'u|U|uppercase' => \$flags{uppercase},
         'l|L|lowercase' => \$flags{lowercase},
         'c|C|confusable' => \$flags{confusable},
         'q|Q:i' => \$flags{qty},
         'help' => \$flags{help},
         'ver|version' => \$flags{version} );
 
 # Set password characters, excluding those flagged on the command-line
 my $pwdchars = join( '', map {chr} ( 0x21 .. 0x7e ));
     $pwdchars =~ s/\d+//    if ( $flags{numbers} );
     $pwdchars =~ s/[A-Z]+// if ( $flags{uppercase} );
     $pwdchars =~ s/[a-z]+// if ( $flags{lowercase} );
     $pwdchars =~ s/[_\W]+//g if ( $flags{symbols} );
     $pwdchars =~ tr/1Il0O//d  if ( $flags{confusable} );
 
 # If user triggered the --help option flag, display and exit
 if ($flags{help}) {            
     &DisplayUsage();    
     exit();
 }
 elsif ($flags{version}) {
     &DisplayVersion();
     exit();
 }
 
 ## START VALIDATE INPUT
 ## -----------------------------------------------------
 my $kill=0;        # flag to stop the script if input is invalid (or --help is used)
 my @errmsg;        # error message descriptions
 
 # If -q option was used to set a quantity of passwords, make sure it contains at
 # least a value of 1 so that a password can be generated
 if ($flags{qty} == 0 || $flags{qty} < 0) {
     $flags{qty}=1;
 }
 
 # Check that user hasn't excluded all character-types, warn user, kill script
 if ( length($pwdchars) == 0) {
     push @errmsg, "** 0x1: At least 1 character-type must be included";    
     $kill=1;
 }
 
 # Check that user has passed only 1 argument (LENGTH) other than options flags, warn user, kill script
 if ($#ARGV > 0 || $#ARGV < 0) {
     push @errmsg, "** 0x2: Incorrect number of arguments passed";
     $kill=1;
 }
 
 # Check for only numeric input in LENGTH argument, warn user, kill script
 if ($ARGV[0] !~ /^[0-9]+$/) {
         push @errmsg, "** 0x3: Invalid input. LENGTH argument must be a numeric value";
         $kill=1;
 }
 
 # If any of the above validation tests triggered the $kill flag...
 if ($kill == 1) {                     
     print "\n** GENPASS ERROR ---------------------------------------------------------";
     print "\n** ".@errmsg." Error(s) found";      # display number of errors    
     foreach my $err (@errmsg) {             # display error messages
         print "\n".$err;
     }
     print "\n**\n** Type genpass --help for command usage\n";
     print "** -----------------------------------------------------------------------\n\n";
     exit();                         # exit script
 }
 ## END VALIDATE INPUT
 
 ## START MAIN SCRIPT
 ## -----------------------------------------------------
 # From 1 to qty
 
 for ( 1..$flags{qty} ) {
     print &GenPass( $ARGV[0] )."\n";
 }
 exit();
 
 ## END MAIN SCRIPT
 
 ## FUNCTION DEFINITIONS
 ## -----------------------------------------------------
 sub GenPass() {
     my ($pwdlen) = @_;
     my $limit = length( $pwdchars );
     my $pwd = '';
     
     for ( 0..$pwdlen-1 ) {
             $pwd .= substr( $pwdchars, rand( $limit ), 1 );
     }
 
     return $pwd;
 }
 
# use Here-Documents to display usage text
sub DisplayUsage 
{
print <<"USAGE";

Usage: genpass [-snulcqX] LENGTH
       Generate secure passwords LENGTH characters long.
    
       -s, --symbols\tExclude symbols.
       -n, --numbers\tExclude numbers.
       -u, --uppercase\tExclude uppercase letters.
       -l, --lowercase\tExclude lowercase letters.

       -c, --confusable\tExclude confusable characters like: l,I,1,0,O
        
       -qX\t\t\tCreate X number of passwords.
        
       --help\t\tDisplay Usage information.
       --ver, --version\tDisplay version and license information.
        
       Report bugs, comments, and questions to jbrown_home\@yahoo.ca
USAGE
}
 
# use Here-Documents to display version text
sub DisplayVersion {
print <<"VER";
  genpass v1.0 (06.2007) Copyright 2007 Jon Brown

  This is free software.  You may redistribute copies of it under the terms of
  the GNU General Public License <http://www.gnu.org/licenses/gpl.html>.
  There is NO WARRANTY, to the extent permitted by law.
  Written by Jon Scott Brown
VER
 }
