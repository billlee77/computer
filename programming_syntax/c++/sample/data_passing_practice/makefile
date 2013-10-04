CC=g++
LDFLAGS=-g -Wall
SOURCES=main.cc data_group_1.cc extern.cc
OBJECTS=$(SOURCES:.cc=.o)


HEAD_DIR=include/
_HEADER=data_group_1.h extern.h

HEADER = $(patsubst %,$(HEAD_DIR)%,$(_HEADER))


SRC_DIR=src/

CLIB=-I$(HEAD_DIR)

EXECUTABLE=main

all: $(EXECUTABLE)
	
$(EXECUTABLE): $(OBJECTS)
	$(CC) -o $@ $(LDFLAGS) $(CLIB) $+

# $^ is the same as $+

%.o: $(SRC_DIR)%.cc $(HEADER)
	$(CC) -c $(LDFLAGS) $(CLIB) $< -o $@  

clean:
	rm -rf *.o main
