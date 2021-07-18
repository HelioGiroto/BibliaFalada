// Script do aplicativo de "A Bíblia Falada"
// Autor: Hélio Giroto
// Data: 16/04/2021

// principais variáveis globais:
let versao, livro, abrev, capitulo, nroLivro, qtdeCap, capituloFinal, faixaAtual
// let testamento   // útil ???

// lista global de todos os capítulos lidos:
let capitulosOuvidos = JSON.parse(localStorage.getItem('capitulosOuvidos'))

// seletores:
let nomeLivro = document.querySelector('#nomeLivro')
let nroCapitulo = document.querySelector('#nroCapitulo')
let imgPlayer = document.querySelector('#imgPlayer')
let player = document.querySelector('#player')
let btAvanca = document.querySelector('#btAvanca')
let btRetrocede = document.querySelector('#btRetrocede')
let btEscolher = document.querySelector('#btEscolher')
let cabecalhos = document.querySelectorAll('.cabecalho')
let gradeLivros = document.querySelectorAll('.gradeLivros')
let quadriculaLivro = document.querySelectorAll('.quadriculaLivro')
let cabecalhoCapitulos = document.querySelector('.cabecalhoCapitulos')
let gradeCapitulos = document.querySelector('#gradeCapitulos')


let ultimaVersao = localStorage.getItem('ultimaVersao')
let ultimoLivro = localStorage.getItem('ultimoLivro')
let ultimoCapitulo = localStorage.getItem('ultimoCapitulo')


// Abaixo, estas variáveis podem ser mudadas 
// conforme localStorage de onde o usuário parou de ouvir:
// nroLivro = 43    // se for João.
versao = ultimaVersao
nroLivro = ultimoLivro
capitulo = ultimoCapitulo


// obtem nome do livro e qtde de capítulos que o mesmo possui:
livro = BibliaOBJ[nroLivro].livro
abrev = BibliaOBJ[nroLivro].abrev
capituloFinal = Number(BibliaOBJ[nroLivro].qtdeCap)


// define imagem e texto de background:
document.querySelector('#imgPlayer').src = `capaBiblia${versao}.jpg`
nomeLivro.innerHTML = livro
nroCapitulo.innerHTML = capitulo


// msg de console:
console.log(`Faixa Abertura: ${abrev} ${capitulo}`)


// Engatilha o audio inicial:
player.src = `audios/${versao}/${abrev} ${capitulo}.mp3`


function tocaCapitulo() {
    // oculta se estiver visivel as grades de nomes de livros e capítulos 
    // com seus cabeçalhos
    cabecalhos.forEach(a => a.classList.add('oculta'))
    gradeLivros.forEach(a => a.classList.add('oculta'))
    cabecalhoCapitulos.classList.add('oculta')
    gradeCapitulos.classList.add('oculta')

    // altera a imagem de capa:
    nomeLivro.innerHTML = livro
    nroCapitulo.innerHTML = capitulo

    // grava no localStorage os últimos capítulo, livro e versão ouvida
    // para abrir na mesma referência quando o usuário reinicia o aplicativo:
    localStorage.ultimaVersao = versao
    localStorage.ultimoLivro = nroLivro
    localStorage.ultimoCapitulo = capitulo

    // obtem o nome da faixa atual:
    faixaAtual = `${abrev} ${capitulo}`
    console.log(`Faixa Atual: ${faixaAtual}`)

    // altera a faixa que será engatilhada:
    player.src = `audios/${versao}/${abrev} ${capitulo}.mp3`

    // toca a faixa escolhida:
    player.play()
}

function seguinteCapitulo() {
    // grava em localStorage itemNro, capítulo para último lido.
    // grava array de objetos de capítulos lidos.

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
        // define qual o capítulo final deste livro:
        capituloFinal = Number(BibliaOBJ[nroLivro].qtdeCap)
    }
    tocaCapitulo()
}

function anteriorCapitulo() {
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

        // define qual o capítulo final deste livro:
        capituloFinal = Number(BibliaOBJ[nroLivro].qtdeCap)
        // console.log(capituloFinal)

        // posiciona ao último capítulo do livro:
        capitulo = capituloFinal
    }
    tocaCapitulo()
}

function terminaFaixa(){
    // essa função é disparada apenas quando uma faixa é ouvida completamente.

    // GRAVA NO LOCALSTORAGE MAIS UM NOVO CAPÍTULO OUVIDO NA LISTA:

    // obtem lista do localStorage:
    capitulosOuvidos = JSON.parse(localStorage.getItem('capitulosOuvidos'))
    
    // adiciona à esta lista a atual a faixa escutada, eliminando duplicadas:
    capitulosOuvidos.push(faixaAtual)
    capitulosOuvidos = Array.from(new Set(capitulosOuvidos)).sort((a, b) => a - b)

    // salva lista atualizada no localStorage:
    localStorage.capitulosOuvidos = JSON.stringify(capitulosOuvidos)
    // localStorage.setItem("capitulosOuvidos", capitulosOuvidos)

    seguinteCapitulo()
}

btRetrocede.addEventListener('click', anteriorCapitulo)
btAvanca.addEventListener('click', seguinteCapitulo)
// abaixo, é preciso computar que o usuário leu o livro (em localStorage) e depois mudar de capitulo:
player.addEventListener('ended', terminaFaixa)


function defineVersao() {
    versao = this.value
    // console.log(versao)
    document.querySelector('#imgPlayer').src = `capaBiblia${versao}.jpg`
    tocaCapitulo()
}

document.querySelectorAll('input[type="radio"]').forEach(a => a.addEventListener('click', defineVersao))


function mostraGradeCapitulos() {
    // Abaixo: Apaga todos os elementos anteriormente criados para não acumular (caso já tivesse aparecido versículos de outro disparo):
    document.querySelectorAll('.quadriculaCapitulo').forEach(a => a.remove())

    // A variável idElemento terá o nome do livro (id) do elemento clicado:
    let idElemento = this.id
    // console.log("idElemento: " + idElemento)

    // define qual será o nome da faixa (abrev) a ser tocada:
    abrev = idElemento
    // console.log(`abrev é : ${abrev}`)

    // define o livro, qtdeCaps, abrev do elemento clicado:
    let qtosCapitulos

    // procura em cada item do obj o nome do livro (idElemento) escolhido pelo usuário
    BibliaOBJ.find((a, i) => {
        if (a.abrev === idElemento) {
            qtosCapitulos = Number(a.qtdeCap)
            livro = a.livro
            nroLivro = i
        }
    })

    // msg de console:
    // console.log("Qtos cap.: " + qtosCapitulos)

    // seleciona elemento(s) pai
    let gradeCapitulos = document.querySelector('.gradeCapitulos')

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
        capitulo = cada.innerHTML
        // console.log(capitulo)
        // console.log(livro)
        tocaCapitulo()
    }))

    // exibe as divs que estavam ocultas relacionadas à grade de capítulos:
    cabecalhoCapitulos.classList.remove('oculta')
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

    livrosAT.map((cadaNome, nroItem) => {
        // cria elemento(s) filhos com texto
        let novaDivAT = document.createElement('div')
        // texto dentro da div...
        let textoGradeAT = document.createTextNode(cadaNome.abrev)
        // insere uma classe a cada elemento novo:
        novaDivAT.classList.add('quadriculaLivro')
        // insere uma id correspondente à cada elemento
        novaDivAT.id = cadaNome.abrev
        // associa textos ao elemento criado
        novaDivAT.appendChild(textoGradeAT)
        // insere o elemento criado ao elemento pai:
        gradeAT.appendChild(novaDivAT)
    })


    livrosNT.map((cadaNome, nroItem) => {
        // cria elemento(s) filhos com texto
        let novaDivNT = document.createElement('div')
        // texto dentro da div...
        let textoGradeNT = document.createTextNode(cadaNome.abrev)
        // insere o nome da classe:
        novaDivNT.classList.add('quadriculaLivro')
        // insere uma id correspondente à cada elemento
        // novaDivNT.id = `NT-${nroItem+1}`
        novaDivNT.id = cadaNome.abrev
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

    // scroll para id grades
    document.querySelector('#grades').scrollIntoView({
        behavior: 'smooth'
    });
}


// ao clicar no botao escolher livro, faz aparecer grade de livros...
btEscolher.addEventListener('click', () => {
    mostraGradeLivros()
})