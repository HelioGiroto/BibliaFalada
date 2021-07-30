# PARA FAZER (TO DO):

## URL: https://heliogiroto.github.io/BibliaFalada/

- Grade do nome do livro **colorida** num gradiente correspondente ao percentual de audição.

- Melhorar a grade de **abreviaturas** dos nomes dos livros: Tb nomes completos ou input para busca - ???

- Função **EXPORTAR** localStorage de uma máquina para outra que abra o link personalizado (.com/?...&...)

- Atalho para **RESETAR** a lista de capítulosOuvidos do localStorage


### Opções do menú:

- **Pausa automática** em x minutos.

- Meu **desempenho** (gráficos).

- Checkboxes dos capítulos **lidos**

- **Compartilhar** esse site...

- **Apoie!**

- Icones das **redes**: Github tb (código fonte)

- Reportar **erro** para o desenvolvedor

- Ouça a **Rádio J24h**!


- BASH: AUMENTAR O VOLUME DOS AUDIOS DE NVI

- Div com o texto bíblico impresso tb (?)

---

### Desempenho:

- Funções de **estatísticas** de audição:
	- Vc já ouviu X caps.
	- Faltam Y caps.	**- Pizza**.
	- Faltam Z Horas: Minutos para terminar...
	- Gráfico do mês atual
	- Gráfico do mês passado... antepassado...
	- Gráfico dos últimos 10 dias.

- Gráfico e mudança de cor NA GRADE DE CAPÍTULOS conforme porcentagem de leitura: https://developers.google.com/chart/interactive/docs/gallery/piechart 	
	- CDN Google Charts baixado: *loader.js*

---


- ~Responsivo para PC.~

- ~LocalStorage onde parou e o que já leu~

- ~Velocidade de play~

- ~Tradução para espanhol - Menú e nome dos livros.~

- ~Melhorar CSS e visual novo~



## Comandos usados e observações sobre o código:

### SOBRE AS VARIÁVEIS DE ACUMULADORES DE TEMPO DE AUDIÇÃO - Métricas:
- O Tempo Total (localStorage.getItem('tempoAudicao'):
	- Se refere ao total de tempo de faixas não repetidas ouvidas completamente.

- O Tempo Diário (JSON.parse(localStorage.getItem('biblia-mes-07'))[22]):
	- Se refere ao total de tempo DIÁRIO de faixas repetidas ou não que o usuário ouviu, mesmo sem ser completas.
	- Portanto, essa variável é computada mesmo se o usuário avance ou retroceda antes de ouvir completamente uma faixa.


### link para ouvir uma faixa no github:
	- https://heliogiroto.github.io/BibliaFalada/audios/RV/Mt%204.mp3



### converter m4a para acc ou mp3. Teste de um só arq:
~~~bash
	ffmpeg -i arq.m4a -acodec copy arq.aac
	ffmpeg -i arq.m4a -acodec libmp3lame -ab 256k output.mp3
~~~

### converter m4a em acc e mp3 em lote:
FONTE: https://superuser.com/questions/704493/ffmpeg-convert-m4a-to-mp3-without-significant-loss :
~~~bash
 	for i in *.m4a; do ffmpeg -i "$i" -acodec copy "${i}".aac; done

	for i in *.m4a; do ffmpeg -i "$i" -codec:v copy -codec:a libmp3lame -q:a 2 ../mp3/"${i}.mp3"; done
	for i in *.m4a; do ffmpeg -i "$i" -codec:v copy -codec:a libmp3lame -q:a 0 ../mp3/"$i".mp3; done    # usei esse!
	for i in *.m4a; do ffmpeg -i "$i" -acodec libmp3lame -ab 256k ../mp3/"$i".mp3; done
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
	ffmpeg -i audio.mp3 2>&1 | grep Duration

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


### Baixar playlist do YouTube a partir de certo nro de item da lista:
~~~bash
	youtube-dl -f140 --playlist-start 293  https://www.youtube.com/playlist?list=PL3aVKqLhcR7W-PUzBT2_cOifNPQIh-SDp
~~~


