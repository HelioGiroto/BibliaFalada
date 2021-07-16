// Script do aplicativo de "A Bíblia Falada"
// Autor: Hélio Giroto
// Data: 16/04/2021

 

// TO DO: 
// LocalStorages
// Melhorar CSS do player ??

// principais variáveis globais:
let versao, livro, abrev, qtdeCap, testamento, capitulo, nroLivro, capituloFinal

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


// Abaixo, estas variáveis podem ser mudadas conforme localStorage de onde o usuário parou de ouvir:
// ponteiro no item 43 dos arrays:
// João cap. 1:
nroLivro = 1
capitulo = 1

// escolhe qual versão será ouvida:
versao = "ACF"
// versao = "NVI" 

// obtem nome do livro e qtde de capítulos que o mesmo possui:
livro = BibliaOBJ[nroLivro].livro
abrev = BibliaOBJ[nroLivro].abrev
capituloFinal = Number(BibliaOBJ[nroLivro].qtdeCap)

// msg de console:
console.log(`${abrev} ${capitulo}`)

nomeLivro.innerHTML = livro
nroCapitulo.innerHTML = capitulo

// Engatilha o audio inicial:
player.src = `audios/${versao}/${abrev} ${capitulo}.mp3`


function tocaCapitulo() {
    // oculta se estiver visivel as grades de nomes de livros e capítulos 
    // com seus cabeçalhos
    cabecalhos.forEach(a => a.classList.add('oculta'))
    gradeLivros.forEach(a => a.classList.add('oculta'))
    cabecalhoCapitulos.classList.add('oculta')
    gradeCapitulos.classList.add('oculta')

    console.log(`${livro} ${capitulo}`)

    // altera a imagem de capa:
    nomeLivro.innerHTML = livro
    nroCapitulo.innerHTML = capitulo

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

    // corrigido ERRO da linha 143:
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
        console.log(livro)

        // muda abreviatura do livro:
        abrev = BibliaOBJ[nroLivro].abrev
        console.log(abrev)

        // define qual o capítulo final deste livro:
        capituloFinal = Number(BibliaOBJ[nroLivro].qtdeCap)
        console.log(capituloFinal)

        // posiciona ao último capítulo do livro:
        capitulo = capituloFinal
    }
    tocaCapitulo()
}

btRetrocede.addEventListener('click', anteriorCapitulo)
btAvanca.addEventListener('click', seguinteCapitulo)
// abaixo, é preciso computar que o usuário leu o livro (em localStorage) e depois mudar de capitulo:
player.addEventListener('ended', seguinteCapitulo)


// ERRO      - corrigido na linha 81 e 82: 
// 15/07/2021
// quando:  somente quando seleciona um livro e último capítulo do mesmo livro:
// o que:   Ao avançar Mt 28 para Mt 29. E Ap 22, aparece Ap 23.
// pq:      qdo seleciona cap. não pega o capfinal do mesmo livro.


function mostraGradeCapitulos() {
    // Abaixo: Apaga todos os elementos anteriormente criados para não acumular (caso já tivesse aparecido versículos de outro disparo):
    document.querySelectorAll('.quadriculaCapitulo').forEach(a => a.remove())

    // A variável idElemento terá o nome do livro (id) do elemento clicado:
    let idElemento = this.id
    console.log("idElemento: " + idElemento)

    // define qual será o nome da faixa (abrev) a ser tocada:
    abrev = idElemento
    console.log(`abrev é : ${abrev}`)

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
    console.log("Qtos cap.: " + qtosCapitulos)

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
        console.log(capitulo)
        console.log(livro)
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

    // scroll para id grades
    cabecalhos.forEach(a => a.classList.remove('oculta'))
    gradeLivros.forEach(a => a.classList.remove('oculta'))
}


// ao clicar no botao escolher livro, faz aparecer grade de livros...
btEscolher.addEventListener('click', () => {
    mostraGradeLivros()
})



// function que escolhe o capítulo:
// ao clicar no nro da div#id ele define livro/cap, tocaCapitulo() 
// e oculta novamente as grades


// https://www.skypack.dev/ // pacotes npm sem instalar !!!