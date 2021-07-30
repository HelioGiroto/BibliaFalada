#!/bin/bash
# Script para mudar os nomes dos arquivos m4a baixados pelo youtube-dl
# Renomeia arquivo de áudio com nome em espanhol para abreviatura correspondente em português
# Autor: Hélio Giroto


# 1. RETIRA O "SUFIXO" DESNECESSÁRIO DOS NOMES:

	# ANTES (modelo de como era os nomes dos arquivos):
		# "Gálatas 6 Reina Valera 1909-bXINkVcHjh4.m4a"

	# testes:
	#  ls | sed 's/ Reina Valera 1909-.*/.m4a/' 
	#  for i in *; do NOVO=$(echo "$i" | sed 's/ Reina Valera 1909-.*/.m4a/'); echo $NOVO; done

	# comando:
	#  for i in *; do NOVO=$(echo "$i" | sed 's/ Reina Valera 1909-.*/.m4a/'); mv "$i" "$NOVO"; done


# 2. MUDA NOMES EM ESPANHOL PARA ABREVIATURA EM PORTUGUÊS CONFORME O "BIBLIAFALADA" ACEITA:

LIBRO=("_" "Génesis" "Éxodo" "Levítico" "Números" "Deuteronomio" "Josué" "Jueces" "Rut" "1 Samuel" "2 Samuel" "1 Reyes" "2 Reyes" "1 Crónicas" "2 Crónicas" "Esdras" "Nehemías" "Ester" "Job" "Salmos" "Proverbios" "Eclesiastés" "Cantares" "Isaías" "Jeremías" "Lamentaciones" "Ezequiel" "Daniel" "Oseas" "Joel" "Amós" "Abdías" "Jonás" "Miqueas" "Nahum" "Habacuc" "Sofonías" "Hageo" "Zacarías" "Malaquías" "Mateo" "Marcos" "Lucas" "Juan" "Hechos" "Romanos" "1 Corintios" "2 Corintios" "Gálatas" "Efesios" "Filipenses" "Colosenses" "1 Tesalonicenses" "2 Tesalonicenses" "1 Timoteo" "2 Timoteo" "Tito" "Filemón" "Hebreos" "Santiago" "1 Pedro" "2 Pedro" "1 Juan" "2 Juan" "3 Juan" "Judas" "Apocalipsis")

ABREV=("_" "Gn" "Ex" "Lv" "Nm" "Dt" "Js" "Jz" "Rt" "1Sm" "2Sm" "1Rs" "2Rs" "1Cr" "2Cr" "Ed" "Ne" "Et" "Jó" "Sl" "Pv" "Ec" "Ct" "Is" "Jr" "Lm" "Ez" "Dn" "Os" "Jl" "Am" "Ob" "Jn" "Mq" "Na" "Hc" "Sf" "Ag" "Zc" "Ml" "Mt" "Mc" "Lc" "Jo" "At" "Rm" "1Co" "2Co" "Gl" "Ef" "Fp" "Cl" "1Ts" "2Ts" "1Tm" "2Tm" "Tt" "Fm" "Hb" "Tg" "1Pe" "2Pe" "1Jo" "2Jo" "3Jo" "Jd" "Ap")


	# 2.1 EXECUTA NOVAMENTE O SCRIPT PARA RENOMEAR ESTES ABAIXO:
		# Há um espaço antes do nome para que o nome fique assim: 1Ts, 1Pe, etc...
	# LIBRO=("_" "Samuel" "Reyes" "Crónicas" "Corintios" "Tesalonicenses" "Timoteo" "Pedro" "Juan")

	# ABREV=("_" "Sm" "Rs" "Cr" "Co" "Ts" "Tm" "Pe" "Jo")


# para cada item (de 1 a 67) do array de nomes de livros da Bíblia:
# for ITEM in $(seq 67)
for ITEM in $(seq 8)
do
	# percorre todos os arquivos de áudio da pasta...
	for ARQ in *
	do
		# ...e muda o nome do arquivo para abrev (que corresponda ao mesmo nro do item):
		NOVO=$(echo "$ARQ" | sed 's/'${LIBRO[ITEM]}'/'${ABREV[ITEM]}'/')
		#
		mv "$ARQ" "$NOVO"
	done
done


# 3. TIRA O ESPAÇO EM BRANCO ENTRE O NRO DA EPÍSTOLA/LIVRO E O NOME:
	# Ex.: 1 Co 3.m4a muda para: 1Co 3.m4a

	# Teste:
	#  for i in *; do NOVO=$(echo "$i" | sed 's/^1 /1/'); echo $NOVO; done

	# Executa:
	#  for i in *; do NOVO=$(echo "$i" | sed 's/^1 /1/'); mv "$i" "$NOVO"; done
	#  for i in *; do NOVO=$(echo "$i" | sed 's/^2 /2/'); mv "$i" "$NOVO"; done
	#  for i in *; do NOVO=$(echo "$i" | sed 's/^3 /3/'); mv "$i" "$NOVO"; done
 

# 4. CONVERTE DE M4A PARA MP3 EM LOTE:
	# for i in *.m4a; do ffmpeg -i "$i" -codec:v copy -codec:a libmp3lame -q:a 0 ../mp3/"$i".mp3; done

# 5. ALTERA PARA NOMES CORRETOS:
	# 2Sm 15.m4a.mp3 para 2Sm 15.mp3
	# teste:
	#  for i in *; do NOVO=$(echo "$i" | sed 's/\.m4a//'); echo $NOVO; done
	# comando:
	#  for i in *; do NOVO=$(echo "$i" | sed 's/\.m4a//'); mv "$i" "$NOVO"; done
	   

# 6. RETIRA QUALQUER METADADO POSSIVEL DE CADA ÁUDIO:
	# id3info audio.mp3 
 	# id3convert -s *.mp3

# 7. SUBIR PARA GITHUB
	# executar script: 
	# bash gitPush Automatizado.sh





