// GRAFICOS.JS

// Este script é para obter a quantidade de tempo e as faixas ouvidas pelo usuário e 
// fazer os gráficos estatísticos de desempenho da leitura bíblica:

// Autor: Hélio Giroto

let totalCapOuvidos

function fatiaTempo(valor) {
    // obtem quantas horas completas o usuário ouviu a Bíblia:
    let fatiaHoras = Math.trunc(valor / 3600)

    // obtem minutos que não chegaram a completar 1 hora (resto da divisão do Total de Segundos por 60 segundos):
    let fatiaMinutos = Math.trunc((valor / 60) % 60)

    // obtem segundos que não chegaram a completar 1 minuto:
    let fatiaSegundos = Math.trunc(valor % 60)

    let resultado = [fatiaHoras, fatiaMinutos, fatiaSegundos]

    return resultado
}

function totalTempoOuvido(valor) {
    // chama função:
    let tempoFatiado = fatiaTempo(valor)
    
    // imprime qto tempo já ouvir hoje em ('#tempoOuvido'):
    let impressao = imprimeFatiado(tempoFatiado)
    document.querySelector('#tempoOuvido').innerHTML = `${impressao[0]}${impressao[1]}${impressao[2]}`
}


function faltaOuvir(valor) {
    // quantos capítulos falta ouvir:
    let faltaOuvirCapitulos = 1190 - totalCapOuvidos
    document.querySelector('#faltaOuvirCapitulos').innerHTML = faltaOuvirCapitulos

    // valor é todo o tempo ouvido + o tempo da fx atual
    // falta Ouvir Total é tudo o que o usuário falta ouvir de toda a Bíblia.
    // 83 horas (total de horas dos 1190 audios) * 3600 segundos:
    let faltaOuvirTotal = (83 * 3600) - valor
    let tempoFatiado = fatiaTempo(faltaOuvirTotal)


    // imprime qto tempo já ouvir hoje em ('#tempoFalta'):
    let impressao = imprimeFatiado(tempoFatiado)
    document.querySelector('#tempoFalta').innerHTML = `${impressao[0]}${impressao[1]}${impressao[2]}`
}


function quantoOuviuHoje() {
    // obtem nro do mes e do dia:
    obtemDataHoje()
    // mesHoje e diaHoje são variáveis globais atualizadas ao serem chamadas na função obtemDataHoje() - ver calculaMetricas()
    let diaSemZero = diaHoje.replace(/^0/, '')

    // obtem da lista${mes}[dia]
    let qtoOuviuHoje = JSON.parse(localStorage.getItem(`biblia_mes_${mesHoje}`))[diaSemZero]

    // soma quanto ouviu hoje com o tempo de duração da faixa atual:
    qtoOuviuHoje = qtoOuviuHoje + tempoFaixaAtual

    // vai buscar os valores de hora, minuto e segundo de total de segundos (qtoOuviuHoje)
    let tempoFatiado = fatiaTempo(qtoOuviuHoje)

    // imprime qto tempo em ('#totalDiario'):
    let impressao = imprimeFatiado(tempoFatiado)
    document.querySelector('#totalDiario').innerHTML = `${impressao[0]}${impressao[1]}${impressao[2]}`
}


function totalCapitulosOuvidos() {
    let capitulosOuvidos = JSON.parse(localStorage.capitulosOuvidos)
    totalCapOuvidos = capitulosOuvidos.length
    document.querySelector("#totalCapitulos").innerHTML = totalCapOuvidos
}

function imprimeFatiado(lista) {
    // caso hora, min ou seg seja = 0, omite o 0:
    if (lista[0] === 0) {lista[0] = ''} else {lista[0] = `${lista[0]} hs, `}
    if (lista[1] === 0) {lista[1] = ''} else {lista[1] = `${lista[1]} min `}
    if (lista[2] === 0) {lista[2] = ''} else {lista[2] = `e ${lista[2]} seg`}

    let novaLista = [lista[0], lista[1], lista[2]]
    return novaLista
}

function calculaMetricas() {
    // obtem tempo de audicao do local Storage:
    tempoAudicao = Math.trunc(Number(localStorage.tempoAudicao))

    // obtem o tempo corrente da fx que o usuário está ouvindo:
    tempoFaixaAtual = Math.trunc(player.currentTime)

    // total com o tempo de duração da faixa atual que está sendo tocada:
    let totalTempo = tempoAudicao + tempoFaixaAtual

    totalCapitulosOuvidos()
    quantoOuviuHoje()

    totalTempoOuvido(totalTempo)
    faltaOuvir(totalTempo)
}