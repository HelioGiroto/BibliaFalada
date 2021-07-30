#!/bin/bash
# Este script extrairá a quantidade de tempo em segundos de cada arquivo de áudio da pasta.
# Autor: Hélio Giroto

# percorre todos os arquivos mp3 do diretório atual:
for ARQ in *.mp3
do
	# obtem tempo do audio no formato hh:mm:ss.xx
	TEMPO=$( ffmpeg -i "$ARQ" 2>&1 | grep Duration | cut -d',' -f1 | cut -d' ' -f4 )

	# obtem qtde de horas:
	HORAS=$( echo $TEMPO | cut -d':' -f1 )

	# obtem qtde de minutos:
	MINUTOS=$( echo $TEMPO | cut -d':' -f2 )

	# obtem qtde de segundos:
	SEGUNDOS=$( echo $TEMPO | cut -d':' -f3 )

	# calcula o total em segundos:
	TOTAL=$( echo "($HORAS * 3600) + ($MINUTOS * 60) + $SEGUNDOS" | bc )

	# resultado sai em tela e tb em arquivo (appendando):
	echo "$ARQ;$TEMPO;$TOTAL" | tee -a planilha.csv
done

# imprime total em minutos e horas:

TOTAL_EM_MINUTOS=$( awk -F';' '{tot=tot+$3}END{print tot}' planilha.csv )
echo "Duração total de todos áudios em minutos: $TOTAL_EM_MINUTOS" | tee -a planilha.csv

TOTAL_EM_HORAS=$( echo "$TOTAL_EM_MINUTOS / 3600" | bc )
echo "Duração total de todos áudios em horas: $TOTAL_EM_HORAS" | tee -a planilha.csv

# Não funciona, pq a cada 24 horas, ele retorna a 0 o valor de %H:
# date -d@310000 -u +%T

echo "Finalizado"
echo "----------"

