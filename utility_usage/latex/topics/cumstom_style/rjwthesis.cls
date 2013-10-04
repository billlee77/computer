% rjwthesis.cls -- A LaTeX PhD Thesis class by Robert Whittaker

\ProvidesClass{rjwthesis}[2006/06/24]

\typeout{Thesis Class by Robert Whittaker}
\typeout{Based on standard book class, with customisations}

\usepackage{graphicx}

\DeclareOption*{\PassOptionsToClass{\CurrentOption}{book}}

\ProcessOptions\relax

\LoadClass[11pt,a4paper]{book}

%------------------------------------------------------------------
% Use just over 1.5x line spacing (assuming 11pt font) and remember
% to fix the footnote spacing too.

\renewcommand{\baselinestretch}{1.25}
\setlength{\footnotesep}{\baselinestretch\footnotesep}

%------------------------------------------------------------------
% Make pages a bit larger, given we are using 1.5 spacing

\newlength{\extrawidth}
\newlength{\extraheight}

\setlength{\extrawidth}{2cm}
\setlength{\extraheight}{1cm}

\addtolength{\textwidth}{\extrawidth}
\addtolength{\oddsidemargin}{-0.5\extrawidth}
\addtolength{\evensidemargin}{-0.5\extrawidth}
\addtolength{\textheight}{\extraheight}
\addtolength{\topmargin}{-0.5\extraheight}

%------------------------------------------------------------------
% Increase float fraction and discourage float-only pages

\renewcommand\topfraction{.9}
\renewcommand\bottomfraction{.5}
\renewcommand\dbltopfraction{.9}

\renewcommand\textfraction{.1}

\renewcommand\floatpagefraction{0.8}
\renewcommand\dblfloatpagefraction{0.8}


%------------------------------------------------------------------
% New Title page stuff

\newlength{\logo@width}

\newcommand*{\supervisor}[1]{\gdef\@supervisor{#1}}
\newcommand*{\affiliation}[1]{\gdef\@affiliation{#1}}
\newcommand*{\address}[1]{\gdef\@address{#1}}
%\global\let\@affiliation\@empty
\newcommand*{\tdesc}[1]{\gdef\@tdesc{#1}}
\newcommand*{\logo}[2][0pt]{\gdef\@logo{#2}\setlength{\logo@width}{#1}}

\newcommand{\supervisedbyname}{Supervised by}

\renewcommand\maketitle{\begin{titlepage}%
    \let\footnotesize\small
    \let\footnoterule\relax
    \let \footnote \thanks
    \null\vfil
%    \vskip 60\p@
    \begin{center}%
      {\Huge\bf \@title \par}%
      \vskip 3em%
      \ifdim\logo@width>0\p@\relax
      \includegraphics[width=\logo@width]{\@logo}\par%
      \else
      \includegraphics{\@logo}\par%
      \fi
      \vskip 3em%
      {\large\em\@tdesc\par}%
      \vskip 3em%
	     {\Large\sc
	       \lineskip .75em%
	       \begin{tabular}[t]{c}%
		 \@author
	       \end{tabular}\par}%
	     \ifx\@affiliation\@undefined\else(\@affiliation)\fi
	     \vskip 1em%
	     \supervisedbyname\ \@supervisor\par%
	     \vskip 3em%
		    {\large \@date \par}%       % Set date in \large size.
    \end{center}\par
    \vfil%
    \ifx\@address\@undefined\else%
    \begin{center}
      \small \@address
    \end{center}
    \fi\null
  \end{titlepage}%
  \setcounter{footnote}{0}%
  \global\let\thanks\relax
  \global\let\maketitle\relax
  \global\let\@thanks\@empty
  \global\let\@author\@empty
  \global\let\@date\@empty
  \global\let\@title\@empty
  \global\let\title\relax
  \global\let\author\relax
  \global\let\date\relax
  \global\let\and\relax
}

%------------------------------------------------------------------
% Chapter headings from:
% http://zoonek.free.fr/LaTeX/LaTeX_samples_chapter/0.html
% Amended to know about not numbering outside the mainmatter

\def\thickhrulefill{\leavevmode \leaders \hrule height 1ex \hfill
\kern \z@}

\def\@makechapterhead#1{%
  %\vspace*{50\p@}%
  \vspace*{10\p@}%
  {\parindent \z@ \centering \reset@font
    \if@mainmatter
        \thickhrulefill\quad
        {\scshape \@chapapp{} \thechapter}%
        \quad \thickhrulefill
    \else
        \thickhrulefill
    \fi
        \par\nobreak
        \vspace*{10\p@}%
        \interlinepenalty\@M
        \hrule
        \vspace*{10\p@}%
        \Huge \bfseries #1\par\nobreak
        \par
        \vspace*{10\p@}%
        \hrule
    \vskip 40\p@
    %\vskip 100\p@
  }}

\def\@makeschapterhead#1{%
  %\vspace*{50\p@}%
  \vspace*{10\p@}%
  {\parindent \z@ \centering \reset@font
        \thickhrulefill
        \par\nobreak
        \vspace*{10\p@}%
        \interlinepenalty\@M
        \hrule
        \vspace*{10\p@}%
        \Huge \bfseries #1\par\nobreak
        \par
        \vspace*{10\p@}%
        \hrule
    \vskip 40\p@
    %\vskip 100\p@
  }}

%------------------------------------------------------------------
% Sub-appendices separater
% (Customization of subappendices environment in the appendix package)

\newcommand{\appendicesname}{Appendicies}

\newcommand{\subappsep}{
%  \filbreak
  \vspace{2em}\par\noindent
  \thickhrulefill\quad {\scshape \appendicesname}\quad \thickhrulefill
  \@xsect{1em}
}

% Filbreak seems to enforce a page break before the appendices. Would
% like a better way to prevent an orphaned subappsep
% \@xsect is used in latex.ltx at the end of headings, so presumably
% prevents breaking before the following text.

\AtBeginDocument{
  \ifx\subappendices\@undefined%
  \else%
  \let\subappendicesorig\subappendices
  \def\subappendices{%
    \subappsep
    \subappendicesorig
    }
  \fi
}
  

%------------------------------------------------------------------
% Change running page headers so less ugly (remove uppercasing)

\if@twoside
  \def\ps@headings{%
      \let\@oddfoot\@empty\let\@evenfoot\@empty
      \def\@evenhead{\thepage\hfil\slshape\leftmark}%
      \def\@oddhead{{\scshape\rightmark}\hfil\thepage}%
      \let\@mkboth\markboth
    \def\chaptermark##1{%
      \markboth {{%
        \ifnum \c@secnumdepth >\m@ne
          \if@mainmatter
            \@chapapp\ \thechapter. \ %
          \fi
        \fi
        ##1}}{}}%
    \def\sectionmark##1{%
      \markright {{%
        \ifnum \c@secnumdepth >\z@
          \thesection. \ %
        \fi
        ##1}}}}
\else
  \def\ps@headings{%
    \let\@oddfoot\@empty
    \def\@oddhead{{\rightmark}\hfil\thepage}%
    \let\@mkboth\markboth
    \def\chaptermark##1{%
      \markright {{\scshape%
        \ifnum \c@secnumdepth >\m@ne
          \if@mainmatter
            \@chapapp\ \thechapter. \ %
          \fi
        \fi
        }{\itshape ##1}}}}
\fi
\pagestyle{headings}


%------------------------------------------------------------------
% Synopsis environment (like an abstract for each chapter)

\newcommand{\synopsisname}{Synopsis}

\newenvironment{synopsis}{%
%  \small
  \begin{center}%
    {\bfseries \synopsisname\vspace{-.5em}\vspace{\z@}}%
  \end{center}%
  \quotation
}{%
  \endquotation
}

\newenvironment{publish}{%
  \vfil
  \center\small\ignorespaces
  \rule{10em}{0.4pt}\par\noindent\ignorespaces
}{%
  \par\noindent\rule[1ex]{10em}{0.4pt}
  \endcenter
}

%------------------------------------------------------------------
% Redefine Bibliography:

% use unstared chapter heading (if part of backmatter then won't be
% numbered in situ, but can still get toc listing). Also add hook for
% customisable preamble text (eg a quote)

% natbib package already allows these things.
% In document:
%  \renewcommand{\bibsection}{\chapter{\bibname}}
%  \newcommand{\bibpreamble}{FOO}

\AtBeginDocument{%
  \ifx\bibsection\@undefined%
  \else\renewcommand{\bibsection}{%
    \if@mainmatter\chapter*{\bibname}%
  \else\chapter{\bibname}\fi}%
  \fi%
}

%------------------------------------------------------------------
% Fix table of contents to use chapter{} not chapter* so that running
% head is set correctly. It will still appear un-numbered as it
% is used only in 'frontmatter'

\renewcommand\tableofcontents{%
  \if@twocolumn
  \@restonecoltrue\onecolumn \else \@restonecolfalse \fi
  \chapter{\contentsname}
  \@starttoc{toc}%
  \if@restonecol\twocolumn\fi
}

%------------------------------------------------------------------
