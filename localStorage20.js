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



// Obtem todos os capítulos ouvidos do localStorage para a memória (se for uma lista de objetos):
// let capitulosOuvidos = JSON.parse(localStorage.getItem('capitulosOuvidos'))

// Se for apenas uma string:
// let ultimaVersao = localStorage.getItem('ultimaVersao')

// Salva no localStorage os novos capitulos ouvidos:
// localStorage.capitulosOuvidos = JSON.stringify(capitulosOuvidos)