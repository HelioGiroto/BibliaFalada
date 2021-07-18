# PARA FAZER

## URL: https://heliogiroto.github.io/BibliaFalada/

- [] Responsivo para PC.

- [] AUMENTAR O VOLUME DOS AUDIOS DE NVI

- [] LocalStorage onde parou e o que já leu

- [] Gráfico e mudança de cor na grade conforme porcentagem de leitura.

- [] Reportar erro

- [] Melhorar CSS do player ??

- [] Div com o texto bíblico impresso tb

- [] Funções de estatísticas de leitura

- [] Icones das redes: Github tb (código fonte)

- [] Apoie!



### converter m4a para acc. Teste de um só arq:
~~~bash
	ffmpeg -i Fm\ 1.m4a -acodec copy Fm\ 1.m4a.aac
~~~

### converter m4a em acc em lote:
FONTE: https://superuser.com/questions/704493/ffmpeg-convert-m4a-to-mp3-without-significant-loss :
~~~bash
 	for i in *.m4a; do ffmpeg -i "$i" -acodec copy "${i}".aac; done
~~~

### converter stereo em mono:
FONTE: https://trac.ffmpeg.org/wiki/AudioChannelManipulation
~~~bash
	ffmpeg -i Tg1.mp3 -ac 1 mono_Tg1.mp3
~~~

### renomear em lote:
~~~bash
	for i in *; do NOVO=$(echo "$i" | sed 's/.m4a//'); mv "$i" "$NOVO"; done
~~~

### Obter metadados de arquivo mp3 (tempo de duração, nome da faixa, etc...):
~~~bash
	ffprobe 2_5391040025066472033.mp3 2>&1 | grep 'title'
 	ffprobe 2_5391040025066472033.mp3 2>&1 | grep 'Duration'
~~~

### Descobrir quais arquivos faltam ao comparar duas versões da Bíblia:
~~~bash
	diff listaACF listaNVI 
~~~


### Para obter informações do metadata e para limpar as mesmas:
~~~bash
	id3info audio.mp3 
 	id3convert -s *.mp3 
~~~

### Obter metadados de um arquivo mp3:
~~~bash
	ffprobe 2_5391040025066472033.mp3 2>&1 | grep 'title'
	ffprobe 2_5391040025066472033.mp3 2>&1 | grep 'Duration'
~~~



