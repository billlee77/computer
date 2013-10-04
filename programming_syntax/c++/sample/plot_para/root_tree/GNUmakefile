CC = g++
CFLAGS = -DLINUXVERS -g -Wall -I$(ROOTSYS)/include -DWITH_DEBUG -I$(ROOTSYS) 
OBJ = my_first_tree

ROOTLIBS = $(shell root-config --glibs)
LIBS = -lnsl -lcrypt -ldl $(ROOTLIBS) -lMinuit -lXt -lX11 -lXpm 

OBJ_PATH = src/

main: $(OBJ).o
	$(CC)  $(LIBS) -o main $(OBJ).o

$(OBJ).o: $(OBJ_PATH)$(OBJ).cc
	$(CC) -c $(CFLAGS) $(OBJ_PATH)$(OBJ).cc

clean:
	rm *.o main
