// Script do aplicativo de "A Bíblia Falada" - "do site Biblia24horas.com.br"
// Autor: Hélio Giroto
// Data: 16/04/2021

// principais variáveis globais:
let versao, livro, abrev, nombreLibro, capitulo, nroLivro, qtdeCap, capituloFinal, faixaAtual, tempoFaixaAtual, duracaoFaixaAtual, tempoAudicao, hoje, dataHoje, diaHoje, mesHoje, anoHoje, horaHoje, minutoHoje, idElemento, nroObj
// let testamento   // útil ???

// lista global de todos os capítulos lidos:
let capitulosOuvidos = JSON.parse(localStorage.getItem('B24_capitulosOuvidos'))

// seletores:
const topo = document.querySelector('#topo')
const logo = document.querySelector('#logo')
const infolivro = document.querySelector('#infolivro')
const nomeLivro = document.querySelector('#nomeLivro')
const h4Capitulo = document.querySelector('.h4Capitulo')
const nroCapitulo = document.querySelector('#nroCapitulo')
const imgPlayer = document.querySelector('.imgPlayer')
const player = document.querySelector('#player')
const btAvanca = document.querySelector('#btAvanca')
const btRetrocede = document.querySelector('#btRetrocede')
const nomeVersao = document.querySelector('#nomeVersao')
const cabecalhos = document.querySelectorAll('.cabecalho')
const h4Escolher = document.querySelector('.h4Escolher')
const h4Ordem = document.querySelector('.h4Ordem')
const normal = document.querySelector('.normal')
const crono = document.querySelector('.crono')
const h4opcoes = document.querySelector('.h4opcoes')
const h4Livro = document.querySelector('.h4Livro')
const gradeLivros = document.querySelectorAll('.gradeLivros')
const quadriculaLivro = document.querySelectorAll('.quadriculaLivro')
// let cabecalhoCapitulos = document.querySelector('.cabecalhoCapitulos')
const gradeCapitulos = document.querySelector('#gradeCapitulos')
const btPlay = document.querySelector('#btPlay')
const btPause = document.querySelector('#btPause')

// Nro de telefone para Whatsapp:
const nroTelefone = '5511992202229'
// Email para receber dados de exportação ou erros.
const email = 'heliogiroto76@gmail.com'


// obtem dados do último capítulo, livro e versão ouvidos:
// o padrão inicial é João cap. 1 // ver localStorage.js:
let ultimaVersao = localStorage.getItem('B24_ultimaVersao')
let ultimoLivro = localStorage.getItem('B24_ultimoLivro')
let ultimoCapitulo = localStorage.getItem('B24_ultimoCapitulo')
let ordem = localStorage.getItem('B24_ordem')


// obtem o parametro 'ind' da URL (se tiver):
// let abrevURL = new URL(location.href).searchParams.get('abrev')
let versaoURL = new URL(location.href).searchParams.get('versao')
let nroLivroURL = new URL(location.href).searchParams.get('nroLivro')
let capituloURL = new URL(location.href).searchParams.get('capitulo')
// let bibliaURL = new URL(location.href).searchParams.get('bibliaFalada')

// se não tiver estes parâmetros de URL:
if (!versaoURL) {
    // Abaixo, estas variáveis recebem os valores conforme localStorage em que o usuário parou de ouvir:
    versao = ultimaVersao
    nroLivro = ultimoLivro
    capitulo = ultimoCapitulo
} else {
    // let bibliaURLlista = bibliaURL.split(':')
    versao = versaoURL
    nroLivro = nroLivroURL
    capitulo = capituloURL
}


// marcar o checkbox correspondente à última versão ouvida:
if (versao === "NVI") {
    document.querySelector('#nvi').checked = true
} else if (versao === "ACF") {
    document.querySelector('#acf').checked = true
} else {
    document.querySelector('#rv').checked = true
}

// marcar a ordem correspondente à ordem atual:
if (ordem === "0") {
    document.querySelector('#impressa').checked = true
} else {
    document.querySelector('#cronologica').checked = true
}


// obtem nome do livro e qtde de capítulos que o mesmo possui:
livro = BibliaOBJ[nroLivro].livro
abrev = BibliaOBJ[nroLivro].abrev
nombreLibro = BibliaOBJ[nroLivro].nombreLibro
capituloFinal = Number(BibliaOBJ[nroLivro].qtdeCap)


// define imagem e texto de background:
// document.querySelector('#imgPlayer').src = `fundoMobile${versao}.jpg`
nomeLivro.innerHTML = livro
// se a versão esteja em espanhol:
if (versao === "RV") {
    nomeLivro.innerHTML = nombreLibro
}
nroCapitulo.innerHTML = capitulo


// msg de console:
console.log(`%c Faixa Abertura: ${abrev} ${capitulo} `, 'background: yellow; color: black')


// Engatilha o audio inicial:
player.src = `audios/${versao}/${abrev} ${capitulo}.mp3`


function obtemDataHoje() {
    // Obtem a data de hoje:
    hoje = new Date()
    diaHoje = hoje.getDate()
    mesHoje = hoje.getMonth() + 1
    anoHoje = hoje.getFullYear()
    horaHoje = hoje.getHours()
    minutoHoje = hoje.getMinutes()

    if (mesHoje < 9) {
        mesHoje = `0${mesHoje}`
    }
    // ERRO: rever se é mesmo necessario abaixo:
    if (diaHoje < 9) {
        diaHoje = `0${diaHoje}`
    }

    // dataHoje = `${anoHoje}${mesHoje}${diaHoje}`
}

obtemDataHoje()

function gravaTempoTotal() {

    // ATUALIZA O TEMPO TOTAL DE AUDIÇÃO DE LOCALSTORAGE:
    // somente SE a faixaAtual NÃO está dentro da lista de capítulosOuvidos de LocalStorage:

    // obtem duração da faixa
    duracaoFaixaAtual = player.duration

    // obtem lista do localStorage:
    capitulosOuvidos = JSON.parse(localStorage.getItem('B24_capitulosOuvidos'))

    // obtem nome da Faixa Atual:
    faixaAtual = `${abrev} ${capitulo}`

    // Este bloco de função abaixo só pode acumular o tempo ouvido de faixas NÃO repetidas porque...
    // ele será usado no gráfico para calcular quanto tempo falta para ouvir toda a Bíblia!

    // console.log("cap Ouvidos lista " + capitulosOuvidos)
    // console.log("fx Atual " + faixaAtual)

    // se a fx atual não está dentro da array capitulosOuvidos:
    if (!capitulosOuvidos.includes(faixaAtual)) {
        console.log("gravando tempo no TOTAL...")
        // obtem localStorage:
        tempoAudicao = Number(JSON.parse(localStorage.getItem('B24_tempoAudicao')))
        // soma (acumulado de segundos):
        tempoAudicao = tempoAudicao + duracaoFaixaAtual
        // msg de console - tempo acumulado de audição:
        console.log(tempoAudicao)
        // grava no localStorage
        localStorage.B24_tempoAudicao = tempoAudicao
    }
}

function gravaTempoDiario() {
    // ESTA FUNÇÃO É DISPARADA QUANDO TERMINA DE TOCAR TODA A FAIXA...
    // E TB QDO O USUÁRIO MUDA DE FAIXA (AVANÇANDO OU RETROCEDENDO):

    // obtem a tempo atual da faixa não é necessário o tempo total de duração da faixa:
    tempoFaixaAtual = player.currentTime


    // GRAVA O TEMPO DE AUDIÇÃO DO DIA DE HOJE (independente se está ouvindo faixa repetida ou não):
    obtemDataHoje()

    // carrega a lista de localStorage
    let listaAudicaoMes = JSON.parse(localStorage.getItem(`B24_mes_${mesHoje}`))
    // procura no array correspondente ao dia de hoje o tempo armazenado:
    // abaixo: quando o dia seja 01 até 09:
    let diaHojeSemZero = diaHoje.toString().replace(/^0/, '')
    let tempoDiaHoje = Number(listaAudicaoMes[`${diaHojeSemZero}`])
    // if(tempoDiaHoje === '' || tempoDiaHoje === NaN) tempoDiaHoje = 0

    // soma este tempo acima com o tempo de transmissäo da faixa recém-terminada:
    // let tempoAudicaoHoje = duracaoFaixaAtual + tempoDiaHoje
    let tempoAudicaoHoje = tempoFaixaAtual + tempoDiaHoje

    // Salva na lista no nro de array (item) correspondente:
    listaAudicaoMes[`${diaHojeSemZero}`] = tempoAudicaoHoje
    // console.log('tempo Fx: ' + tempoFaixaAtual)
    // console.log('ja ouvido hj: ' + tempoDiaHoje)
    // console.log('tot: ' + tempoAudicaoHoje)
    // console.log(listaAudicaoMes)

    // salva em localStorage:
    localStorage.setItem(`B24_mes_${mesHoje}`, JSON.stringify(listaAudicaoMes))

}

function tocaCapitulo() {
    quadriculasColor()
    // faz aparecer se estiver oculto a grade de livros:
    pagina2.classList.remove('oculta')
    // oculta se estiver visivel as grades de capítulos:
    h4Capitulo.classList.add('oculta')
    // cabecalhoCapitulos.classList.add('oculta')
    gradeCapitulos.classList.add('oculta')
    document.querySelector('.smallEmVermelho').classList.add('oculta')

    // oculta botão de pause:
    btPlay.style.display = 'none'
    btPause.style.display = 'block'

    // altera o nome do livro:
    nomeLivro.innerHTML = livro
    // se o nome do livro em caso que esteja na versão em espanhol:
    if (versao === "RV") {
        nombreLibro = BibliaOBJ[nroLivro].nombreLibro
        nomeLivro.innerHTML = nombreLibro
    }
    // imprime o nro do capítulo corrente:
    nroCapitulo.innerHTML = capitulo

    // grava no localStorage os últimos capítulo, livro e versão ouvida
    // para abrir na mesma referência quando o usuário reinicia o aplicativo:
    localStorage.B24_ultimaVersao = versao
    localStorage.B24_ultimoLivro = nroLivro
    localStorage.B24_ultimoCapitulo = capitulo
    localStorage.B24_ordem = ordem

    // obtem o nome da faixa atual:
    faixaAtual = `${abrev} ${capitulo}`
    console.log(`%c Faixa Atual: ${faixaAtual} `, 'background: red; color: black')

    // altera a faixa que será engatilhada:
    player.src = `audios/${versao}/${abrev} ${capitulo}.mp3`

    if (tempoFaixaAtual > 0) {
        // toca com 7 segundos atrás:
        player.currentTime = tempoFaixaAtual - 7
    }

    // toca a faixa escolhida:
    player.play()

    // rola página ao topo da página ou ao topo da div leitura se estiver aberta:
    rolaTopo()
    leitura()
}

function pausaCapitulo() {
    btPlay.style.display = 'block'
    btPause.style.display = 'none'
    // faz aparecer a grade de livros se estiver oculta:
    pagina2.classList.remove('oculta')

    tempoFaixaAtual = player.currentTime
    player.pause()
}

function seguinteCapitulo() {
    // grava em localStorage itemNro, capítulo para último lido.
    // grava array de objetos de capítulos lidos.

    // grava o tempo que o usuário ouviu a faixa no acumulador diário:
    gravaTempoDiario()

    // ao terminar a faixa, avança um capítulo
    capitulo++

    // define o capítulo final
    
    capituloFinal = Number(BibliaOBJ[nroLivro].qtdeCap)

    // verifica se já não chegou ao fim do livro:
    if (capitulo > capituloFinal) {
        // começa do primeiro capítulo do livro:
        capitulo = 1
        
        // se o capítulo atual é maior que o capítulo Final do livro atual...
        // avança para o próximo livro (item) do array BibliaOBJ (ver em else):      
        if(ordem === "1"){
        	// correção - caso a ordem seja CRONOLÓGICA, NÃO poderá seguir o nroLivro conforme a lista de BibliaOBJ.js
		// obtem o nro cronologico do livro atual:
		let cronoDoLivro = BibliaOBJ[nroLivro].cronologia
		// acrescenta +1 no nro cronológico (para escolher o próx livro em ordem cronológica):
		let cronoProxLivro = Number(cronoDoLivro) + 1
		// se o prox livro for além do Apocalipse:
	        if (cronoProxLivro > 66) { 
	        	nroLivro = 1 
	        } else {
	        	// encontra qual livro possui o nro cronológico atual:
			BibliaOBJ.map((e,i)=>{
				if(e.cronologia == cronoProxLivro){nroLivro = i}
			})
	        }        
        }else{
        	nroLivro++
        }
        // se passa o livro 66 (Apocalipse) volta para Gênesis:
        if (nroLivro > 66) { nroLivro = 1 }
        // muda nome do livro:
        livro = BibliaOBJ[nroLivro].livro
        // muda abreviatura do livro:
        abrev = BibliaOBJ[nroLivro].abrev
        // muda nombre de libro se seja em espanhol:
        nombreLibro = BibliaOBJ[nroLivro].nombreLibro
        // define qual o capítulo final deste livro:
        capituloFinal = Number(BibliaOBJ[nroLivro].qtdeCap)
    }
    
    tempoFaixaAtual = 0
    tocaCapitulo()
}


function anteriorCapitulo() {
    // grava o tempo que o usuário ouviu a faixa no acumulador diário:
    gravaTempoDiario()

    // retrocede um capítulo
    capitulo--
    // verifica se já não chegou ao início do livro:
    if (capitulo < 1) {
        // se o capítulo atual for menor que 1
        // retrocede um livro anterior (item) do array Livros:
        // porém se estiver em ordem cronológica, será preciso voltar na ordem cronológica:
                
        if(ordem === "1"){
		// obtem o nro cronologico do livro atual:
		let cronoDoLivro = BibliaOBJ[nroLivro].cronologia
		// acrescenta +1 no nro cronológico (para escolher o próx livro em ordem cronológica):
		let cronoLivroAnterior = Number(cronoDoLivro) - 1
		// se o prox livro for antes de Gênesis:
	        if (cronoLivroAnterior < 1) { 
	        	nroLivro = 66 
	        } else {
	        	// encontra qual livro possui o nro cronológico atual:
			BibliaOBJ.map((e,i)=>{
				if(e.cronologia == cronoLivroAnterior){nroLivro = i}
			})
	        }        
        }else{
        	// caso não esteja em ordem cronológica, volta o livro conforme ordem que está no array BibliaOBJ:
              	nroLivro--
	}


        // verifica se está no livro de Gênesis, então vai para Apocalipse:
        if (nroLivro < 1) {
            nroLivro = 66
        }

        // muda nome do livro:
        livro = BibliaOBJ[nroLivro].livro
        // console.log(livro)

        // muda abreviatura do livro:
        abrev = BibliaOBJ[nroLivro].abrev
        // console.log(abrev)

        // muda nombre del libro caso seja em espanhol:
        nombreLibro = BibliaOBJ[nroLivro].nombreLibro

        // define qual o capítulo final deste livro:
        capituloFinal = Number(BibliaOBJ[nroLivro].qtdeCap)
        // console.log(capituloFinal)

        // posiciona ao último capítulo do livro:
        capitulo = capituloFinal
    }
    tempoFaixaAtual = 0
    tocaCapitulo()
}

btRetrocede.addEventListener('click', anteriorCapitulo)
btAvanca.addEventListener('click', seguinteCapitulo)


function adicionaCapituloOuvido() {
    // GRAVA NO LOCALSTORAGE MAIS UM NOVO CAPÍTULO OUVIDO NA LISTA:

    // obtem lista do localStorage: (sem necessidade pq a função anterior chamada já atualizou esta variável global abaixo):
    // capitulosOuvidos = JSON.parse(localStorage.getItem('B24_capitulosOuvidos'))

    // obtem nome da Faixa Atual: (sem necessidade pq a função anterior chamada já atualizou esta variável global abaixo):
    // faixaAtual = `${abrev} ${capitulo}`

    // adiciona à esta lista a atual a faixa escutada, eliminando duplicadas:
    capitulosOuvidos.push(faixaAtual)
    // console.log("nao sorteados: " + capitulosOuvidos)

    // Sorteia (ordena) a lista de capítulos ouvidos:
    // sort em alfabético: [...lista].sort((a, b) => a > b ? 1 : -1)
    // capitulosOuvidos = Array.from(new Set(capitulosOuvidos)).sort((a, b) => a - b)
    // Fonte: https://stackoverflow.com/questions/2466356/sorting-objects-by-property-values
    capitulosOuvidos.sort((a, b) => a > b ? 1 : -1)
    // console.log("sorted: " + capitulosOuvidos)

    // Faz um "uniq" na lista, removendo os duplicados:
    capitulosOuvidos = Array.from(new Set(capitulosOuvidos))
    // console.log('cap. uniq - ' + capitulosOuvidos)

    // salva lista atualizada no localStorage:
    localStorage.B24_capitulosOuvidos = JSON.stringify(capitulosOuvidos)
}

function terminaFaixa() {
    // essa função é disparada apenas quando uma faixa é ouvida completamente.

    // OBS.: A ordem das funções abaixo que são chamadas NÃO pode mudar:

    // Grava acumulando o tempo de audição em localStorage:
    gravaTempoTotal()
    // abaixo -- comentado pq já faz isso na função seguinteCapitulo():
    // gravaTempoDiario()

    // Adiciona na lista de localStorage mais um capítulo ouvido!
    adicionaCapituloOuvido()

    // em seguida salta para próxima faixa:
    seguinteCapitulo()
}

// abaixo, é preciso computar que o usuário leu o livro (em localStorage) e depois mudar de capitulo:
player.addEventListener('ended', terminaFaixa)


function defineVersao() {
    versao = this.value
    // ordem = this.value
    // console.log(versao)
    traduz()
    // se caso tenha mudado para a versão em espanhol, será preciso traduzir a grade:
    mostraGradeLivros(ordem)
    // document.querySelector('#imgPlayer').src = `fundoMobile${versao}.jpg`
    tempoFaixaAtual = 0
    tocaCapitulo()
}


function defineOrdem(){
	ordem = this.value
	traduz()	
	mostraGradeLivros(ordem)
	tempoFaixaAtual = 0
	tocaCapitulo()
}

document.querySelectorAll('input[type="radio"].radioVersao').forEach(a => a.addEventListener('click', defineVersao))
document.querySelectorAll('input[type="radio"].radioOrdem').forEach(a => a.addEventListener('click', defineOrdem))


function mostraGradeCapitulos() {
    // Abaixo: Apaga todos os elementos anteriormente criados para não acumular
    // (caso já tivesse aparecido versículos de outro disparo):
    document.querySelectorAll('.quadriculaCapitulo').forEach(a => a.remove())

    // A variável idElemento terá o nome do livro (id) do elemento clicado:
    // manipula nome do id com replace:
    idElemento = this.id.replace("_", "")
    // console.log("idElemento: " + idElemento)

    // define o livro, qtdeCaps, abrev do elemento clicado:
    let qtosCapitulos

    // procura em cada item do obj o nome do livro (idElemento) escolhido pelo usuário
    // para: obter a qtde de capítulos:
    BibliaOBJ.find((a, i) => {
        if (a.abrev === idElemento) {
            qtosCapitulos = Number(a.qtdeCap)
            nroObj = i
            // livro = a.livro
            // nroLivro = i
        }
    })

    // seleciona elemento(s) pai
    let gradeCapitulos = document.querySelector('.gradeCapitulos')

    // Forma quadrículas de capítulos:
    // cria novos elementos de acordo com o número de capítulos do livro escolhido pelo usuário:
    for (let cap = 1; cap <= qtosCapitulos; cap++) {
        // cria elemento(s) filhos com texto
        let novaDivVs = document.createElement('div')
        // texto dentro da div...
        let nroVs = document.createTextNode(cap)
        // insere o nome da classe:
        novaDivVs.classList.add('quadriculaCapitulo')
        // associa textos ao elemento criado
        novaDivVs.appendChild(nroVs)
        // insere o elemento criado ao elemento pai:
        gradeCapitulos.appendChild(novaDivVs)
    }


    // ao clicar no nro de cap. abre o audio....
    let quadriculasCapitulos = document.querySelectorAll('.quadriculaCapitulo')
    quadriculasCapitulos.forEach(cada => cada.addEventListener('click', () => {
        // define qual será o nome da faixa (abrev) a ser tocada:
        // ao clicar no nro de cap. re-define a abrev, livro, nroLivro a ser tocado:
        abrev = idElemento // ou tb: BibliaOBJ[nroObj].abrev ??
        livro = BibliaOBJ[nroObj].livro
        nroLivro = nroObj
        capitulo = cada.innerHTML

        tempoFaixaAtual = 0

        negritaLivro()
        tocaCapitulo()
    }))

    ////////////////////////////////////////

    // pinta de vermelho os nros de capítulos já lidos:


    // pega primeiro todos os capitulos já lidos:
    capitulosOuvidos = JSON.parse(localStorage.getItem('B24_capitulosOuvidos'))

    // filtra uma lista de todos os capítulos lidos do livro que o usuário clicou:
    let listaCapitulosOuvidos = capitulosOuvidos.filter(a => a.includes(`${idElemento} `))

    // da lista acima, extrair apenas os nros (de capítulos):
    let nrosCapPintar = []
    listaCapitulosOuvidos.map((e, i) => {
        nrosCapPintar.push(e.split(' ')[1])
    })
    // e pintar esses nros de vermelho:
    nrosCapPintar.map(a => {
        document.querySelectorAll('.quadriculaCapitulo')[`${Number(a)-1}`].style.color = 'red'
    })

    // exibe as divs que estavam ocultas relacionadas à grade de capítulos:
    h4Capitulo.classList.remove('oculta')
    document.querySelector('.smallEmVermelho').classList.remove('oculta')
    // cabecalhoCapitulos.classList.remove('oculta')
    gradeCapitulos.classList.remove('oculta')

    // faz scroll para o id gradeCapitulos:
    document.querySelector('#gradeCapitulos').scrollIntoView({
        behavior: 'smooth'
    });
}


// mostraGradeLivros(0) - ordem de livros impressa
// mostraGradeLivros(1) - ordem de livros cronológica
/// abaixo tem parâmetro ????
function mostraGradeLivros(ordem) {
    // Aqui vai mostrar tb como órdem cronológica e não na ordem em que aparecem no Objeto.
    // BibliaOBJ.filter(a=>a.cronologia).sort((a,b)=>a.cronologia - b.cronologia)
    // BibliaOBJ.filter(a=>a.cronologia).sort((a,b)=>a.cronologia - b.cronologia).map(a=>a.abrev)

    // Cria duas listas conforme o nome do testamento e adiciona os livros conforme o testamento:
    console.log('ordem: ', ordem)
    let livrosAT = []
    let livrosNT = []

    BibliaOBJ.map(a => {
        if (a.testamento === 'AT') {
            livrosAT.push(a)
        }
    })
    BibliaOBJ.map(a => {
        if (a.testamento === 'NT') {
            livrosNT.push(a)
        }
    })

    // ERRO - Quando toca sequencialmente não obedece a ordem cronológica histórica (ordem = 1).
    // somente em caso que a ordem seja = 1, entao a ordem dos livros na listaAT e NT ...
    // será re-ordenada conforme a propriedade cronologia (em BibliaOBJ.js):
    if (ordem === "1") {
        livrosAT = BibliaOBJ.filter(a=>a.testamento=="AT").filter(a=>a.cronologia).sort((a,b)=>a.cronologia - b.cronologia)
        livrosNT = BibliaOBJ.filter(a=>a.testamento=="NT").filter(a=>a.cronologia).sort((a,b)=>a.cronologia - b.cronologia)
    }

    // reseta quadricula de livros para não duplicar...
    document.querySelectorAll('.quadriculaLivro').forEach(a => a.remove())

    // seleciona elemento(s) pai
    let gradeAT = document.querySelector('.gradeAT')
    let gradeNT = document.querySelector('.gradeNT')

    // Forma quadrículas do Antigo Testamento:
    livrosAT.map((cadaNome, nroItem) => {
        // cria elemento(s) filhos com texto
        let novaDivAT = document.createElement('div')

        // texto dentro da div...
        let textoGradeAT = document.createTextNode(cadaNome.abrev)
        // mas, caso seja a versão em espanhol:
        if (versao === 'RV') {
            textoGradeAT = document.createTextNode(cadaNome.abreviacion)
        }
        // insere uma classe a cada elemento novo:
        novaDivAT.classList.add('quadriculaLivro')
        // insere uma id correspondente à cada elemento
        // manipula nome do id com replace:
        // abrev = abrev.replace(/.*/, "_$&")
        novaDivAT.id = cadaNome.abrev.replace(/.*/, "_$&")
        // associa textos ao elemento criado
        novaDivAT.appendChild(textoGradeAT)
        // insere o elemento criado ao elemento pai:
        gradeAT.appendChild(novaDivAT)
    })

    // Forma quadrículas dos livros do Novo Testamento:
    livrosNT.map((cadaNome, nroItem) => {
        // cria elemento(s) filhos com texto
        let novaDivNT = document.createElement('div')

        // TO DO:
        // Se o usuário estiver no Desktop ou tablet,
        // nas quadriculas dos nomes dos livros
        // aparece o nome completo do livro e não a abrev.

        // texto dentro da div...
        let textoGradeNT = document.createTextNode(cadaNome.abrev)
        // mas, caso seja a versão em espanhol:
        if (versao === 'RV') {
            textoGradeNT = document.createTextNode(cadaNome.abreviacion)
        }
        // insere o nome da classe:
        novaDivNT.classList.add('quadriculaLivro')
        // insere uma id correspondente à cada elemento
        // manipula nome do id com replace:
        // abrev = abrev.replace(/.*/, "_$&")
        novaDivNT.id = cadaNome.abrev.replace(/.*/, "_$&")
        // associa textos ao elemento criado
        novaDivNT.appendChild(textoGradeNT)
        // insere o elemento criado ao elemento pai:
        gradeNT.appendChild(novaDivNT)
    })

    // adiciona um evento a cada quadricula:
    let quadriculasLivros = document.querySelectorAll('.quadriculaLivro')
    quadriculasLivros.forEach(cada => cada.addEventListener('click', mostraGradeCapitulos))

    // faz aparecer as grades e cabeçalhos:
    cabecalhos.forEach(a => a.classList.remove('oculta'))
    gradeLivros.forEach(a => a.classList.remove('oculta'))

    // pinta quadrinhos - escala de cores:
    let quadrinhos = document.querySelectorAll('.escala > div')
    let cores = [85, 80, 75, 70, 65, 60, 55, 50, 45, 40]
    quadrinhos.forEach((e, i) => {
        e.style.background = `hsl(120, 50%, ${cores[i]}%)`
    })
}


function traduz() {
    // traduz botão de escolher livro e cabeçalhos para espanhol:
    let cabecalhoAT = document.querySelector('#cabecalhoAT')
    let cabecalhoNT = document.querySelector('#cabecalhoNT')
    // listas abaixo - abreviatura e nome correspondentes ao livro escolhido pelo usuário:
    let abrevVersoes = ['ACF', 'NVI', 'RV']
    let nomeVersoes = ['Almeida Corrigida Fiel', 'Nova Versão Internacional', 'Reina Valera 1909']

    if (versao === "RV") {
        nomeVersao.innerHTML = nomeVersoes[2]
        h4opcoes.innerHTML = 'OPCIONES:'
        h4Escolher.innerHTML = "ELIGE LA VERSIÓN/TRADUCCIÓN:"
        h4Ordem.innerHTML = "ORDEN EN QUÉ LOS LIBROS SERÁN OIDOS:"
        normal.innerHTML = "Orden Normal"
        crono.innerHTML = "Orden Cronológico"
        
        h4Livro.innerHTML = "SELECCIONA EL LIBRO DE LA BIBLIA:"
        h4Capitulo.innerHTML = "ESCOGE EL CAPÍTULO:"
        cabecalhoAT.innerHTML = "ANTIGUO TESTAMENTO"
        cabecalhoNT.innerHTML = "NUEVO TESTAMENTO"
    } else {
        // percorre listas para imprimir nome do livro correspondente à abreviatura escolhida:
        abrevVersoes.map((e, i) => {
            if (e === versao) {
                nomeVersao.innerHTML = nomeVersoes[i]
            }
        })
        h4opcoes.innerHTML = "OPÇÕES:"
        h4Escolher.innerHTML = "ESCOLHA A VERSÃO/TRADUÇÃO:"
        h4Ordem.innerHTML = "ORDEM EM QUE OS LIVROS SERÃO OUVIDOS:"
        normal.innerHTML = "Ordem Normal"
        crono.innerHTML = "Ordem Cronológica"
                
        h4Livro.innerHTML = "SELECIONE O LIVRO DA BÍBLIA:"
        h4Capitulo.innerHTML = "ESCOLHA O CAPÍTULO:"
        cabecalhoAT.innerHTML = "ANTIGO TESTAMENTO"
        cabecalhoNT.innerHTML = "NOVO TESTAMENTO"
    }
}

function negritaLivro() {
    // negrita somente a quadrícula correspondente ao livro atual,
    // as demais permanecem normais:
    document.querySelectorAll('.quadriculaLivro').forEach(a => {
        a.style.fontWeight = 'normal'
        a.style.color = 'black'
        // a.style.backgroundColor = '#eeffcc'
    })
    document.querySelector(`#_${abrev}`).style.fontWeight = 'bold'
    document.querySelector(`#_${abrev}`).style.color = 'red'
    document.querySelector(`#_${abrev}`).style.backgroundColor = 'yellow'
    /*
    // document.querySelector(`#_${abrev}`).style.fontSize = '1.1em'
    // converte para maiúsculas:
    let livroNegrito = document.querySelector(`#_${abrev}`).innerHTML
    livroNegrito = livroNegrito.toUpperCase()
    document.querySelector(`#_${abrev}`).innerHTML = livroNegrito 
    */
}

// chama as funções logo ao iniciar a página:
traduz()
mostraGradeLivros(ordem)
negritaLivro()
// mas não toca nada ainda

function rolaMenu() {
    // mostraGradeLivros()

    // trecho abaixo acrescentado de tocaCapitulo()
    quadriculasColor()
    // faz aparecer se estiver oculto a grade de livros:
    pagina2.classList.remove('oculta')
    // oculta se estiver visivel as grades de capítulos:
    h4Capitulo.classList.add('oculta')
    // cabecalhoCapitulos.classList.add('oculta')
    gradeCapitulos.classList.add('oculta')
    document.querySelector('.smallEmVermelho').classList.add('oculta')
    // fim do trecho

    document.querySelector('.h4opcoes').scrollIntoView({
        behavior: 'smooth'
    });
}

function rolaTopo() {
    document.querySelector('#topo').scrollIntoView({
        behavior: 'smooth'
    });
}

function rolaBarras() {
    document.querySelector('#topoGraficoBarras').scrollIntoView();
}


function abreDivPausa() {
    rolaMenu()
    obtemDataHoje()
    document.querySelector('#horarioGoogle').value = `${horaHoje}:${minutoHoje}`
    divPausa.classList.remove('oculta')
    divLeitura.classList.add('oculta')
    divDesempenho.classList.add('oculta')
    divMais.classList.add('oculta')
    divCompartilha.classList.add('oculta')
    pagina2.classList.add('oculta')
}

function abreDivDesempenho() {
    rolaMenu()
    divDesempenho.classList.remove('oculta')
    divPausa.classList.add('oculta')
    divLeitura.classList.add('oculta')
    divCompartilha.classList.add('oculta')
    divMais.classList.add('oculta')
    pagina2.classList.add('oculta')
    // função de graficos.js:
    disparaGraficos()
}

function abreDivLeitura() {
    // alert('abriu leitura')
    rolaMenu()
    divLeitura.classList.remove('oculta')
    divPausa.classList.add('oculta')
    divDesempenho.classList.add('oculta')
    divMais.classList.add('oculta')
    divCompartilha.classList.add('oculta')
    pagina2.classList.add('oculta')
    // deixa aberto os checkbox de escolher versão:
    // não funciona pq depende da pagina2...
    // document.querySelector('.escolherVersao').classList.remove('oculta')
    leitura()
}

function abreDivMais() {
    rolaMenu()
    divMais.classList.remove('oculta')
    divPausa.classList.add('oculta')
    divDesempenho.classList.add('oculta')
    divLeitura.classList.add('oculta')
    divCompartilha.classList.add('oculta')
    pagina2.classList.add('oculta')
}

function abreDivCompartilha() {
    rolaMenu()
    divCompartilha.classList.remove('oculta')
    divDesempenho.classList.add('oculta')
    divPausa.classList.add('oculta')
    divLeitura.classList.add('oculta')
    divMais.classList.add('oculta')
    pagina2.classList.add('oculta')
}


let pagina2 = document.querySelector('.pagina2')


function programaPausa() {
    let minutosEmEspera = Number(minutosPausa.value)
    // programa a pausa conforme número passado pelo usuário:
    setTimeout(() => {
        pausaCapitulo()
    }, minutosEmEspera * 60000);
    alert('Programado!')
    // Oculta divPausa
    divPausa.classList.add('oculta')
    // Mostra div capítulos:
    pagina2.classList.remove('oculta')
    // rola página ao topo:
    rolaTopo()
}

// clicando no bt de programar, chama a função programaPausa:
document.querySelector('#btProgramaPausa').addEventListener('click', programaPausa)

// ao dar foco no input de programar pausa, zera conteúdo e valor:
let minutosPausa = document.querySelector('#minutosPausa')
minutosPausa.addEventListener('focus', () => {
    minutosPausa.value = ''
    minutosPausa.innerHTML = ''
})

let divPausa = document.querySelector('.divPausa')
let divDesempenho = document.querySelector('.divDesempenho')
let divLeitura = document.querySelector('.divLeitura')
let divMais = document.querySelector('.divMais')
let divCompartilha = document.querySelector('.divCompartilha')


let iconePausa = document.querySelector('#iconePausa')
let iconeDesempenho = document.querySelector('#iconeDesempenho')
let iconeLeitura = document.querySelector('#iconeLeitura')
let iconeMais = document.querySelector('#iconeMais')
let iconeCompartilha = document.querySelector('#iconeCompartilha')


// Dispara o evento de abrir a janela do Google Agenda desde a janela do Meu Desempenho > Média e Estimativa
document.querySelector('.abrirLembrete').addEventListener('click', () => {
    // 'fecha' a janela da média...
    document.querySelector('.media').open = false;
    // abre a janela da Pausa:
    abreDivPausa()
})


function agendaGoogle() {
    let horarioInicio = document.querySelector('#horarioGoogle').value
    horarioInicio = horarioInicio.replace(':', '')

    let horarioFim = Number(horarioInicio) + 100

    // A princípio os valores são iguais do dia atual
    let diaFim = diaHoje
    let mesFim = mesHoje
    let anoFim = anoHoje

    // Mas se o horário é maior ou igual a 24:00, se manipula strings para 0009 ou 0030 (como resultado final):
    if (horarioFim >= 2400) {
        horarioFim = horarioFim - 2400
        if (horarioFim < 10) {
            horarioFim = horarioFim.toString().replace(/.*/, "000$&")
        } else {
            horarioFim = horarioFim.toString().replace(/.*/, "00$&")
        }
        // se passa das 24:00 é pq tb é no dia seguinte!
        // se acrescenta um dia a mais na data de hoje:
        let hoje = new Date()
        hoje.setDate(hoje.getDate() + 1)

        diaFim = hoje.getDate()
        mesFim = hoje.getMonth() + 1
        anoFim = hoje.getFullYear()

        // manipula as strings se for de 1 à 9: coloca um zero à esquerda:
        if (diaFim < 10) {
            diaFim = diaFim.toString().replace(/.*/, "0$&")
        }
        if (mesFim < 10) {
            mesFim = mesFim.toString().replace(/.*/, "0$&")
        }
    }

    // forma o conteúdo das propriedades que vão na url de google calendar:
    let dataHora = `${anoHoje}${mesHoje}${diaHoje}T${horarioInicio}/${anoFim}${mesFim}${diaFim}T${horarioFim}`
    let titulo = "Hora de ouvir a Bíblia Falada!!!"
    let descricao = "A fé vem pelo ouvir a Palavra de Deus! Site: https://biblia24horas.com"

    descricao = descricao.replace(/ /g, "+").replace(/&/g, '-')
    titulo = titulo.replace(/ /g, "+").replace(/&/g, '-')

    let link = `https://calendar.google.com/event?action=TEMPLATE&text=${titulo}&dates=${dataHora}&details=${descricao}`
    // formato mais ideal:
    // https://calendar.google.com/event?action=TEMPLATE&text=teste&dates=20210806T2210/20210806T2300
    // https://calendar.google.com/calendar/u/0/r/eventedit?text=teste&dates=20210806T2210/20210806T2300
    console.log(link)

    // mostra grid de livros:
    pagina2.classList.remove('oculta')
    // esconde janela da opção de menú aberta:
    divPausa.classList.add('oculta')
    // rola página ao topo do site:
    rolaTopo()
    // abre em outra página o Google Calendar /:
    window.open(link, '_blank')
}

// quando clica no logo do Google Calendar:
document.querySelector('#googleAgenda').addEventListener('click', agendaGoogle)


iconePausa.addEventListener('click', abreDivPausa)
iconeDesempenho.addEventListener('click', abreDivDesempenho)
iconeLeitura.addEventListener('click', abreDivLeitura)
// comentado temporariamente para refatorar as funções de importar/exportar...
// iconeMais.addEventListener('click', abreDivMais)
iconeCompartilha.addEventListener('click', abreDivCompartilha)


// cada div de menu tem um botão de fechar com classe igual (.fechaJanela)
let fechaJanela = document.querySelectorAll('.fechaJanela')
// acrescenta em todos esses botões o seguinte evento:
fechaJanela.forEach(a => {
    // pega nome da sub-div (programarPausa, Desempenho, Compartilha...) de dentro de menu:
    let div = a.parentElement.classList[0];
    // em cada botão adiciona evento:
    a.addEventListener('click', () => {
        // mostra grid de livros:
        pagina2.classList.remove('oculta')
        // esconde janela da opção de menú aberta:
        document.querySelector(`.${div}`).classList.add('oculta')
        // rola página ao topo do site:
        rolaTopo()
    })
})

// após 3 segundos faz aparecer a mensagem de motivação... na details da média e estimativas:
document.querySelector('.media').addEventListener('click', () => {
    setTimeout(() => {
        document.querySelector('#msgMotivacao').classList.remove('oculta')
    }, 3000)
})

//////////////////////////////////////////////

function enviaErros() {
    let listaStorage = JSON.parse(localStorage.getItem('B24_errosTraducao'))
    let listaUnique = [...new Set(listaStorage)]
    let listaErros
    
    if (listaUnique.length > 0) {
        listaErros = listaUnique.toString().replace(/,/g, '; ')
        document.querySelector('#listaErros').innerHTML = listaErros
        document.querySelector('.reportarErros').classList.remove('oculta')
    } 

    document.querySelector('#btErrosWt').addEventListener('click', () => {
        let msgErro = `Erro na tradução da Bíblia Falada: ${listaErros}`
        let msgErroEncode = window.encodeURIComponent(msgErro)
        window.open(`https://wa.me/${nroTelefone}?text=${msgErroEncode}`, '_blank')
        // apaga localStorage
        localStorage.setItem("B24_errosTraducao", "[]")
        document.querySelector('.reportarErros').classList.add('oculta')
        listaErros = ''
    })

    document.querySelector('#btErrosEm').addEventListener('click', () => {
        let assunto = `Reportando erro de tradução na Biblia Falada`
        let msgEmail = `Verifique um erro que encontrei no texto da tradução: ${listaErros}`
        let assuntoEncode = window.encodeURIComponent(assunto)
        let msgEmailEncode = window.encodeURIComponent(msgEmail)
        window.open(`mailto:${email}?subject=${assuntoEncode}&body=${msgEmailEncode}`)
        // apaga localStorage
        localStorage.setItem("B24_errosTraducao", "[]")
        document.querySelector('.reportarErros').classList.add('oculta')
        listaErros = ''
    })
}

// ao iniciar a página, já verifica se há erros para enviar:
enviaErros()



function verificaFavoritos() {
    // esta função varre todo o localStorage de versiculos favoritos e pinta o coração de vermelho...
    let listaStorage = JSON.parse(localStorage.getItem('B24_versiculosFavoritos'))
    let livroAberto = `${abrev} ${capitulo}:`

    // verifica se tem alguma referência do livro Aberto dentro do localStorage:
    let referenciasDestaPagina = listaStorage.filter(a => a.includes(`${livroAberto}`))

    // cria uma lista vazia para receber somente os nros de versículos das referencias Desta Pagina que estava dentro de localStorage:
    let nrosVersiculos = []

    // percorre referenciasDestaPagina e faz split para que na nova lista só tenha os nros de VERSICULOS!
    referenciasDestaPagina.map(a => {
        let nroVers = a.split(':')[1]
        nrosVersiculos.push(nroVers)
    })

    // pinta de vermelho os corações cujos versículos estão na lista nroVersiculos: 
    nrosVersiculos.map(a => {
        document.querySelector(`#c_${a} > img`).src = "./img/coracaoRED.png"
        document.querySelector(`#v_${a}`).style.color = 'darkgreen'
        document.querySelector(`#t_${a}`).style.color = 'darkgreen'
    })
}
// comentar depois ???
let textoBiblico = []
let textoDoCapitulo = []
    
// função do menú Leitura:
// ERRO: comentei todas as vezes que chamou esta função abaixo:
function leitura() {
    // rola até topo da divLeitura:
    document.querySelector('#divLeitura').scrollIntoView()

	// let textoBiblico = []
    textoBiblico = []
    // muda o nome da tradução conforme o que o usuário já estava escutando:
    let nomeTraducao = document.querySelector('#nomeTraducao')
    let listaTraducoes = ['ALMEIDA CORRIGIDA FIEL', 'NOVA VERSÃO INTERNACIONAL', 'REINA VALERA 1909']
    let abrevTraducoes = ['ACF', 'NVI', 'RV']
    // Título do nome do livro e capítulo corrente:
    let livroCapitulo = document.querySelector('#livroCapitulo')
    // texto bíblico inteiro dos arquivos acf.js e nvi.js:
    let bibliaRV = ['Indisponible todavía.']
    let textoTraducoes = ['bibliaACF', 'bibliaNVI', 'bibliaRV']
    // percorre lista de abreviações das traduções procurando (find) qual index está a versão atual que está sendo ouvida,
    // ... para colocar nome da versão correspondente e engatilhar o texto bíblico completo da mesma versão:
    abrevTraducoes.find((e, i) => {
        if (e == versao) {
            nomeTraducao.innerHTML = listaTraducoes[i]
            livroCapitulo.innerHTML = `${livro} ${capitulo}`
            textoBiblico = eval(textoTraducoes[i])
        }
    })
    // console.log(textoBiblico)
	console.log(abrev,capitulo)
    // extrai da bíblia toda somente os versículos do capítulo e livro corrente:
    // let textoDoCapitulo = []
    textoDoCapitulo = []
    
    	// itera todo o objeto BibliaOBJ.js à procura do que inicia com a referência do livro-capítulo atual:
    	// startWith evita de sair tudo junto Jo 1: e 1Jo: e 2Jo1:
	for (linha of textoBiblico){
		if(linha[0].startsWith(`${abrev} ${capitulo}:`)) { textoDoCapitulo.push(linha) } 
	}	
    
    // textoBiblico.map(e => {
    //    if (e[0].includes(`${abrev} ${capitulo}:`)) {
    //        textoDoCapitulo.push(e)
    //    }
    // })
    
	   //  for (a of ages){
	   // if(a.includes(18)){
	   //     console.log(a)
	   //    }
	   // }
    
	// for (linha of textoBiblico){
	//	if(linha[0].includes(`${abrev} ${capitulo}:`)){
	//		textoDoCapitulo.push(linha)	
	//	} else {
	//		return linha
	//	}
	// }
	
	// for (linha of textoBiblico){
	//	if(linha[0].includes(`${abrev} ${capitulo}:`)) { textoDoCapitulo.push(linha) } 
	// }	
	
	     
    // textoDoCapitulo = textoBiblico.filter(a=> a[0].includes(`${abrev} ${capitulo}:`))
     
    // textoBiblico.map(a=> a.map(e=> {if(e.includes("Gn 1:")) {textoDoCapitulo.push(a)}}))
    
    //só funciona com Gn 1 e não com vers como At 11:, etc...
    // textoBiblico.map(a=> a.map(e=> {if(e.includes(`${abrev} ${capitulo}:`)) {textoDoCapitulo.push(a)}}))

    // para debugar se a Bíblia que abre é a que o usuário escolheu:
    // console.log(textoDoCapitulo)

    ////////////////////////////////////////////

    // forma tabela:
    // https://www.w3schools.com/jsref/met_table_insertrow.asp
    let tabela = document.querySelector("#tabela")

    // apaga tabela anterior - reseta:
    // abaixo não pode ser apenas 'tr' pq confunde com as tr's que o Google Charts gera tb.
    document.querySelectorAll('#tabela tr').forEach(a => tabela.deleteRow(0))


    textoDoCapitulo.map((e, i) => {
        // Insere nova linha no fim da tabela:
        let novaLinha = tabela.insertRow(-1)
        // novaLinha.id = `l_${i+1}`

        // Insere nova célula no fim da nova linha:
        // coluna nro. do vers.
        let novaCelula1 = novaLinha.insertCell(-1)
        novaCelula1.id = `v_${i+1}`
        novaCelula1.classList.add('versiculoTabela')
        // coluna texto do vers.
        let novaCelula2 = novaLinha.insertCell(-1)
        novaCelula2.id = `t_${i+1}`
        // coluna do coração
        let novaCelula3 = novaLinha.insertCell(-1)
        novaCelula3.id = `c_${i+1}`
        novaCelula3.classList.add('coracaoTabela')

        // Insere texto nas celulas:
        novaCelula1.innerHTML = e[0].split(':')[1]
        novaCelula2.innerHTML = e[1]
        novaCelula3.innerHTML = '<img src="img/coracao.png" class="iconeCoracao">'
    })

    ////////////////////////////////////////////

    // se clica no nome da versão ou no livro que está sendo lido, rola até o menu das gradesLivros e capítulos:
    nomeTraducao.addEventListener('click', rolaMenu)
    livroCapitulo.addEventListener('click', rolaMenu)

    // cria eventos para versículos com erro e favoritos (coração):

    let listaVersiculosDaTabela = document.querySelectorAll('.versiculoTabela')
    let listaCoracoesDaTabela = document.querySelectorAll('.coracaoTabela')

    // ao dar click em algum nro do versículo da tabela:
    listaVersiculosDaTabela.forEach((e, i) => {
        e.addEventListener('click', () => {
            // pega versao, capitulo, versiculo (id)
            let esteVersiculo = e.id.replace('v_', '')
            let referenciaErro = `${abrev} ${capitulo}:${esteVersiculo} (${versao})`
            // console.log(referenciaErro)
            // pinta de vermelho/preto o nro vs. e texto da linha:
            if (document.querySelector(`#t_${i+1}`).style.color != 'darkred') {
                document.querySelector(`#v_${i+1}`).style.color = 'darkred'
                document.querySelector(`#t_${i+1}`).style.color = 'darkred'
                // salva na lista de erros em localStorage
                // nome: errosTraducao
                let listaStorage = JSON.parse(localStorage.getItem('B24_errosTraducao'))
                listaStorage.push(referenciaErro)
                localStorage.B24_errosTraducao = JSON.stringify(listaStorage)
            } else {
                // pinta o texto e nro de versículo de novo de preto:
                document.querySelector(`#v_${i+1}`).style.color = 'black'
                document.querySelector(`#t_${i+1}`).style.color = 'black'
                // e tira da listaStorage de erro:
                let listaStorage = JSON.parse(localStorage.getItem('B24_errosTraducao'))
                let novaListaStorage = listaStorage.filter(a => a != referenciaErro)
                localStorage.B24_errosTraducao = JSON.stringify(novaListaStorage)
            }
        })
    })

    // ao clicar em algum coração da tabela - favoritar:
    listaCoracoesDaTabela.forEach((e, i) => {
        e.addEventListener('click', () => {
            // pega versao, capitulo, versiculo (id)
            let esteVersiculo = e.id.replace('c_', '')
            let referenciaFavorito = `${abrev} ${capitulo}:${esteVersiculo}`
            console.log(referenciaFavorito)

            // se o texto não está verde:
            if (document.querySelector(`#t_${i+1}`).style.color != 'darkgreen') {
                // if (document.querySelector(`#${e.id} > img`).src != './img/coracaoRED.png') {
                // coração fica vermelho e texto verde:
                document.querySelector(`#${e.id} > img`).src = "./img/coracaoRED.png"
                document.querySelector(`#v_${i+1}`).style.color = 'darkgreen'
                document.querySelector(`#t_${i+1}`).style.color = 'darkgreen'
                // salva na lista de favoritos em localStorage:
                // nome da lista: versiculosFavoritos
                let listaStorage = JSON.parse(localStorage.getItem('B24_versiculosFavoritos'))
                listaStorage.push(referenciaFavorito)
                localStorage.B24_versiculosFavoritos = JSON.stringify(listaStorage)
                // Abaixo: LOGO BREVE :
                // no rodapé da div, aparece o botão: VER VERSÍCULOS FAVORITOS!
                // bt e função para abrir div de visualização da lista p/ compartilhar tb...
            } else {
                // pinta o coracao de preto-branco e texto de preto:
                document.querySelector(`#${e.id} > img`).src = "./img/coracao.png"
                document.querySelector(`#v_${i+1}`).style.color = 'black'
                document.querySelector(`#t_${i+1}`).style.color = 'black'
                // tira do localStorage:
                let listaStorage = JSON.parse(localStorage.getItem('B24_versiculosFavoritos'))
                let novaListaStorage = listaStorage.filter(a => a != referenciaFavorito)
                localStorage.B24_versiculosFavoritos = JSON.stringify(novaListaStorage)
            }
        })
    })

    // chama FUNÇÃO: pinta versículos favoritos!!
    // só depois de ter chamado antes toda a estrutura da div/menú leitura...
    verificaFavoritos()

}


////////////////////////////////////////////// 

// funções do menú Mais Recursos:
function funcaoExportar() {
    // Está sendo executado de exportar.js
    // alert('Função indisponível no momento. Volte mais tarde!')
}

function funcaoRadio() {
    window.open('https://www.jesus24horas.com/radio', '_blank')
}

function funcaoPedido() {
    let precisoOracao = "Olá, estou escutando a Bíblia Falada e preciso de ORAÇÃO...."
    let precisoOracaoEncode = window.encodeURIComponent(precisoOracao)
    window.open(`https://wa.me/${nroTelefone}?text=${precisoOracaoEncode}`, '_blank')
}

function funcaoProblema() {
    window.open(`mailto:${email}?subject=ERRO no site BibliaFalada&body=Estou reportando um erro que encontrei no site: ...`)
}

function funcaoApoie() {
    window.open('https://jesus24horas.com/radio/apoie_1.html', '_blank')
    // alert('Em breve...')
}

// pega cada bt:
let btsRecursos = document.querySelectorAll('.btMais')
// atribui uma função para cada bt:
let funcoesBts = [funcaoExportar, funcaoRadio, funcaoPedido, funcaoProblema, funcaoApoie]
// cria os eventos para os bts:
btsRecursos.forEach((e, i) => {
    e.addEventListener('click', eval(funcoesBts[i]))
})


// funções de divCompartilha:

// elementos:
let whatsapp = document.querySelector('#whatsapp')
let telegram = document.querySelector('#telegram')
let gmail = document.querySelector('#gmail')
let facebook = document.querySelector('#facebook')
let twitter = document.querySelector('#twitter')
let nomesRedes = [whatsapp, telegram, gmail, facebook, twitter]

let nossoSite, siteEncode, siteFB, siteFBencode, mensagemCompartilhar, msgEncode, assuntoEmail
let linkRedes = []

// adicionando disparadores de eventos em cada icone:
nomesRedes.forEach((e, i) => {
    e.addEventListener('click', () => {
        // sites e sites encoded:
        // nossoSite = `https://heliogiroto.github.io/BibliaFalada/?nroLivro=${nroLivro}&capitulo=${capitulo}&versao=${versao}`
        nossoSite = `https://biblia24horas/?nroLivro=${nroLivro}&capitulo=${capitulo}&versao=${versao}`
        siteEncode = encodeURIComponent(nossoSite)

        // siteFB = `heliogiroto.github.io/BibliaFalada/?nroLivro=${nroLivro}&capitulo=${capitulo}&versao=${versao}`
        siteFB = `biblia24horas/?nroLivro=${nroLivro}&capitulo=${capitulo}&versao=${versao}`
        siteFBencode = encodeURIComponent(siteFB)

        // mensagens encoded:
        // mensagemCompartilhar = `Desejo que esta palavra te abençoe também! Ouça em: ${siteEncode}`
        msgEncode = `Desejo que esta palavra te abençoe também! Ouça em: ${siteEncode}`
        assuntoEmail = "A fé vem pelo ouvir!!"
        // msgEncode = encodeURIComponent(mensagemCompartilhar)

        // mensagem em espanhol:
        if (versao === "RV") {
            msgEncode = `Espero que esta palabra te bendiga también: ${siteEncode}`
            assuntoEmail = "¡La fé viene por el oír!"
        }

        // forma links para compartilhamento:
        linkRedes = [
            `whatsapp://send?text=${msgEncode}`,
            `https://t.me/share/url?text=${msgEncode}`,
            `mailto:?subject=${assuntoEmail}&body=${msgEncode}`,
            `https://www.facebook.com/sharer/sharer.php?u=${siteFBencode}`,
            `http://twitter.com/intent/tweet?text=${msgEncode}`,
        ]
        // abre uma nova janela do navegador com o link correspondente:
        console.log(linkRedes[i])
        window.open(linkRedes[i], '_blank')
    })
})


/*  
    // let nossoSite = `https://heliogiroto.github.io/BibliaFalada/?bibliaFalada=${versao}:${nroLivro}:${capitulo}`
    // let siteEncode = `https://www.jesus24horas.com/bibliafalada/?nroLivro=${nroLivro}&capitulo=${capitulo}&versao=${versao}`

    // antes: 
    // `https://www.facebook.com/sharer/sharer.php?u=heliogiroto.github.io/BibliaFalada`,
    // `https://t.me/share/url?url=www.jesus24horas.com/bibliafalada&text=${msgEncode}`,
    // `https://www.facebook.com/sharer/sharer.php?u=jesus24horas.com/bibliafalada/?nroLivro=${nroLivro}&capitulo=${capitulo}&versao=${versao}/`,
    // `https://www.facebook.com/sharer/sharer.php?u=${siteFB}`,
    // `https://www.facebook.com/sharer/sharer.php?u=heliogiroto.github.io/BibliaFalada`,
    // `https://www.facebook.com/sharer/sharer.php?u=${siteFBencode}`
    //  `http://twitter.com/intent/tweet?text=${msgEncode}&url=${siteEncode}`,


    // Se der erro (no Whatsapp), tentar:
    // https://wa.me/?text=${msgEncode}

    // Fontes:
    // https://stackoverflow.com/questions/16463030/how-to-add-facebook-share-button-on-my-website
    // https://stackoverflow.com/questions/21935149/sharing-link-on-whatsapp-from-mobile-website-not-application-for-android
    // https://stackoverflow.com/questions/31356360/share-a-link-via-url-scheme-to-telegram
    // https://stackoverflow.com/questions/5045918/adding-a-share-by-email-link-to-website
    // https://stackoverflow.com/questions/4782068/can-i-set-subject-content-of-email-using-mailto
    // https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters?rq=1

    // formato da url:
    let linkURL = `${siteEncode}/?nroLivro=${nroLivro}&capitulo=${capitulo}&versao=${versao}`
    let linkURL = `${siteEncode}/?abrev=${abrev}&capitulo=${capitulo}&versao=${versao}`

    // obtem o parametro 'ind' da URL:
    let nroLivroURL = new URL(location.href).searchParams.get('nroLivro')
    let abrevURL = new URL(location.href).searchParams.get('abrev')
    let capituloURL = new URL(location.href).searchParams.get('capitulo')
    let versaoURL = new URL(location.href).searchParams.get('versao')

    if (!abrevURL) { abrevURL = // }
*/


logo.addEventListener('click', rolaMenu)
infolivro.addEventListener('click', rolaMenu)
nomeVersao.addEventListener('click', rolaMenu)
btPlay.addEventListener('click', tocaCapitulo)
btPause.addEventListener('click', pausaCapitulo)


