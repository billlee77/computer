# file:  .login

# this file is executed once, at login, after .cshrc is executed
# it should contain terminal initialization commands and environment variable
# definitions inherited by other C shells that are started after login

# Garth Huber   94.12.07

echo "Executing /home/billlee/.login"

#****************************************************



# put title at top of xterm
# 00.05.13

# Set Xterm titlebar to current directory
setenv MTYP `uname -m`

# set title at top of Intel Linux Xterm
    source /home/huberg/bin/settitle.sh

 tset -I -Q
 umask 022
 unsetenv TERMCAP
 setenv TERM vt100

 setenv EDITOR xemacs

 setenv EXINIT 'set redraw wm=8'
 setenv POST_SCRIPT las232
 setenv TRIUMF_TERMINAL_TYPE X
 setenv TRIUMF_PLOTTER_TYPE PS
 setenv TRIUMF_FONTS /home/apps/physica-2.77/
 setenv PHYSICA_DIR /home/apps/physica-2.77/
 setenv TD_HELP /home/apps/topdrawer-1.4e/doc/topdrawer4.0.gih

 setenv HIGZPRINTER 'lp -dlas232 paw.ps'

# Hall C CVS stuff - gh 03.02.12
setenv CVS_RSH ssh
setenv CVSROOT huberg@cvs.jlab.org:/group/hallc/cvsroot

# this part selects the colors to display in the ls command
setenv LS_COLORS 'no=00:fi=00:di=01;34:ln=01;36:pi=40;33:so=01;35:bd=40;33;01:cd=40;33;01:ex=01;31:'

# ROOT, GEANT4 stuff
source /home/apps/geant4/.config/bin/Linux-g++/env.csh
set path=($path $G4WORKDIR/bin )

 echo " "
 date
 echo " "
cd



#*****************************************************

#set prompt="%n@%m[\!] "
#set prompt="`whoami`@`hostname`[\!] "
#set prompt="%m> "
#set prompt="`whoami`% "

cd

# # Default
set prompt="%n@%m:%/%# "
# 
alias st 'sudo /usr/sbin/gdm-stop'
# 

# #Let us see bash works
bash
