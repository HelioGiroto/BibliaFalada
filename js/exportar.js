//////////////////// IMPORTANDO (CAMINHO REVERSO): ////////////////////////

// colocar este bloco em importar.js e chamá-lo no início do html.

function importaPassagens(passagens) {
	// AQUI FAZER UMA FUNÇÃO - que será tb usada para lista de favoritos:

	// direto pelos parâmetros de url (?):
	// let separaPorLivros = passagens.split(';')

	// para testes:
	let separaPorLivros = passagens.replace(/\+/g, ' ').split(';')

	// Abaixo: Apaga itens vazios do array: 
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

function importaTemposDiarios(listaT) {
	// esta função converte os tempos diarios obtidos no parâmetro para arrays...
	let listaTmpD = listaT.split(',')
	// ex.:
	// ["01-31-1000", "02-1-2000", "07-1-300"]

	// atualiza todos os valores de localStorage appendando os valores recebidos na importação:
	listaTmpD.map(a => {
		let dado = a.split('-')
		let [mes, dia, tempo] = dado
		let antigaLista = JSON.parse(localStorage.getItem(`biblia_mes_${mes}`))
		antigaLista[dia] = antigaLista[dia] + Number(tempo)
		localStorage.setItem(`biblia_mes_${mes}`, JSON.stringify(antigaLista))
	})
}

// primeira função para quando IMPORTAR:
function extrairParametros() {
	// teste com o url:
	// https://jesus24horas.com/?cap=1Rs+4;3Jo+1;Ap+10,11,12,13,14,15,16,17,18,19,20,6,7,8,9;At+5,6;Cl+1;Dt+10,12,13,18,19;Ed+5,6,7;Fm+1;J%C3%B3+40,41,42;Lm+4,5;Mq+1;Ob+1;Pv+10,11,12,13,4,5,6,7,8,9;Sl+120,121,122,123,125,126,127,128,129,130,131,132,133,134,135,144,145,147,150,23,24,25,26,27,28

	// obtem todos os parâmetros da URL aberta:
	let tmpImportado = new URL(location.href).searchParams.get('tmp')
	let tmpDImportado = new URL(location.href).searchParams.get('tmpd')
	let capImportado = new URL(location.href).searchParams.get('cap')
	let favImportado = new URL(location.href).searchParams.get('fav')
	let errImportado = new URL(location.href).searchParams.get('err')

	// SE TEM PARAMETROS....

	// faz reload com novo link limpo (sem parâmetros):
	// reload....

	// todos os dados dos parâmetros são convertidos em arrays:
	let importadoTmp = Number(tmpImportado)
	// let importadoTmpD = importaTemposDiarios(tmpDImportado)	// já é atualizado
	let importadoCap = importaPassagens(capImportado)
	let importadoFav = importaPassagens(favImportado)
	let importadoErr = errImportado.split(',')

	// agora APPENDA as listas acima atualizando o localStorage destino...
	importaTemposDiarios(tmpDImportado)

}

// Aqui termina o processo de importação dos dados de parâmetros de URL ao chamar a função abaixo:
// extrairParametros()




//////////////////// EXPORTANDO OS DADOS ////////////////////////


// Função que executa a manipulação de listas de capítulos ouvidos...
// abaixo, o parâmetro "lista" será o nome do localStorage correspondente:
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
// let paramCap = exportaPassagens("capitulosOuvidos")
// let paramFav = exportaPassagens("versiculosFavoritos")

// Tempo total de audição em segundos:
// let paramTmpTot = Math.trunc(JSON.parse(localStorage.tempoAudicao))
// let paramErr = JSON.parse(localStorage.errosTraducao).toString().replace(/ /g, '+')


// Obtem tempo diário nas listas mensais de localStorage:
function exportaTempoDiario() {
	// cria lista vazia de dias ouvidos para exportar:
	let tempoDiario = []

	// percorre todas as listas de localStorage de nome: biblia_mes_${m}
	for (m = 1; m <= 12; m++) {
		if (m < 10) m = `0${m}`
		// pega o nro do item (que é o dia) e o valor deste item de array
		let listaDiasMes = JSON.parse(localStorage.getItem(`biblia_mes_${m}`))
		// console.log(m, listaDiasMes)
		listaDiasMes.map((e, i) => {
			if (e) {
				tempoDiario.push(`${m}-${i}:${Math.trunc(e)}`)
			}
		})
	}

	let listaSaida = tempoDiario.toString()
	return listaSaida
	// formato: "mes-dia:segundos, ...""
	// "01-31:1000,02-1:2000,07-1:600,07-14:400,07-18:700,07-20:1832,07-22:1564,07-26:20,07-29:901,07-30:130,07-31:2743,08-2:944,08-3:1000,08-4:120,08-5:25,08-6:360,08-9:1974,08-13:107,08-14:2793,08-15:4,11-18:125"
}

// let paramTmpD = exportaTempoDiario()


// forma parametros de link (URL):
// caracteres   aceitos:  - , ; : |
// caracteres recusados:  + & = ?		// (no caso, o sinal + é convertido para espaço. & para separar parametros...)


function enviarDadosExportacao() {
	forma = 'whatsapp'
	// Coleta todos os dados disponíveis do dispositivo atual:
	let paramTmpTot = Math.trunc(JSON.parse(localStorage.tempoAudicao))

	let paramTmpD = exportaTempoDiario()
	// "01-31:1000,02-1:2000,07-1:600,07-14:400,07-18:700,07-20:1832,07-22:1564,07-26:20,07-29:901,07-30:130,07-31:2743,08-2:944,08-3:1000,08-4:120,08-5:25,08-6:360,08-9:1974,08-13:107,08-14:2793,08-15:4,11-18:125"	

	let paramCap = exportaPassagens("capitulosOuvidos")
	// "1Rs+4;3Jo+1;Ap+10,11,12,13,14,15,16,17,18,19,20,6,7,8,9;At+5,6;Cl+1;Dt+10,12,13,18,19;Ed+5,6,7;"

	let paramFav = exportaPassagens("versiculosFavoritos")
	// "Sl+23:4,23:1,23:6;Ap+12:1,12:6,3:10;Fp+2:2;"

	let msg = `=== paramTmpTot = "${paramTmpTot}" | paramTmpD = "${paramTmpD}" | paramCap = "${paramCap}" | paramFav = "${paramFav}" ===`
	// na importação, substituir: '=' por ' '; ...; '|' por ';' etc... 

	// Prepara a forma em que vai enviá-los:

	// Por whatsapp:
	if(forma == 'whatsapp') {
		let msgEncode = window.encodeURIComponent(msg)
		// abaixo - mudar o nro de telefone de envio...
		window.open(`https://wa.me/${nroTelefone}?text=${msgEncode}`, '_blank')
		// https://api.whatsapp.com/send/?phone=551199.....
		alert('Uma cópia dos capítulos ouvidos e favoritos foi enviada por Whatsapp! Agora no outro dispositivo que deseja receber esses dados: 1) Abra o Whatsapp e copie o que foi enviado; 2) Depois, abra o aplicativo da "Bíblia Falada" e clique em: "IMPORTAR DADOS".')
	} else if(forma == 'email') {
		let assunto = `Reportando erro de tradução na Biblia Falada`
		let msgEmail = `Verifique um erro que encontrei no texto da tradução: ${listaErros}`
		let assuntoEncode = window.encodeURIComponent(assunto)
		let msgEmailEncode = window.encodeURIComponent(msgEmail)
		window.open(`mailto:${email}?subject=${assuntoEncode}&body=${msgEmailEncode}`)
	}


}

document.querySelector('#btExportar').addEventListener('click', enviarDadosExportacao)

// dispara função conforme o tipo/forma de envio que o usuário escolher:
// ver se funciona chamar função dentro de addEventListener com argumento ???
// document.querySelector('#exportaPorWts').addEventListener('click', enviarDadosExportacao("whatsapp"))

// document.querySelector('#exportaPorEmail').addEventListener('click', enviarDadosExportacao("email"))



///////////////////////////// RESETAR TODAS AS LISTAS DE LOCALSTORAGE /////////////////////

// Após gerar link de exportacao:
// gerar uma variável de localstorage cham.: o último link de exportacao contendo o último url completo
// em seg. apagar todo conteúdo do localStg.