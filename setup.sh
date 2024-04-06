#!bin/bash

printf "Enter the starting week:   "
read starting_week

printf "Enter the ending week:    "
read ending_week



echo $starting_week
echo $ending_week

for i in $(seq $starting_week $ending_week);
do
    cp -a ./template "./week-$i"
done


echo Set up complete!
