#!/bin/bash

# Script que cria automaticamente as imagens de capa de podcast de acordo com o nome e nro de capítulo do livro da Bíblia.
# Autor: Hélio Giroto
# Data: 12/04/2021


# Variáveis de nome do livro, abreviação e qtde de capítulos de cada:
LIVRO=("" "Gênesis" "Êxodo" "Levítico" "Números" "Deuteronômio" "Josué" "Juízes" "Rute" "1 Samuel" "2 Samuel" "1 Reis" "2 Reis" "1 Crônicas" "2 Crônicas" "Esdras" "Neemias" "Ester" "Jó" "Salmos" "Provérbios" "Eclesiastes" "Cânticos" "Isaías" "Jeremias" "Lamentações" "Ezequiel" "Daniel" "Oséias" "Joel" "Amós" "Obadias" "Jonas" "Miquéias" "Naum" "Habacuque" "Sofonias" "Ageu" "Zacarias" "Malaquias" "Mateus" "Marcos" "Lucas" "João" "Atos" "Romanos" "1 Coríntios" "2 Coríntios" "Gálatas" "Efésios" "Filipenses" "Colossenses" "1 Tessalonicenses" "2 Tessalonicenses" "1 Timóteo" "2 Timóteo" "Tito" "Filemom" "Hebreus" "Tiago" "1 Pedro" "2 Pedro" "1 João" "2 João" "3 João" "Judas" "Apocalipse")
ABREV=("" "Gn" "Ex" "Lv" "Nm" "Dt" "Js" "Jz" "Rt" "1Sm" "2Sm" "1Rs" "2Rs" "1Cr" "2Cr" "Ed" "Ne" "Et" "Jó" "Sl" "Pv" "Ec" "Ct" "Is" "Jr" "Lm" "Ez" "Dn" "Os" "Jl" "Am" "Ob" "Jn" "Mq" "Na" "Hc" "Sf" "Ag" "Zc" "Ml" "Mt" "Mc" "Lc" "Jo" "At" "Rm" "1Co" "2Co" "Gl" "Ef" "Fp" "Cl" "1Ts" "2Ts" "1Tm" "2Tm" "Tt" "Fm" "Hb" "Tg" "1Pe" "2Pe" "1Jo" "2Jo" "3Jo" "Jd" "Ap")
QTDE_CAP=('' 50 40 27 36 34 24 21 4 31 24 22 25 29 36 10 13 10 42 150 31 12 8 66 52 5 48 12 14 3 9 1 4 7 3 3 3 2 14 4 28 16 24 21 28 16 16 13 6 6 4 4 5 3 6 4 3 1 13 5 5 3 5 1 1 1 22)


# Dois laços aninhados que percorrerá cada livro criando X imagens (X = qtde de capítulos):
for CADALIVRO in $(seq 66)
do	

	for CAP in $(seq ${QTDE_CAP[CADALIVRO]})
	do
		echo "Gerando imagem de ${LIVRO[CADALIVRO]} capítulo: $CAP"
		# Arquivo de origem: bibliaY.jpg (Tamanho: 896 X 537 pixels)
		# Nome do $LIVRO centralizado a Norte. Fonte: Lato-Black, 100, com contorno.
		# Nro do $CAP [-ítulo] centralizado a Sul. Fonte 150.
		# Saída de arquivo: #LIVRO-$CAP.png

		# -annotate +x+y   (coordenadas)
		# Qto maior o nro mais afastado do ponto cardeal (definido anteriormente em -gravity)

		convert bibliaY.jpg \
			-gravity north \
			-pointsize 100 \
			-font Lato-Black -stroke black -strokewidth 2 \
			-fill gold -annotate +0+80 "${LIVRO[CADALIVRO]}" \
			-gravity south \
			-pointsize 150 \
			-fill gold -annotate +0+140 "$CAP" \
			capas/"${ABREV[CADALIVRO]}"-"$CAP".png

	done

done


