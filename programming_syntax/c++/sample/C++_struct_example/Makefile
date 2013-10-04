CC=g++
CFLAGS=-Wall -c
LDFLAGS=-g -Wall
SOURCES=struct_test.cc
OBJECTS=$(SOURCES:.cc=.o)
HEADER=$(SOURCES:.cc=.h)

EXECUTABLE=main



all: $(SOURCES) $(EXECUTABLE)
	
$(EXECUTABLE): $(OBJECTS) $(HEADER) 
	$(CC) $(LDFLAGS) $(OBJECTS) -o $@

.cpp.o:
	$(CC) $(CFLAGS) $< -o $@


clean:
	rm -rf *.o main
