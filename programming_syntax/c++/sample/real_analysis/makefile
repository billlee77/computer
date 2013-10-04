CC = g++
CFLAGS = -c

CXXFLAGS = -DLINUXVERS -g -Wall -I$(ROOTSYS)/include -DWITH_DEBUG
LDFLAGS =
ROOTLIBS = $(shell root-config --glibs) 
LIBS = -lnsl -lcrypt -ldl $(ROOTLIBS) -lMinuit $(XLIB) -lXt -lX11 -lXpm 

SOURCES = main.cc real_mirror_measurement.cc data_io.cc
HEADER = real_mirror_measurement.h data_io.h


# #*********************************************
# # First method of makefile

OBJECTS = $(SOURCES:.c=.o)
EXECUTABLE = main

all: $(SOURCES) $(EXECUTABLE)

#	$(CC) -lm -o $(EXECUTABLE) $(OBJECTS) $@
$(EXECUTABLE): $(OBJECTS)
	$(CC) -lm -o $(EXECUTABLE) $(OBJECTS) $(LIBS) $(CXXFLAGS)

#	$(CC) -lm $(EXECUTABLE) $(OBJECTS) -o $@

.c.o:
	$(CC) $(CFLAGS) $< -o  $(EXECUTABLE) $(OBJECTS) $(LIBS) $(HEADER) $(CXXFLAGS) $@ 

clean:
	rm -f $(EXECUTABLE) *.o


