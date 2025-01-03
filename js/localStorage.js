
//
const nomeListaLocal = ["B24_capitulosOuvidos", "B24_ultimaVersao", "B24_ultimoLivro", "B24_ultimoCapitulo", "B24_tempoAudicao", "B24_errosTraducao", "B24_versiculosFavoritos", "B24_ordem"]

const valorListaLocal = [ "[]", "ACF", "43", "1", "0", "[]", "[]", "0" ]


// Cria localStorages com nomes e valores conforme listas acima:
nomeListaLocal.map((a,b) => {
    // cria se não exista uma lista no local Storage para armazenar capítulos ouvidos:
    if (localStorage.getItem(`${a}`) == null || !`localStorage.${a}`) {
        localStorage.setItem(`${a}`, `${valorListaLocal[b]}`)
    }
})


// prepara lista vazia de 0 a 31 para armazenar em cada biblia_mes_0x de localStorage:
let listaVazia = JSON.stringify(Array(32).fill(''))


// lista de 01 a 12:
// [...Array(12)].map((_,i) => i<9 ? `0${i+1}` : `${i+1}`)
// [...Array(12)].map((_,i)=>console.log(i))


let listaDe1a12 = [...Array(12)].map((_, i) => {
    let nro
    if (i < 9) {
        nro = `0${i+1}`
    } else {
        nro = `${i+1}`
    }
    // cria se não exista uma lista no local Storage para armazenar tempo de audição:
    if (localStorage.getItem(`B24_mes_${nro}`) == null || !`localStorage.B24_mes_${nro}`) {
        localStorage.setItem(`B24_mes_${nro}`, listaVazia)
    }
})
