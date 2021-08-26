#!/bin/bash

# Script para baixar os áudios da Bíblia em Francês e 
# para extrair as informações necessárias para edição automatizada dos audios.
# Data: 24/08/2021
# Autor: Helio Giroto

# Ver qual tradução baixar: Colombe, Louis...?

# Uma vez escolhida a versão que será baixada - playlist escolhida
PLAYLIST="PLtdR9542LkZaCzDD3dMNapS1-yD-KcaaT"

# pega os NOMES DOS ARQUIVOS que serão baixados da playlist:
youtube-dl -f140 -i --get-filename --skip-download "$PLAYLIST" > files.txt

# pega apenas o NOME DO LIVRO de cada arq:
sed 's/ (.*//' files.txt > nomes.txt

# dos nomes dos arq pega apenas O SUFIXO do YouTube:
## ERRO:
sed 's/.*)-//1; s/\.m4a//' files.txt > sufixos.txt

# pega A DESCRIÇÃO de cada vídeo:
for SUFIXO in $(cat sufixos.txt)
do
	echo $SUFIXO
	youtube-dl --get-description $SUFIXO | grep Chapitre > $SUFIXO.txt
done

# time: real	5m17,395s


# baixa todos os audios:
youtube-dl -f140 $PLAYLIST

# percorre CADA-arq baixado de audio (*.m4a):
	# percorre em SUFIXO de CADA-arq em SUFIXO.txt conf. o total de LINHA's (wc -l):
		# variavel desde=LINHA 	(tempo)
		# variavel ate=LINHA+1	(tempo)

		# ERRO? tz no caso da última linha que não terá linha $ATÉ.
		# assim sendo, no ffmpeg se omite a flag -to ...:

		## if [[ desde -eq $(wc- l SUFIXO.txt) ]] then 
			# ffmpeg em CADA-arq.m4a -ss $desde SUFIXO\ desde.mp3
		  # elif
			# passa ffmpeg em CADA-arq.m4a -ss $desde -to ate SUFIXO\ desde.mp3
		  # fi

# OUTRO ERRO GRAVE:
# for i in *; do head -n1 $i; done
## A primeira linha de cada $sufixo.txt, o cap.1 está assim:
	# Chapitre 1 - 08:50
	# Chapitre 1 - 08:19
	# Chapitre 1 - 05:09

# verificar se 00:00 é a introdução ou se tem erro. (Playlist: Louis Second)



# exemplo:
#   ffmpeg -i filipenses.m4a -ss 00:04:25 -to 00:08:36 copy.mp3



