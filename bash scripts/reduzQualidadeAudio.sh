#!/bin/bash

for i in $(ls *.m4a)
do
	time ffmpeg -i $i -codec:a libmp3lame -b:a 128k 128-$i
done

