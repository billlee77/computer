# file:  .cshrc

# this file is executed each time that UNIX starts a new shell
# at login, it is executed prior to .login 
# it should contain aliases and shell variable definitions that have to be
# repeated whenever you start a new shell

# cshrc files should never contain anything that will generate output!

# Garth Huber   94.12.07

# ************************** #
#  OS -SPECIFIC ASSIGNMENTS  #
# ************************** #

setenv MYUNAME `uname`
setenv MTYP `uname -m`
setenv OSNAME `uname -s`
setenv OSTYP `uname -s`

#   setenv CERN_ROOT /home/apps/cernlib/i386_rhel3/2003
   setenv CERN_ROOT /usr/lib/cernlib/2006
   setenv CERN_LIB $CERN_ROOT/lib 
   setenv PATH .:$CERN_ROOT/bin:/home/billlee/work/geant4/bin/Linux-g++:/sbin:$PATH
   setenv LD_LIBRARY_PATH /usr/lib:/lib:$CERN_LIB

   setenv ABSOFT /home/apps/absoft/opt/absoft
   alias  f77abs /home/apps/absoft/opt/absoft/bin/f77
   alias  f90    /home/apps/absoft/opt/absoft/bin/f90

   alias xterm xterm -ls -sb -rightbar -sl 500

else                            # Alpha

endif

 if ($?path) then
    set path=(. $HOME/bin /usr/local/bin $path)
 else
    set path=(. $HOME/bin)
 endif

# ROOT, GEANT4 stuff
#
#source /home/apps/geant4/.config/bin/Linux-g++/env.csh # do from .login
setenv CLHEP_LIB_DIR /usr/local/lib

setenv LD_LIBRARY_PATH /home/apps/geant4/lib/Linux-g++:/usr/local/lib/:.:/home/apps/root/lib:/home/apps

setenv CLHEP_BASE_DIR /usr/local
setenv CLHEP_INCLUDE_DIR /usr/local/include

#setenv CLHEP_LIB CLHEP

setenv ROOTSYS /home/apps/root
set path=($path $ROOTSYS/bin /home/apps/jas3 /home/apps/dawn)
setenv DAWN_PS_PREVIEWER gv
setenv G4DAWNFILE_VIEWER 'dawn -d'

setenv OGLHOME /usr/X11R6
unset G4UI_USE_TCSH


#Python
setenv PYTHONPATH $ROOTSYS/lib
setenv LD_LIBRARY_PATH $ROOTSYS/lib:$LD_LIBRARY_PATH

############################################################################

 set noclobber notify filec
 set history = 100
 set old=$cwd

# alias cd 'set old=$cwd; chdir \!*; echo $cwd'

# alias cl clear
# alias cp "cp -p"
# alias dir  ls -Fla
# alias disp 'setenv DISPLAY 142.3.164.48:0.0'
# alias dds 'ls -Fl | grep ^d'
# alias help apropos
# alias hi  history -r
# alias h "history -r | more -c"
# alias j jobs -l
# alias lo exit
# alias log logout
# alias pu 'rm -i *~ .*~ #*'
# alias jlpr 'rlpr -Hjlabprt.jlab.org -Ppscolor6'
# alias rm rm -i
# alias Rm /bin/rm
# 

alias ls ls --color=always

 unsetenv TERMCAP
 setenv TERM vt100

# setenv PRINTER las2605
# setenv POST_SCRIPT las2605
 setenv PRINTER Lab114

 alias la "ls -a"
 alias ll "ls -al"

#bash




#XDVI setting
setenv TEXMF `kpsewhich --expand-path='$TEXMFMAIN'`
#echo $TEXMF

#setenv LC_ALL C
setenv XDVIINPUTS $TEXMF/xdvi

set path=($path /home/apps/wired/bin)




