#!/bin/bash
# script to send simple email
# email subject

SUBJECT="Job is finished"
# Email To ?
EMAIL="wenliang.billlee@gmail.com"

# Email text/message
EMAILMESSAGE="/home/billlee/bin/job_finished"

echo "Job is finished"> $EMAILMESSAGE
echo "Job is finished" >>$EMAILMESSAGE

# send an email using /bin/mail
/bin/mail -s "$SUBJECT" "$EMAIL" < $EMAILMESSAGE
 
rm $EMAILMESSAGE
