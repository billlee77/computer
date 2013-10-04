/*
 * Calculate Least Squares Fit to Sample Data
 */
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "getdata2.h"
#include "externals.h"
#include <signal.h>


#define INPUTFILE "temp.data"
#define OUTPUTFILE "fit.data"
#define OUTPUTFILE4 "fit4.data"

#define MAX 100

void quit();

int fileGetData(const char *name, float x[], float y[], float dy[], int max)
{
  int  cnt = 0;
  FILE *fp = fopen(name, "r");

  printf("Opening %s to read at most %i values.\n",name,max);

  if (fp != NULL)
  {
    for (; cnt < max && fscanf(fp, "%f", &x[cnt]) == 1; cnt++)
      {
	fscanf(fp, "%f", &y[cnt]);
	fscanf(fp, "%f", &dy[cnt]);
      }
    fclose(fp);
  }
  return cnt;    /* number of values actually read */
}

int filePutData(const char *name, float x[], float y[], float dy[], int num)
{
  int  cnt = 0;
  FILE *fp = fopen(name, "w");

  if (fp != NULL)
  {
    for (; cnt < num; cnt++)
      fprintf(fp, "%f %f %f\n", x[cnt], y[cnt], dy[cnt]);
    fclose(fp);
  }
  return cnt;       /* assumes write successful */
}

int main()
{
  float x[MAX]; float y[MAX]; float dy[MAX]; float yfit[MAX]; float yfit3[MAX];
  float yfit4[MAX]; float yfit2[MAX]; float dyfit[MAX]; float xfit[MAX];
  int n = 0; int i; int numval; int maxval; int istatus;
  float sigmaa; float sigmab; float delta; float a; float b;
  float xsum = 0.0; float ysum = 0.0; float xysum = 0.0; float sigsum = 0.0;
  float x2sum = 0.0; float chi2 = 0.0; float chi2dof = 0.0; float chi3 = 0.0;
  float chi3dof = 0.0; float chi4 = 0.0; float chi4dof = 0.0; float chi22 = 0.0;
  float chi22dof = 0.0; float pi = 3.14159265; 
  float aa=-9.375; float bb= 23.46; float cc=-3.418; float dd=0.2319; 
  float aaa= 36.56; float bbb= -39.45; float ccc= 21.61; float ddd= -3.516; float eee= 0.1874; 
  float a1= 5.931; float b1= 8.799; float c1= 0.06093; float inc;

  maxval=MAX;

  numval=fileGetData(INPUTFILE, x, y, dy, maxval);
  printf("I read in %i entries.\n",numval);
  for ( i=0; i<=(numval-1); i++)
    {
      xsum+=x[i]/pow(dy[i],2);
      ysum+=y[i]/pow(dy[i],2);
      xysum+=x[i]*y[i]/pow(dy[i],2);
      sigsum+=1/pow(dy[i],2);
      x2sum+=pow(x[i],2)/pow(dy[i],2);
    }
  delta = sigsum*x2sum-pow(xsum,2);
  a = 1.0/delta*(x2sum*ysum-xsum*xysum);
  b = 1.0/delta*(sigsum*xysum-xsum*ysum);

  printf("The xsum is %f.\n",xsum);
  printf("The ysum is %f.\n",ysum);
  printf("The xysum is %f.\n",xysum);
  printf("The sigsum is %f.\n",sigsum);
  printf("The x2sum is %f.\n",x2sum);
  printf("The value of delta is %f.\n",delta);

  sigmaa=sqrt(1.0/delta*x2sum);
  sigmab=sqrt(1.0/delta*sigsum);

  printf("The value of a is %2.2f +/- %2.2f.\n",a,sigmaa);
  printf("The value of b is %2.2f +/- %2.2f.\n",b,sigmab);

  for ( i=0; i<=(numval-1); i++)
    {
      yfit[i]=a+b*x[i];
      dyfit[i]=0.0;
      chi2+=pow(((y[i]-yfit[i])/dy[i]),2);
      yfit3[i]=aa+bb*x[i]+cc*pow(x[i],2)+dd*pow(x[i],3);
      chi3+=pow(((y[i]-yfit3[i])/dy[i]),2);
      yfit4[i]=aaa+bbb*x[i]+ccc*pow(x[i],2)+ddd*pow(x[i],3)+eee*pow(x[i],4);
      chi4+=pow(((y[i]-yfit4[i])/dy[i]),2);
      yfit2[i]=a1+b1*x[i]+c1*pow(x[i],2);
      chi22+=pow(((y[i]-yfit2[i])/dy[i]),2);
    }
  
  chi2dof=chi2/(numval-2);
  chi3dof=chi3/(numval-4);
  chi4dof=chi4/(numval-5);
  chi22dof=chi22/(numval-3);

  printf("Linear Chi2/(Chi2/dof)/F = %f %f %f.\n",chi2,chi2dof,chi2dof/chi2dof);
  printf("Quad   Chi2/(Chi2/dof)/F = %f %f %f.\n",chi22,chi22dof,chi22dof/chi2dof);
  printf("Cubic  Chi2/(Chi2/dof)/F = %f %f %f.\n",chi3,chi3dof,chi3dof/chi2dof);
  printf("4th    Chi2/(Chi2/dof)/F = %f %f %f.\n",chi4,chi4dof,chi4dof/chi2dof);
    
  for ( i=0; i<100; i++)
    {
      xfit[i]=(i+1.0)/10.0;
      yfit[i]=a+b*xfit[i];
      dyfit[i]=0.0;
      yfit4[i]=aaa+bbb*xfit[i]+ccc*pow(xfit[i],2)+
	ddd*pow(xfit[i],3)+eee*pow(xfit[i],4);
    }

  istatus=filePutData(OUTPUTFILE,xfit,yfit,dyfit,MAX);
  istatus=filePutData(OUTPUTFILE4,xfit,yfit4,dyfit,MAX);

  printf("Plotting ....\n");

  StartPlot();
  PlotOne();
  signal(SIGINT,quit); /* trap ctrl-c call quit fn */
  for (inc=0;;inc+0.01)
    {
      ;
    }
      
  return EXIT_SUCCESS;
}

void quit()
{  printf("\nctrl-c caught:\n Shutting down pipes\n");
   StopPlot();
   
   printf("deleting data files\n");
   RemoveDat();
}

