% fgraphs.mp -- do not edit, generated automatically by fey.tex
input feynmp
require_RCS_revision "1.30";
beginchar(1, 40*1.0pt#, 40*1.0pt#, 0);
"feynmf: 1";
LaTeX_unitlength:=1.0pt;
subgraph (0, 0, w, h);
vinit;
pickup pencircle scaled thin;
vleft (__i1);
vright (__o1, __o2);
vconnect ("fermion, label=$e$", __i1, __v1, __o1);
vconnect ("photon,label=$\gamma $", __v1, __o2);
vfreeze;
vdraw;
endsubgraph;
endchar;
% the end.
end.
endinput;
