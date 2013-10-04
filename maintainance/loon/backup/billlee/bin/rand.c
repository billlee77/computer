/* This routine returns two random numbers, based on the system clock */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <time.h>

void sow(int *, int *);

int main()
{
  int ij1, ij2;

  sow(&ij1, &ij2);
  printf("%11d%11d\n", ij1, ij2);

  return 0;
}

/*   The sow() procedure calculates two seeds for use with the random number
 *   generator from the system clock.  I decided how to do this myself, and
 *   I am sure that there must be better ways to select seeds; hopefully,
 *   however, this is good enough.  The first seed is calculated from the values
 *   for second, minute, hour, and year-day; weighted with the second most
 *   significant and year-day least significant.  The second seed weights the
 *   values in reverse.
 **/

void sow(int *seed1, int *seed2)
{
  struct tm *tm_now;
	
  float s_sig, s_insig, maxs_sig, maxs_insig;
  long secs_now;
  int s, m, h, d, s1, s2;
  
  time(&secs_now);
  tm_now = localtime(&secs_now);
  
  s = tm_now->tm_sec + 1;
  m = tm_now->tm_min + 1;
  h = tm_now->tm_hour + 1;
  d = tm_now->tm_yday + 1;
  
  maxs_sig   = (float)(60.0 + 60.0/60.0 + 24.0/60.0/60.0 +
		       366.0/24.0/60.0/60.0);
  maxs_insig = (float)(60.0 + 60.0*60.0 + 24.0*60.0*60.0 +
		       366.0*24.0*60.0*60.0);
  
  s_sig      = (float)(s + m/60.0 + h/60.0/60.0 + d/24.0/60.0/60.0);
  s_insig    = (float)(s + m*60.0 + h*60.0*60.0 + d*24.0*60.0*60.0);
  
  /*  
  s1 = (int)(s_sig   / maxs_sig   * 31328.0);
  s2 = (int)(s_insig / maxs_insig * 30081.0); 
*/
  s1 = (int)(s_sig   / maxs_sig   * 999999999.);
  s2 = (int)(s_insig / maxs_insig * 999999999.);

  *seed1 = s1;
  *seed2 = s2;
}
