//////////////////// IMPORTANDO (CAMINHO REVERSO): ////////////////////////

function importaPassagens(passagem) {
	// AQUI FAZER UMA FUNÇÃO - que será tb usada para lista de favoritos:

	// direto pelos parâmetros de url:
	// let separaPorLivros = capImportados.split(';')

	// para testes:
	capImportados = passagem
	let separaPorLivros = capImportados.replace(/\+/g, ' ').split(';')

	// Abaixo: Apaga itens vazios de array: 
	separaPorLivros = separaPorLivros.filter(a => a)

	let listaCapImportados = []
	separaPorLivros.map(a => {
		let abrevLivro = a.split(' ')[0]
		let listaNrosCap = a.split(' ')[1].split(',')
		listaNrosCap.map(b => {
			listaCapImportados.push(`${abrevLivro} ${b}`)
		})
	})
	return listaCapImportados
}

// outra função para quando IMPORTAR:
function extrairParametros() {
	// teste com o url:
	// https://jesus24horas.com/?cap=1Rs+4;3Jo+1;Ap+10,11,12,13,14,15,16,17,18,19,20,6,7,8,9;At+5,6;Cl+1;Dt+10,12,13,18,19;Ed+5,6,7;Fm+1;J%C3%B3+40,41,42;Lm+4,5;Mq+1;Ob+1;Pv+10,11,12,13,4,5,6,7,8,9;Sl+120,121,122,123,125,126,127,128,129,130,131,132,133,134,135,144,145,147,150,23,24,25,26,27,28

	// extrai todos os parâmetros do link da atual página:
	let capImportados = new URL(location.href).searchParams.get('cap')
	let favImportados = new URL(location.href).searchParams.get('fav')
	let errosImportados = new URL(location.href).searchParams.get('err')

	// reload com novo link limpo (sem parâmetros):
	// reload....

	// importar de url link parâmetros:
	// antes destas linhas abaixos já chamou a função extrairParametros()
	let importacaoCapitulos = importaPassagens(capImportados)
	let importacaoFavoritos = importaPassagens(favImportados)
	let importacaoErros = errosImportados
	
	// agora apenda as 3 listas acima no localStorage de quem abriu a URL com os parâmetros...
}

// Aqui termina o processo de importação dos dados de parâmetros de URL ao chamar a função abaixo:
// extrairParametros()


//////////////////// EXPORTANDO OS DADOS ////////////////////////////

// Função que executa a manipulação das strings que serão exportadas em formato de parâmetros de URL:
function exportaPassagens(lista) {

	// AQUI FAZER UMA FUNÇÃO - que será tb usada para lista de favoritos:
	// cap será o nome do parâmetro URL que será exportado:
	let cap = []

	let listaCaps = JSON.parse(localStorage.getItem(lista))
	let abrevLivrosLidos = new Set(listaCaps.map(a => a.split(' ')[0]))
	let listaLivrosLidos = Array.from(abrevLivrosLidos)
	// Ex.: ["1Rs", "3Jo", "Ap", "At", "Cl", "Dt", "Ed", "Fm", "Jó", "Lm", "Mq", "Ob", "Pv", "Sl"]

	// Para cada lista de Abrev de livros lidos (lista acima), buscará dentro 
	// da lista de capítulos ouvidos (orig. localStorage) os nros de cap.:

	listaLivrosLidos.map(a => {
		let itensLidos = listaCaps.filter(b => b.match(a))
		let nros = itensLidos.map(a => a.split(' ')[1]).toString()
		cap += `${a}+${nros};`
	})

	// cap = "1Rs+4;3Jo+1;Ap+10,11,12,13,14,15,16,17,18,19,20,6,7,8,9;At+5,6;Cl+1;Dt+10,12,13,18,19;Ed+5,6,7;Fm+1;Jó+40,41,42;Lm+4,5;Mq+1;Ob+1;Pv+10,11,12,13,4,5,6,7,8,9;Sl+120,121,122,123,125,126,127,128,129,130,131,132,133,134,135,144,145,147,150,23,24,25,26,27,28;"
	// sendo que (;) separa livros e (,) separa nros de cap. do mesmo livro.
	return cap
}

// Forma parâmetros que serão colocados em sufixo de link URL:
// exportar (gerar parâmetro de link) passagens de localStorage: capitulosOuvidos e favoritos
let paramCap = exportaPassagens("capitulosOuvidos")
let paramFav = exportaPassagens("versiculosFavoritos")
let paramTmp = Math.trunc(JSON.parse(localStorage.tempoAudicao))
let paramErr = JSON.parse(localStorage.errosTraducao)


// cria lista vazia de dias ouvidos para exportar:

// percorre todas as listas de localStorage de nome: biblia_mes_${X}

// pega o nro do item (que é o dia) e o valor deste item de array

// sendo:

let X = mes
let i = dia
let valor = e

// Faz push destes dados a uma lista de total de dias ouvidos para exportar...




// forma link
// caracteres aceitos:   - , ; : |
// caracteres recusados: + & = ?	// (no caso, o sinal + é convertido para espaço. & para separar parametros...)