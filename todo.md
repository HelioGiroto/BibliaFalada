# PARA FAZER

	-OK ## Imagens de capa com o imagemagick

## AUMENTAR O VOLUME DOS AUDIOS DE NVI

## LocalStorage onde parou e o que já leu

## Gráfico e mudança de cor na grade conforme porcentagem de leitura.

## Melhorar CSS do player ??

## div com o texto bíblico impresso tb

## Funções de estatísticas de leitura

	- OK ## junção das duas pastas AT e NT numa só.



### converter m4a para acc. Teste de um só arq:
 2012  #ffmpeg -i Fm\ 1.m4a -acodec copy Fm\ 1.m4a.aac

### converter m4a em acc em lote:
 2020  for i in *.m4a; do ffmpeg -i "$i" -acodec copy "${i}".aac; done

FONTE: https://superuser.com/questions/704493/ffmpeg-convert-m4a-to-mp3-without-significant-loss :

### renomear em lote:
 2028  for i in *; do NOVO=$(echo "$i" | sed 's/.m4a//'); mv "$i" "$NOVO"; done

### Obter metadados de arquivo mp3 (tempo de duração, nome da faixa, etc...):
 2014  ffprobe 2_5391040025066472033.mp3 2>&1 | grep 'title'
 2015  ffprobe 2_5391040025066472033.mp3 2>&1 | grep 'Duration'

### Descobrir quais arquivos faltam ao comparar duas versões da Bíblia:
diff listaACF listaNVI 

