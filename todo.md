# PARA FAZER (TO DO):

## URL: https://heliogiroto.github.io/BibliaFalada

- Celular landscape - verificar CSS (responsividade).

- Verificar **tradução** das janelas do **menú**.

- Grade do nome do livro **colorida** num gradiente **conforme** ao percentual de audição.

- Melhorar a grade de **abreviaturas** dos nomes dos livros: Tb nomes completos para tablets e desktop ou input para busca - ???

- Função **EXPORTAR** localStorage de uma máquina para outra que abra o link personalizado (.com/?...&...)

- Atalho para **RESETAR** a lista de capítulosOuvidos do localStorage (apagar histórico de cap. ouvidos) - Pedir confirmação no prompt.


### Opções do menú:

- "Meu **desempenho**" (gráficos).

	- Checkboxes dos capítulos **lidos**

- **Mais** recursos... (details tags):

	- **Exportar** histório de capítulos ouvidos
	
	- Ouça a **Rádio J24h**!

	- **Apoie!** esse trabalho.
	
	- Reportar **erro** para o desenvolvedor

	- Ver código fonte - Github tb 


### Desempenho do usuário (suas métricas):

- Funções de **estatísticas** de audição:
	- ALERTA: "Faz x dias/semanas/meses que vc não ouve..."; "Parabéns!!"; etc.
	+ ~Hoje você ouviu X cap e Y minutos.~
	+ ~Faltam Y caps.~
	+ ~Faltam Z Horas: Minutos para terminar...~
		**- Pizza**.
	- Gráfico dos últimos 10 dias. Média...
	- Gráfico da semana atual... passada... etc.. Média:...
	- Gráfico do mês atual... do mês passado... antepassado...
	- Livros mais lidos (Em porcentagem) ? 

	- CDN Google Charts baixado: *loader.js*

	- Ex.: https://developers.google.com/chart/interactive/docs/gallery/piechart 	

---

### DONE:

~- **Compartilhar** esse site...~

~- **Pausa automática** em x minutos.~

- ~Quadrícula em **destaque** no livro e nro de capítulo que está ouvindo.~

- ~Responsivo para PC.~

- ~Melhorar CSS e visual novo~

- ~Tradução para espanhol - Menú e nome dos livros.~

- ~LocalStorage onde parou e o que já leu~

- ~Velocidade de play~

- ~BASH: AUMENTAR O VOLUME DOS AUDIOS DE NVI (?)~

- ~Div com o texto bíblico impresso tb (?)~

---

## Comandos usados e observações sobre o código:

### Sobre as variáveis de acumuladores de tempo de audição - Métricas:
- O Tempo **Total** (localStorage.getItem('tempoAudicao'):
	- Se refere ao total de tempo de faixas não repetidas ouvidas completamente.

- O Tempo **Diário** (JSON.parse(localStorage.getItem('biblia-mes-07'))[22]):
	- Se refere ao total de tempo DIÁRIO de faixas repetidas ou não que o usuário ouviu, mesmo sem ser completas.
	- Portanto, essa variável é computada mesmo se o usuário avance ou retroceda antes de ouvir completamente uma faixa.


### Link para ouvir uma faixa no github:
	https://heliogiroto.github.io/BibliaFalada/audios/RV/Mt%204.mp3


### Converter m4a para acc ou mp3. Teste de um só arq:
~~~bash
	ffmpeg -i arq.m4a -acodec copy arq.aac
	ffmpeg -i arq.m4a -acodec libmp3lame -ab 256k output.mp3
~~~

### Converter m4a em acc e mp3 em lote:
FONTE: https://superuser.com/questions/704493/ffmpeg-convert-m4a-to-mp3-without-significant-loss :
~~~bash
 	for i in *.m4a; do ffmpeg -i "$i" -acodec copy "${i}".aac; done

	for i in *.m4a; do ffmpeg -i "$i" -codec:v copy -codec:a libmp3lame -q:a 2 ../mp3/"${i}.mp3"; done
	for i in *.m4a; do ffmpeg -i "$i" -codec:v copy -codec:a libmp3lame -q:a 0 ../mp3/"$i".mp3; done    # usei esse!
	for i in *.m4a; do ffmpeg -i "$i" -acodec libmp3lame -ab 256k ../mp3/"$i".mp3; done
~~~

### Converter stereo em mono:
FONTE: https://trac.ffmpeg.org/wiki/AudioChannelManipulation
~~~bash
	ffmpeg -i Tg1.mp3 -ac 1 mono_Tg1.mp3
~~~

### Renomear em lote:
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


