#!/usr/bin/perl
#
# genpw.pl
# Craig Perry
# 4th Apr 2007
#
# Generate a PW list of a specific format.
#

use strict;

# Change to suit the first 4 letters, keep space seperated
my @first_four = qw/ f F /;
my @second_four = qw/ u U /;
my @third_four = qw/ l L /;
my @fourth_four = qw/ l L /;

my @alphabet = qw/ a b c d e f g h i j k l m n o p q r s t u v w x y z
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z /;

for my $four1 ( @first_four ){
for my $four2 ( @second_four ){
for my $four3 ( @third_four ){
for my $four4 ( @fourth_four ){
for my $letter1 ( @alphabet ) {
for my $letter2 ( @alphabet ) {
for my $letter3 ( @alphabet ) {

# Generate digits from 00 to 99
for my $tail_digit ( 0..99 ) {
printf "%s%02d\n", $four1 . $four2 . $four3 . $four4 . $letter1 . $letter2 . $letter3, $tail_digit;
}

}
}
}
}
}
}
}

