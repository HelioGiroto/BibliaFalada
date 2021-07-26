#!/bin/bash
# TESTANDO PARA VER SE O NRO DE CAPÍTULOS ESTÁ CORRETO COM CADA LIVRO!!!

# ENGLISH
BOOK=()

# ESPAÑOL
LIBRO=("" "Génesis" "Éxodo" "Levítico" "Números" "Deuteronomio" "Josué" "Jueces" "Rut" "1 Samuel" "2 Samuel" "1 Reyes" "2 Reyes" "1 Crónicas" "2 Crónicas" "Esdras" "Nehemías" "Ester" "Job" "Salmos" "Proverbios" "Eclesiastés" "Cantares" "Isaías" "Jeremías" "Lamentaciones" "Ezequiel" "Daniel" "Oseas" "Joel" "Amós" "Abdías" "Jonás" "Miqueas" "Nahum" "Habacuc" "Sofonías" "Hageo" "Zacarías" "Malaquías" "Mateo" "Marcos" "Lucas" "Juan" "Hechos" "Romanos" "1 Corintios" "2 Corintios" "Gálatas" "Efesios" "Filipenses" "Colosenses" "1 Tesalonicenses" "2 Tesalonicenses" "1 Timoteo" "2 Timoteo" "Tito" "Filemón" "Hebreos" "Santiago" "1 Pedro" "2 Pedro" "1 Juan" "2 Juan" "3 Juan" "Judas" "Apocalipsis")

ABREVIACION=("" "Gn" "Ex" "Lv" "Nm" "Dt" "Jos" "Jue" "Rt" "1S" "2S" "1R" "2R" "1Cr" "2Cr" "Esd" "Neh" "Est" "Job" "Sal" "Pr" "Ec" "Cnt" "Is" "Jer" "Lm" "Ez" "Dn" "Os" "Jl" "Am" "Ab" "Jon" "Mi" "Nah" "Hab" "Sof" "Hag" "Zac" "Mal" "Mt" "Mc" "Lc" "Jn" "Hch" "Ro" "1Co" "2Co" "Gl" "Ef" "Fil" "Col" "1Ts" "2Ts" "1Ti" "2Ti" "Tit" "Flm" "He" "Stg" "1P" "2P" "1Jn" "2Jn" "3Jn" "Jud" "Ap")


# PORTUGUÊS
LIVRO=("" "Gênesis" "Êxodo" "Levítico" "Números" "Deuteronômio" "Josué" "Juízes" "Rute" "1 Samuel" "2 Samuel" "1 Reis" "2 Reis" "1 Crônicas" "2 Crônicas" "Esdras" "Neemias" "Ester" "Jó" "Salmos" "Provérbios" "Eclesiastes" "Cânticos" "Isaías" "Jeremias" "Lamentações" "Ezequiel" "Daniel" "Oséias" "Joel" "Amós" "Obadias" "Jonas" "Miquéias" "Naum" "Habacuque" "Sofonias" "Ageu" "Zacarias" "Malaquias" "Mateus" "Marcos" "Lucas" "João" "Atos" "Romanos" "1 Coríntios" "2 Coríntios" "Gálatas" "Efésios" "Filipenses" "Colossenses" "1 Tessalonicenses" "2 Tessalonicenses" "1 Timóteo" "2 Timóteo" "Tito" "Filemom" "Hebreus" "Tiago" "1 Pedro" "2 Pedro" "1 João" "2 João" "3 João" "Judas" "Apocalipse")

ABREV=("" "Gn" "Ex" "Lv" "Nm" "Dt" "Js" "Jz" "Rt" "1Sm" "2Sm" "1Rs" "2Rs" "1Cr" "2Cr" "Ed" "Ne" "Et" "Jó" "Sl" "Pv" "Ec" "Ct" "Is" "Jr" "Lm" "Ez" "Dn" "Os" "Jl" "Am" "Ob" "Jn" "Mq" "Na" "Hc" "Sf" "Ag" "Zc" "Ml" "Mt" "Mc" "Lc" "Jo" "At" "Rm" "1Co" "2Co" "Gl" "Ef" "Fp" "Cl" "1Ts" "2Ts" "1Tm" "2Tm" "Tt" "Fm" "Hb" "Tg" "1Pe" "2Pe" "1Jo" "2Jo" "3Jo" "Jd" "Ap")


QTDE_CAP=('' 50 40 27 36 34 24 21 4 31 24 22 25 29 36 10 13 10 42 150 31 12 8 66 52 5 48 12 14 3 9 1 4 7 3 3 3 2 14 4 28 16 24 21 28 16 16 13 6 6 4 4 5 3 6 4 3 1 13 5 5 3 5 1 1 1 22)

# renomear de nome em espanhol para abreviatura

for CADALIVRO in $(seq 66)
do	
	echo $(paste ${LIVRO[CADALIVRO]} ${QTDE_CAP[CADALIVRO]})
done





