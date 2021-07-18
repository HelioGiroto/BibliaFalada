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




// Obtem todos os capítulos ouvidos do localStorage para a memória (se for uma lista de objetos):
// let capitulosOuvidos = JSON.parse(localStorage.getItem('capitulosOuvidos'))

// Se for apenas uma string:
// let ultimaVersao = localStorage.getItem('ultimaVersao')

// Salva no localStorage os novos capitulos ouvidos:
// localStorage.capitulosOuvidos = JSON.stringify(capitulosOuvidos)