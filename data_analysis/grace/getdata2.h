/*
 * Prototypes for table-reading and -writing functions
 */        
int filePutData(const char *name, float *ptr1, float *ptr2, float *ptr3, int max);
int fileGetData(const char *name, float *ptr1, float *ptr2, float *ptr3, int max);
