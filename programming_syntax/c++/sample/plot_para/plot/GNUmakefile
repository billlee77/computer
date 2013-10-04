CC = g++

OBJ_PATH = src/

ROOTLIBS = $(shell root-config --glibs)
LIBS = -lnsl -lcrypt -ldl $(ROOTLIBS) -lMinuit -lXt -lX11 -lXpm 


HEAD = read_data.h plot.h

OBJ = read_data.o plot.o main.o

SRC = src/main.cc src/read_data.cc src/plot.cc 

CFLAGS = -DLINUXVERS -g -Wall -I$(ROOTSYS)/include -DWITH_DEBUG -I$(ROOTSYS) 
VPATH = src

# main:  $(OBJ).o
# 	$(CC)  $(LIBS) -o main $(OBJ).o
# 
# $(OBJ).o: $(OBJ_PATH)$(OBJ).cc $(OBJ_PATH)$(HEAD)
# 	$(CC) -c $(CFLAGS) $(OBJ_PATH)$(OBJ).cc
#
#
# 
# $(OBJ).o: $(OBJ_PATH)$(OBJ).cc $(HEAD) 
# 	$(CC) -c $(CFLAGS) $(OBJ_PATH)$(OBJ).cc

all:	main

main	:	$(SRC)	$(OBJ)
	$(CC) -o main $(OBJ) $(LIBS)

main.o:$(OBJ_PATH)main.cc $(HEAD)
	$(CC) -c $(CFLAGS) $(OBJ_PATH)main.cc

read_data.o:$(OBJ_PATH)read_data.cc $(HEAD)
	$(CC) -c $(CFLAGS) $(OBJ_PATH)read_data.cc

plot.o:$(OBJ_PATH)plot.cc $(HEAD)
	$(CC) -c $(CFLAGS) $(OBJ_PATH)plot.cc



clean:
	rm *.o main
