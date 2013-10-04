CC = gcc
CFLAGS = -c
LDFLAGS =
SOURCES = set_main_mirror.c draw_mirror.c get_next_ray.c intersect_main_mirror.c follow_ray_out.c hit_pmt.c reposition_fpoint.c raytr.c

# #*********************************************
# # First method of makefile

OBJECTS = $(SOURCES:.c=.o)
EXECUTABLE = raytr

all: $(SOURCES) $(EXECUTABLE)

#	$(CC) -lm -o $(EXECUTABLE) $(OBJECTS) $@
$(EXECUTABLE): $(OBJECTS)
	$(CC) -lm -o $(EXECUTABLE) $(OBJECTS) 

#	$(CC) -lm $(EXECUTABLE) $(OBJECTS) -o $@

.c.o:
	$(CC) $(CFLAGS) $< -o $@

clean:
	rm -f $(EXECUTABLE) *.o





# #*********************************************
# #Second method of makefile
# #
# #
# 
# OBJECTS = raytr.o set_main_mirror.o draw_mirror.o get_next_ray.o intersect_main_mirror.o follow_ray_out.o hit_pmt.o reposition_fpoint.o
# 
# all: raytr
# 
# raytr: $(OBJECTS)
# 	$(CC) -lm -o raytr $(OBJECTS) 
# 
# #	$(CC) -ml -o raytr raytr.o set_main_mirror.o draw_mirror.o get_next_ray.o intersect_main_mirror.o follow_ray_out.o hit_pmt.o reposition_fpoint.o 
# 
# set_main_mirror.o: set_main_mirror.c
# 	$(CC) $(CFLAGS) $<
# 	
# draw_mirror.o: draw_mirror.c
# 	$(CC) $(CFLAGS) $<
# 	
# get_next_ray.o: get_next_ray.c
# 	$(CC) $(CFLAGS) $<
# 	
# intersect_main_mirror.o: intersect_main_mirror.c
# 	$(CC) $(CFLAGS) $<
# 	
# follow_ray_out.o: follow_ray_out.c
# 	$(CC) $(CFLAGS) $<
# 
# hit_pmt.o: hit_pmt.c
# 	$(CC) $(CFLAGS) $<
# 
# reposition_fpoint.o: reposition_fpoint.c
# 	$(CC) $(CFLAGS) $<
# #	echo '$<'
# 
# raytr.o: raytr.c
# 	$(CC) $(CFLAGS) $<
# 	
# 
# clean:
# 	rm -f raytr *.o
# 

