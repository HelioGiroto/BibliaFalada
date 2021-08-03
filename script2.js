// Script do aplicativo de "A Bíblia Falada"
// Autor: Hélio Giroto
// Data: 16/04/2021

// principais variáveis globais:
let versao, livro, abrev, nombreLibro, capitulo, nroLivro, qtdeCap, capituloFinal, faixaAtual, tempoFaixaAtual, duracaoFaixaAtual, tempoAudicao, dataHoje, diaHoje, mesHoje, anoHoje, idElemento, nroObj
// let testamento   // útil ???

// lista global de todos os capítulos lidos:
let capitulosOuvidos = JSON.parse(localStorage.getItem('capitulosOuvidos'))

// seletores:
let topo = document.querySelector('#topo')
let logo = document.querySelector('#logo')
let infolivro = document.querySelector('#infolivro')
let nomeLivro = document.querySelector('#nomeLivro')
let h4Capitulo = document.querySelector('.h4Capitulo')
let nroCapitulo = document.querySelector('#nroCapitulo')
let imgPlayer = document.querySelector('.imgPlayer')
let player = document.querySelector('#player')
let btAvanca = document.querySelector('#btAvanca')
let btRetrocede = document.querySelector('#btRetrocede')
let nomeVersao = document.querySelector('#nomeVersao')
let cabecalhos = document.querySelectorAll('.cabecalho')
let h4Escolher = document.querySelector('.h4Escolher')
let h4opcoes = document.querySelector('.h4opcoes')
let h4Livro = document.querySelector('.h4Livro')
let gradeLivros = document.querySelectorAll('.gradeLivros')
let quadriculaLivro = document.querySelectorAll('.quadriculaLivro')
// let cabecalhoCapitulos = document.querySelector('.cabecalhoCapitulos')
let gradeCapitulos = document.querySelector('#gradeCapitulos')
let btPlay = document.querySelector('#btPlay')
let btPause = document.querySelector('#btPause')


let ultimaVersao = localStorage.getItem('ultimaVersao')
let ultimoLivro = localStorage.getItem('ultimoLivro')
let ultimoCapitulo = localStorage.getItem('ultimoCapitulo')


// Abaixo, estas variáveis recebem os valores conforme localStorage em que o usuário parou de ouvir:
versao = ultimaVersao
nroLivro = ultimoLivro
capitulo = ultimoCapitulo

// marcar o checkbox correspondente à última versão ouvida:
if (versao === "NVI") {
    document.querySelector('#nvi').checked = true
} else if (versao === "ACF") {
    document.querySelector('#acf').checked = true
} else {
    document.querySelector('#rv').checked = true
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
    diaHoje = new Date().getDate()
    mesHoje = new Date().getMonth() + 1
    anoHoje = new Date().getFullYear()

    if (mesHoje < 9) {
        mesHoje = `0${mesHoje}`
    }
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
    capitulosOuvidos = JSON.parse(localStorage.getItem('capitulosOuvidos'))

    // obtem nome da Faixa Atual:
    faixaAtual = `${abrev} ${capitulo}`

    // Este bloco de função abaixo só pode acumular o tempo ouvido de faixas NÃO repetidas porque...
    // ele será usado no gráfico para calcular quanto tempo falta para ouvir toda a Bíblia!

    // console.log("cap Ouvidos lista " + capitulosOuvidos)
    // console.log("fx Atual " + faixaAtual)

    if (!capitulosOuvidos.includes(faixaAtual)) {
        console.log("gravando tempo no TOTAL...")
        // obtem localStorage:
        tempoAudicao = Number(JSON.parse(localStorage.getItem('tempoAudicao')))
        // soma (acumulado de segundos):
        tempoAudicao = tempoAudicao + duracaoFaixaAtual
        // msg de console - tempo acumulado de audição:
        console.log(tempoAudicao)
        // grava no localStorage
        localStorage.tempoAudicao = tempoAudicao
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
    let listaAudicaoMes = JSON.parse(localStorage.getItem(`biblia_mes_${mesHoje}`))
    // procura no array correspondente ao dia de hoje o tempo armazenado:
    // abaixo: quando o dia seja 01 até 09:
    let diaHojeSemZero = diaHoje.replace(/^0/, '')
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
    localStorage.setItem(`biblia_mes_${mesHoje}`, JSON.stringify(listaAudicaoMes))

}

function tocaCapitulo() {
    // faz aparecer se estiver oculto a grade de livros:
    pagina2.classList.remove('oculta')
    // oculta se estiver visivel as grades de capítulos:
    h4Capitulo.classList.add('oculta')
    // cabecalhoCapitulos.classList.add('oculta')
    gradeCapitulos.classList.add('oculta')

    // oculta botão de pause:
    btPlay.style.display = 'none'
    btPause.style.display = 'block'

    // altera a imagem de capa:
    nomeLivro.innerHTML = livro
    // altera o nome do livro em caso que esteja na versão em espanhol:
    if (versao === "RV") {
        nombreLibro = BibliaOBJ[nroLivro].nombreLibro
        nomeLivro.innerHTML = nombreLibro
    }

    nroCapitulo.innerHTML = capitulo

    // grava no localStorage os últimos capítulo, livro e versão ouvida
    // para abrir na mesma referência quando o usuário reinicia o aplicativo:
    localStorage.ultimaVersao = versao
    localStorage.ultimoLivro = nroLivro
    localStorage.ultimoCapitulo = capitulo

    // obtem o nome da faixa atual:
    faixaAtual = `${abrev} ${capitulo}`
    console.log(`%c Faixa Atual: ${faixaAtual} `, 'background: red; color: black')

    // altera a faixa que será engatilhada:
    player.src = `audios/${versao}/${abrev} ${capitulo}.mp3`

    // toca a faixa escolhida:
    player.play()

    // rola página ao topo:
    rolaTopo()
}

function pausaCapitulo() {
    btPlay.style.display = 'block'
    btPause.style.display = 'none'
    // faz aparecer a grade de livros se estiver oculta:
    pagina2.classList.remove('oculta')
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
        // avança para o próximo livro (item) do array Livros:
        nroLivro++
        // se passa o livro 66 (Apocalipse) volta para Gênesis:
        if (nroLivro > 66) {
            nroLivro = 1
        }
        // muda nome do livro:
        livro = BibliaOBJ[nroLivro].livro
        // muda abreviatura do livro:
        abrev = BibliaOBJ[nroLivro].abrev
        // muda nombre de libro se seja em espanhol:
        nombreLibro = BibliaOBJ[nroLivro].nombreLibro
        // define qual o capítulo final deste livro:
        capituloFinal = Number(BibliaOBJ[nroLivro].qtdeCap)
    }
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
        nroLivro--

        // verifica se está no livro de Gênesis:
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
    tocaCapitulo()
}

btRetrocede.addEventListener('click', anteriorCapitulo)
btAvanca.addEventListener('click', seguinteCapitulo)


function adicionaCapituloOuvido() {
    // GRAVA NO LOCALSTORAGE MAIS UM NOVO CAPÍTULO OUVIDO NA LISTA:

    // obtem lista do localStorage: (sem necessidade pq a função anterior chamada já atualizou esta variável global abaixo):
    // capitulosOuvidos = JSON.parse(localStorage.getItem('capitulosOuvidos'))

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
    localStorage.capitulosOuvidos = JSON.stringify(capitulosOuvidos)
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
    // console.log(versao)
    traduz()
    // se caso tenha mudado para a versão em espanhol, será preciso traduzir a grade:
    mostraGradeLivros()
    // document.querySelector('#imgPlayer').src = `fundoMobile${versao}.jpg`
    tocaCapitulo()
}

document.querySelectorAll('input[type="radio"]').forEach(a => a.addEventListener('click', defineVersao))


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

    // msg de console:
    // console.log("Qtos cap.: " + qtosCapitulos)

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

        negritaCapitulo()
        tocaCapitulo()
    }))

    // exibe as divs que estavam ocultas relacionadas à grade de capítulos:
    h4Capitulo.classList.remove('oculta')
    // cabecalhoCapitulos.classList.remove('oculta')
    gradeCapitulos.classList.remove('oculta')

    // faz scroll para o id gradeCapitulos:
    document.querySelector('#gradeCapitulos').scrollIntoView({
        behavior: 'smooth'
    });
}

function mostraGradeLivros() {
    // Cria duas listas conforme o nome do testamento e adiciona os livros conforme o testamento:
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
        h4opcoes.innerHTML = 'ESCOGE UNA OPCIÓN:'
        h4Escolher.innerHTML = "ELIGE LA VERSIÓN/TRADUCCIÓN:"
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
        h4opcoes.innerHTML = "ESCOLHA UMA OPÇÃO:"
        h4Escolher.innerHTML = "ESCOLHA A VERSÃO/TRADUÇÃO:"
        h4Capitulo.innerHTML = "ESCOLHA O CAPÍTULO:"
        h4Livro.innerHTML = "SELECIONE O LIVRO DA BÍBLIA:"
        cabecalhoAT.innerHTML = "ANTIGO TESTAMENTO"
        cabecalhoNT.innerHTML = "NOVO TESTAMENTO"
    }
}

function negritaCapitulo() {
    // negrita somente a quadrícula correspondente ao livro atual,
    // as demais permanecem normais:
    document.querySelectorAll('.quadriculaLivro').forEach(a => {
        a.style.fontWeight = 'normal'
        a.style.color = 'black'
        a.style.backgroundColor = '#eeffcc'
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

traduz()
mostraGradeLivros()
negritaCapitulo()


function rolaMenu() {
    // mostraGradeLivros()
    document.querySelector('.h4opcoes').scrollIntoView({
        behavior: 'smooth'
    });
}

function rolaTopo(){
    document.querySelector('#topo').scrollIntoView({
        behavior: 'smooth'
    });
}


function abreDivPausa() {
    rolaMenu()
    divPausa.classList.remove('oculta')
    divDesempenho.classList.add('oculta')
    divMais.classList.add('oculta')
    pagina2.classList.add('oculta')
    divCompartilha.classList.add('oculta')
}

function abreDivDesempenho() {
    rolaMenu()
    divDesempenho.classList.remove('oculta')
    divPausa.classList.add('oculta')
    divMais.classList.add('oculta')
    pagina2.classList.add('oculta')
    divCompartilha.classList.add('oculta')
    // função de graficos.js:
    calculaMetricas()
}

function abreDivMais() {
    rolaMenu()
    divMais.classList.remove('oculta')
    divPausa.classList.add('oculta')
    divDesempenho.classList.add('oculta')
    pagina2.classList.add('oculta')
    divCompartilha.classList.add('oculta')
}

function abreDivCompartilha() {
    rolaMenu()
    divCompartilha.classList.remove('oculta')
    divMais.classList.add('oculta')
    divPausa.classList.add('oculta')
    divDesempenho.classList.add('oculta')
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
let divMais = document.querySelector('.divMais')
let divCompartilha = document.querySelector('.divCompartilha')

let iconePausa = document.querySelector('#iconePausa')
let iconeDesempenho = document.querySelector('#iconeDesempenho')
let iconeMais = document.querySelector('#iconeMais')
let iconeCompartilha = document.querySelector('#iconeCompartilha')

iconePausa.addEventListener('click', abreDivPausa)
iconeDesempenho.addEventListener('click', abreDivDesempenho)
iconeMais.addEventListener('click', abreDivMais)
iconeCompartilha.addEventListener('click', abreDivCompartilha)


// cada div de menu tem um botão de fechar com classe igual (.fechaJanela)
let fechaJanela = document.querySelectorAll('.fechaJanela')
// acrescenta em todos esses botões o seguinte evento:
fechaJanela.forEach(a => {
    // pega nome da sub-div (programarPausa, Desempenho, Compartilha...) de dentro de menu:
    let div = a.parentElement.classList[0];
    // em cada botão adiciona evento:
    a.addEventListener('click', () => {
        // console.log(div)
        // mostra grid de livros:
        pagina2.classList.remove('oculta')
        // esconde janela da opção de menú aberta:
        document.querySelector(`.${div}`).classList.add('oculta')
        // rola página ao topo do site:
        rolaTopo()
    })
})


// funções de divCompartilha:
// let instagram = document.querySelector('#instagram')
let facebook  = document.querySelector('#facebook')
let whatsapp  = document.querySelector('#whatsapp')
let telegram  = document.querySelector('#telegram')
let gmail     = document.querySelector('#gmail')

let listaRedes = [whatsapp, telegram, facebook, gmail]

let mensagemCompartilhar = "Ouça a Bíblia gratuitamente neste site: https://www.jesus24horas.com"
let assuntoEmail = "A fé vem pelo ouvir!!"

if(versao === "RV") {
    mensagemCompartilhar = "Oye la Biblia gratuitamente en este sitio: https://www.jesus24horas.com"
    assuntoEmail = "¡La fé viene por el oír!"
}

let msgEncode = encodeURIComponent(mensagemCompartilhar)

let linkRedes = [
    `whatsapp://send?text=${msgEncode}`, 
    `https://t.me/share/url?url=www.jesus24horas.com&text=${msgEncode}`, 
    `https://www.facebook.com/sharer/sharer.php?u=heliogiroto.github.io/BibliaFalada`,
    `mailto:?subject=${assuntoEmail}&body=${mensagemCompartilhar}`
]

// adicionando disparadores de eventos em cada icone:
listaRedes.forEach((e,i)=>{
    e.addEventListener('click', ()=>{
        window.open(linkRedes[i], '_blank')
    })
})

// Se der erro (no Whatsapp), tentar:
// https://wa.me/?text=${msgEncode}

// Fontes:
// https://stackoverflow.com/questions/16463030/how-to-add-facebook-share-button-on-my-website
// https://stackoverflow.com/questions/21935149/sharing-link-on-whatsapp-from-mobile-website-not-application-for-android
// https://stackoverflow.com/questions/31356360/share-a-link-via-url-scheme-to-telegram
// https://stackoverflow.com/questions/5045918/adding-a-share-by-email-link-to-website
// https://stackoverflow.com/questions/4782068/can-i-set-subject-content-of-email-using-mailto


logo.addEventListener('click', rolaMenu)
infolivro.addEventListener('click', rolaMenu)
nomeVersao.addEventListener('click', rolaMenu)


btPlay.addEventListener('click', tocaCapitulo)

btPause.addEventListener('click', pausaCapitulo)