// ESTE SCRIPT "QUASE" FUNCIONOU SE NÃO APRESENTASSE BUG QUANDO ALTERNA ENTRE ESCOLHER QUADRICULA PARA ABRIR
// LIVRO JUNTO COM CLICAR NAS SETAS PARA AVANÇAR OU RETROCEDER NO LIVRO ATUAL.
// SOLUÇÃO SERIA DESDE O PRINCIPIO CRIAR UM SÓ OBJETO COM TODOS OS DADOS NECESSÁRIOS PARA MANIPULAÇÃO
// DOS LIVROS INDEPENDENTE DA FUNÇÃO.



// TO DO: 
// [Na] Função que coloca nome dos livros e tb nro dos capítulos na grade: https://codepen.io/colombe/pen/QENWmG
// LocalStorages
// Melhorar CSS do player ??



let NomesLivros = ["", "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio", "Josué", "Juízes", "Rute",
    "1 Samuel", "2 Samuel", "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras", "Neemias", "Ester",
    "Jó", "Salmos", "Provérbios", "Eclesiastes", "Cânticos", "Isaías", "Jeremias", "Lamentações",
    "Ezequiel", "Daniel", "Oséias", "Joel", "Amós", "Obadias", "Jonas", "Miquéias", "Naum", "Habacuque",
    "Sofonias", "Ageu", "Zacarias", "Malaquias", "Mateus", "Marcos", "Lucas", "João", "Atos", "Romanos",
    "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios", "Filipenses", "Colossenses", "1 Tessalonicenses",
    "2 Tessalonicenses", "1 Timóteo", "2 Timóteo", "Tito", "Filemom", "Hebreus", "Tiago", "1 Pedro",
    "2 Pedro", "1 João", "2 João", "3 João", "Judas", "Apocalipse"
]

let Livros = ["", "Gn", "Ex", "Lv", "Nm", "Dt", "Js", "Jz", "Rt", "1Sm", "2Sm", "1Rs", "2Rs", "1Cr", "2Cr",
    "Ed", "Ne", "Et", "Jó", "Sl", "Pv", "Ec", "Ct", "Is", "Jr", "Lm", "Ez", "Dn", "Os", "Jl", "Am", "Ob",
    "Jn", "Mq", "Na", "Hc", "Sf", "Ag", "Zc", "Ml", "Mt", "Mc", "Lc", "Jo", "At", "Rm", "1Co", "2Co", "Gl",
    "Ef", "Fp", "Cl", "1Ts", "2Ts", "1Tm", "2Tm", "Tt", "Fm", "Hb", "Tg", "1Pe", "2Pe", "1Jo", "2Jo", "3Jo",
    "Jd", "Ap"
]

let CapitulosFinais = ['', 50, 40, 27, 36, 34, 24, 21, 4, 31, 24, 22, 25, 29, 36, 10, 13, 10, 42, 150, 31, 12,
    8, 66, 52, 5, 48, 12, 14, 3, 9, 1, 4, 7, 3, 3, 3, 2, 14, 4, 28, 16, 24, 21, 28, 16, 16, 13, 6, 6, 4, 4,
    5, 3, 6, 4, 3, 1, 13, 5, 5, 3, 5, 1, 1, 1, 22
]

let LivrosAT = ["", "Gn", "Ex", "Lv", "Nm", "Dt", "Js", "Jz", "Rt", "1Sm", "2Sm", "1Rs", "2Rs", "1Cr", "2Cr",
    "Ed", "Ne", "Et", "Jó", "Sl", "Pv", "Ec", "Ct", "Is", "Jr", "Lm", "Ez", "Dn", "Os", "Jl", "Am", "Ob",
    "Jn", "Mq", "Na", "Hc", "Sf", "Ag", "Zc", "Ml"
]

let NomesLivrosAT = ["", "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio", "Josué", "Juízes", "Rute",
    "1 Samuel", "2 Samuel", "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras", "Neemias", "Ester",
    "Jó", "Salmos", "Provérbios", "Eclesiastes", "Cânticos", "Isaías", "Jeremias", "Lamentações",
    "Ezequiel", "Daniel", "Oséias", "Joel", "Amós", "Obadias", "Jonas", "Miquéias", "Naum", "Habacuque",
    "Sofonias", "Ageu", "Zacarias", "Malaquias"
]

let CapitulosFinaisAT = ['', 50, 40, 27, 36, 34, 24, 21, 4, 31, 24, 22, 25, 29, 36, 10, 13, 10, 42, 150, 31, 12,
    8, 66, 52, 5, 48, 12, 14, 3, 9, 1, 4, 7, 3, 3, 3, 2, 14, 4
]

let LivrosNT = ["", "Mt", "Mc", "Lc", "Jo", "At", "Rm", "1Co", "2Co", "Gl", "Ef", "Fp", "Cl", "1Ts", "2Ts",
    "1Tm", "2Tm", "Tt", "Fm", "Hb", "Tg", "1Pe", "2Pe", "1Jo", "2Jo", "3Jo", "Jd", "Ap"
]

let NomesLivrosNT = ["", "Mateus", "Marcos", "Lucas", "João", "Atos", "Romanos",
    "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios", "Filipenses", "Colossenses", "1 Tessalonicenses",
    "2 Tessalonicenses", "1 Timóteo", "2 Timóteo", "Tito", "Filemom", "Hebreus", "Tiago", "1 Pedro",
    "2 Pedro", "1 João", "2 João", "3 João", "Judas", "Apocalipse"
]

let CapitulosFinaisNT = ['', 28, 16, 24, 21, 28, 16, 16, 13, 6, 6, 4, 4, 5, 3, 6, 4, 3, 1, 13, 5, 5, 3, 5, 1, 1,
    1, 22
]

// PARA CRIAR O OBJ IDEAL PARA MELHOR FUNCIONAMENTO:
// let BibliaOBJ = []
// Livros.map((a,i)=>{BibliaOBJ.push(`{"livro":"${NomesLivros[i]}", "abrev":"${Livros[i]}", "qtdeCap":"${CapitulosFinais[i]}", "testamento":"${i}"}`)})
// BibliaOBJ.map(a=>{if(a.testamento>=40){a.testamento='NT'}})
// BibliaOBJ.map(a=>{if(a.testamento<=39){a.testamento='AT'}})


let livro, capitulo, intemNro, nomeDoLivro

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
// ponteiro no item 1 dos arrays:
intemNro = 43
capitulo = 1

// obtem nome do livro e qtde de capítulos que o mesmo possui:
livro = Livros[intemNro]
capituloFinal = CapitulosFinais[intemNro]

nomeDoLivro = `${NomesLivros[intemNro]}`

console.log(`${nomeDoLivro} ${capitulo}`)

nomeLivro.innerHTML = nomeDoLivro
nroCapitulo.innerHTML = `${capitulo}`

// Engatilha o audio inicial e mostra a imagem correspondente:
// imgPlayer.src = `capas/${livro} ${capitulo}.png`
player.src = `audios/mp3/${livro} ${capitulo}.mp3`


function mudaCapitulo() {
    // oculta se estiver visivel as grades de nomes de livros e capítulos com seus cabeçalhos
    // cabecalhos.classList.add('oculta')

    cabecalhos.forEach(a => a.classList.add('oculta'))
    gradeLivros.forEach(a => a.classList.add('oculta'))
    cabecalhoCapitulos.classList.add('oculta')
    gradeCapitulos.classList.add('oculta')


    console.log(`${nomeDoLivro} ${capitulo}`)
    // altera a imagem de capa:
    // imgPlayer.src = `capas/${livro} ${capitulo}.png`
    // nomeLivro.innerHTML = `${NomesLivros[intemNro]}`
    nomeLivro.innerHTML = nomeDoLivro
    nroCapitulo.innerHTML = `${capitulo}`
    // altera a faixa que será engatilhada:
    player.src = `audios/mp3/${livro} ${capitulo}.mp3`
    // toca a faixa escolhida:
    player.play()
}

function seguinteCapitulo() {
    // grava em localStorage itemNro, capítulo para último lido.
    // grava array de objetos de capítulos lidos.

    // ao terminar a faixa, avança um capítulo
    capitulo++

    // verifica se já não chegou ao fim do livro:
    if (capitulo > capituloFinal) {
        // se o capítulo atual é maior que o capítulo Final do livro atual...
        // avança para o próximo livro (item) do array Livros:
        intemNro++
        // verifica se é momento de mudar de testamento - para navegar à pasta correta:
        // if(intemNro > 39){testamento = 'NT'}
        if (intemNro > 66 || livro === 'Ap') {
            intemNro = 1
        }
        // muda o livro atual:
        livro = Livros[intemNro]
        // muda nome do livro:
        nomeDoLivro = NomesLivros[intemNro]
        // define qual o capítulo final deste livro:
        capituloFinal = CapitulosFinais[intemNro]
        // começa do primeiro capítulo do livro:
        capitulo = 1
    }
    mudaCapitulo()
}

function anteriorCapitulo() {
    // retrocede um capítulo
    capitulo--
    // verifica se já não chegou ao incio do livro:
    if (capitulo < 1) {
        // se o capítulo atual for menor que 1
        // retrocede um livro anterior (item) do array Livros:
        intemNro--
        // verifica se está no livro de Gênesis:
        if (intemNro < 1 || livro === 'Gn') {
            intemNro = 66
        }
        // muda o livro atual:
        livro = Livros[intemNro]
        // muda nome do livro:
        nomeDoLivro = NomesLivros[intemNro]
        // define qual o capítulo final deste livro:
        capituloFinal = CapitulosFinais[intemNro]
        // posiciona ao último capítulo do livro:
        capitulo = capituloFinal
    }
    mudaCapitulo()
}

btRetrocede.addEventListener('click', anteriorCapitulo)
btAvanca.addEventListener('click', seguinteCapitulo)
// abaixo, é preciso computar que o usuário leu o livro (em localStorage) e depois mudar de capitulo:
player.addEventListener('ended', seguinteCapitulo)



function mostraGradeLivros() {
    // seleciona elemento(s) pai
    let gradeAT = document.querySelector('.gradeAT')
    let gradeNT = document.querySelector('.gradeNT')

    // remove o primeiro elemento (que é vazio) dos arrays de abreviatura dos nomes dos livros:
    LivrosAT.shift()
    LivrosNT.shift()

    LivrosAT.map((cadaNome, nroItem) => {
        // cria elemento(s) filhos com texto
        let novaDivAT = document.createElement('div')
        // texto dentro da div...
        let textoGradeAT = document.createTextNode(cadaNome)
        // insere uma classe a cada elemento novo:
        novaDivAT.classList.add('quadriculaLivro')
        // insere uma id correspondente à cada elemento
        novaDivAT.id = `AT-${nroItem+1}`
        // associa textos ao elemento criado
        novaDivAT.appendChild(textoGradeAT)
        // insere o elemento criado ao elemento pai:
        gradeAT.appendChild(novaDivAT)
    })


    LivrosNT.map((cadaNome, nroItem) => {
        // cria elemento(s) filhos com texto
        let novaDivNT = document.createElement('div')
        // texto dentro da div...
        let textoGradeNT = document.createTextNode(cadaNome)
        // insere o nome da classe:
        novaDivNT.classList.add('quadriculaLivro')
        // insere uma id correspondente à cada elemento
        novaDivNT.id = `NT-${nroItem+1}`
        // associa textos ao elemento criado
        novaDivNT.appendChild(textoGradeNT)
        // insere o elemento criado ao elemento pai:
        gradeNT.appendChild(novaDivNT)
    })

    // adiciona um evento a cada quadricula:
    let quadriculasLivros = document.querySelectorAll('.quadriculaLivro')
    quadriculasLivros.forEach(cada => cada.addEventListener('click', mostraGradeVersiculos))

    // scroll para id grades
    cabecalhos.forEach(a => a.classList.remove('oculta'))
    gradeLivros.forEach(a => a.classList.remove('oculta'))
}


// ao clicar no botao escolher livro, faz aparecer grade de livros...
btEscolher.addEventListener('click', () => {
    mostraGradeLivros()
})


function mostraGradeVersiculos() {
    // Abaixo: Apaga todos os elementos anteriormente criados para não acumular (caso já tivesse aparecido versículos de outro disparo):
    document.querySelectorAll('.quadriculaCapitulo').forEach(a => a.remove())

    let idElemento = this.id
    console.log(idElemento)
    // NT-22
    let testamento = idElemento.split('-')[0]
    let nroOrdemLivro = idElemento.split('-')[1]
    let qtosCapitulos = eval(`CapitulosFinais${testamento}[${nroOrdemLivro}]`)
    nomeDoLivro = eval(`NomesLivros${testamento}[${nroOrdemLivro}]`)
    livro = eval(`Livros${testamento}[${nroOrdemLivro-1}]`)

    console.log("Qtos cap.: " + qtosCapitulos)

    // seleciona elemento(s) pai
    let gradeCapitulos = document.querySelector('.gradeCapitulos')


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
        console.log(nomeDoLivro)
        mudaCapitulo()
    }))

    // scroll para id gradeCapitulos
    cabecalhoCapitulos.classList.remove('oculta')
    gradeCapitulos.classList.remove('oculta')
}



// function que escolhe o capítulo:
// ao clicar no nro da div#id ele define livro/cap, mudaCapitulo() e oculta novamente as grades


// https://www.skypack.dev/ // pacotes npm sem instalar !!!