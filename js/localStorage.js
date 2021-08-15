// cria se não exista uma lista no local Storage para armazenar capítulos ouvidos:
if (localStorage.getItem("capitulosOuvidos") == null || !localStorage.capitulosOuvidos) {
    localStorage.setItem("capitulosOuvidos", "[]")
}


// cria se não exista uma lista no local Storage para armazenar última versão ouvida:
if (localStorage.getItem("ultimaVersao") == null || !localStorage.ultimaVersao) {
    localStorage.setItem("ultimaVersao", "ACF")
}


// cria se não exista uma lista no local Storage para armazenar último livro ouvido:
if (localStorage.getItem("ultimoLivro") == null || !localStorage.ultimoLivro) {
    localStorage.setItem("ultimoLivro", "43")
}


// cria se não exista uma lista no local Storage para armazenar último capítulo ouvido:
if (localStorage.getItem("ultimoCapitulo") == null || !localStorage.ultimoCapitulo) {
    localStorage.setItem("ultimoCapitulo", "1")
}


// cria se não exista uma lista no local Storage que acumula o tempo total que o usuário ouviu a Bíblia:
if (localStorage.getItem("tempoAudicao") == null || !localStorage.tempoAudicao) {
    localStorage.setItem("tempoAudicao", "0")
}

// cria se não exista uma lista no local Storage dos erros de tradução no texto que usuário aponta:
if (localStorage.getItem("errosTraducao") == null || !localStorage.errosTraducao) {
    localStorage.setItem("errosTraducao", "[]")
}

// cria se não exista uma lista no local Storage dos versículos favoritados pelo usuário:
if (localStorage.getItem("versiculosFavoritos") == null || !localStorage.versiculosFavoritos) {
    localStorage.setItem("versiculosFavoritos", "[]")
}



/*

// cria se não exista uma variável no local Storage que mostra o último dia que o usuário ouviu a Bíblia:
if (localStorage.getItem("dataUltimaAudicao") == null || !localStorage.dataUltimaAudicao) {
    localStorage.setItem("dataUltimaAudicao", "")
}

// cria se não exista uma variável no local Storage que armazena a data de hoje:
if (localStorage.getItem("biblia_hoje") == null || !localStorage.biblia_hoje) {
    localStorage.setItem("biblia_hoje", "")
}

*/

// prepara lista vazia de 0 a 31 para armazenar em cada biblia_mes_0x de localStorage:
let listaVazia = JSON.stringify(Array(32).fill(''))

// cria se não exista uma lista no local Storage para armazenar tempo de audição:
if (localStorage.getItem("biblia_mes_01") == null || !localStorage.biblia_mes_01) {
    localStorage.setItem("biblia_mes_01", listaVazia)
}

// cria se não exista uma lista no local Storage para armazenar tempo de audição:
if (localStorage.getItem("biblia_mes_02") == null || !localStorage.biblia_mes_02) {
    localStorage.setItem("biblia_mes_02", listaVazia)
}

// cria se não exista uma lista no local Storage para armazenar tempo de audição:
if (localStorage.getItem("biblia_mes_03") == null || !localStorage.biblia_mes_03) {
    localStorage.setItem("biblia_mes_03", listaVazia)
}

// cria se não exista uma lista no local Storage para armazenar tempo de audição:
if (localStorage.getItem("biblia_mes_04") == null || !localStorage.biblia_mes_04) {
    localStorage.setItem("biblia_mes_04", listaVazia)
}

// cria se não exista uma lista no local Storage para armazenar tempo de audição:
if (localStorage.getItem("biblia_mes_05") == null || !localStorage.biblia_mes_05) {
    localStorage.setItem("biblia_mes_05", listaVazia)
}

// cria se não exista uma lista no local Storage para armazenar tempo de audição:
if (localStorage.getItem("biblia_mes_06") == null || !localStorage.biblia_mes_06) {
    localStorage.setItem("biblia_mes_06", listaVazia)
}

// cria se não exista uma lista no local Storage para armazenar tempo de audição:
if (localStorage.getItem("biblia_mes_07") == null || !localStorage.biblia_mes_07) {
    localStorage.setItem("biblia_mes_07", listaVazia)
}

// cria se não exista uma lista no local Storage para armazenar tempo de audição:
if (localStorage.getItem("biblia_mes_08") == null || !localStorage.biblia_mes_08) {
    localStorage.setItem("biblia_mes_08", listaVazia)
}

// cria se não exista uma lista no local Storage para armazenar tempo de audição:
if (localStorage.getItem("biblia_mes_09") == null || !localStorage.biblia_mes_09) {
    localStorage.setItem("biblia_mes_09", listaVazia)
}

// cria se não exista uma lista no local Storage para armazenar tempo de audição:
if (localStorage.getItem("biblia_mes_10") == null || !localStorage.biblia_mes_10) {
    localStorage.setItem("biblia_mes_10", listaVazia)
}

// cria se não exista uma lista no local Storage para armazenar tempo de audição:
if (localStorage.getItem("biblia_mes_11") == null || !localStorage.biblia_mes_11) {
    localStorage.setItem("biblia_mes_11", listaVazia)
}

// cria se não exista uma lista no local Storage para armazenar tempo de audição:
if (localStorage.getItem("biblia_mes_12") == null || !localStorage.biblia_mes_12) {
    localStorage.setItem("biblia_mes_12", listaVazia)
}

// desnecessário:
/* 
// se o item[0] de cada array de localStorage relacionado com os meses estiver vazio, coloca o ano 2021:
// ERRO : antes da virada do ano é preciso manipular que a cada novo mês se altera de 2021 para 2022:
for (a = 1; a <= 12; a++) {
    if (a < 10) {
        a = `0${a}`
    }
    let lista = JSON.parse(localStorage.getItem(`biblia_mes_${a}`))
    if (!lista[0]) {
        lista[0] = '2021'
        localStorage.setItem(`biblia_mes_${a}`, JSON.stringify(lista))
    }
    // console.log(`${a}: ` + lista)
}
 */

for (a = 1; a <= 12; a++) {
    if (a < 10) {
        a = `0${a}`
    }
    let lista = JSON.parse(localStorage.getItem(`biblia_mes_${a}`))
    lista[0] = ''
    localStorage.setItem(`biblia_mes_${a}`, JSON.stringify(lista))
}


/*
        // obtem localStorage:
        tempoAudicao = Number(JSON.parse(localStorage.getItem('tempoAudicao')))
        // soma (acumulado de segundos):
        tempoAudicao = tempoAudicao + duracaoFaixaAtual
        // msg de console - tempo acumulado de audição:
        console.log(tempoAudicao)
        // grava no localStorage
        localStorage.tempoAudicao = tempoAudicao
*/



// Obtem todos os capítulos ouvidos do localStorage para a memória (se for uma lista de objetos):
// let capitulosOuvidos = JSON.parse(localStorage.getItem('capitulosOuvidos'))

// Se for apenas uma string:
// let ultimaVersao = localStorage.getItem('ultimaVersao')

// Salva no localStorage os novos capitulos ouvidos:
// localStorage.capitulosOuvidos = JSON.stringify(capitulosOuvidos)