#! /bin/tcsh -f

# set echo

setenv OSTYP `uname`
if ($OSTYP == "OSF1" ) then
#   setenv machine `hostname -s`    # alpha
    setenv machine regie5
else 
   setenv machine `hostname -s`    # otherwise, assume linux
endif

alias settitle 'echo -n "]2;`printf "%s:%s" $machine $cwd`"'

settitle
alias cd 'cd \!*;settitle'
alias pushd 'pushd \!*;settitle'
alias popd 'popd \!*;settitle'
