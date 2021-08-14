// GRAFICOS.JS

// Este script é para obter a quantidade de tempo e as faixas ouvidas pelo usuário e 
// fazer os gráficos estatísticos de desempenho da leitura bíblica:

// Autor: Hélio Giroto

let totalCapitulosOuvido

function totalTempoOuvido() {

    // let tempoEmSegundos = Number(localStorage.tempoAudicao)
    // let tempoEmSegundos = Math.trunc(Number(localStorage.tempoAudicao))
    let tempoEmSegundos = tempoAudicao + tempoFaixaAtual

    // obtem quantas horas completas o usuário ouviu a Bíblia:
    // let tempoEmHoras = Math.trunc((tempoEmSegundos / 60) / 60)
    let tempoEmHoras = Math.trunc(tempoEmSegundos / 3600)

    // obtem minutos que não chegaram a completar 1 hora (resto da divisão do Total de Segundos por 60 segundos):
    let minutosRestantes = Math.trunc((tempoEmSegundos / 60) % 60)

    // obtem segundos que não chegaram a completar 1 minuto:
    let segundosRestantes = Math.trunc(tempoEmSegundos % 60)


    // junta tudo:
    // let horasAudicao = tempoEmHoras
    // let minutosAudicao = minutosRestantes
    // let segundosAudicao = segundosRestantes

    // se horasAudicao seja < 1 (não chega a 1 hora), não imprime nada.
    // se minutosAudicao seja < 1 (não chega a 1 minuto), não imprime nada.
    // se segundosAudicao seja < 1 (não há segundo), não imprime nada.

    document.querySelector("#horasOuvido").innerHTML = tempoEmHoras
    document.querySelector("#minutosOuvido").innerHTML = minutosRestantes
    document.querySelector("#segundosOuvido").innerHTML = segundosRestantes

}

function calculaCapitulosOuvidos() {
    let capitulosOuvidos = JSON.parse(localStorage.capitulosOuvidos)
    totalCapitulosOuvido = capitulosOuvidos.length
    document.querySelector("#totalCapitulos").innerHTML = totalCapitulosOuvido
}

function faltaOuvir() {
    // quantos capítulos falta ouvir:
    let faltaOuvirCapitulos = 1190 - totalCapitulosOuvido
    document.querySelector('#faltaOuvirCapitulos').innerHTML = faltaOuvirCapitulos

    // obtem o tempo corrente em que o usuário está ouvindo a atual faixa:
    // tempoFaixaAtual = Math.trunc(player.currentTime)     //  descomenta ???

    // total com o tempo de duração da faixa atual que está sendo tocada:
    let tempoEmSegundos = tempoAudicao + tempoFaixaAtual

    // em média, são 83 horas no total de áudios:
    let faltaOuvirTempo = (83 * 3600) - tempoEmSegundos

    // fazer calculos separando horas, minutos, seg...:
    let tempoEmHoras = Math.trunc(faltaOuvirTempo / 3600)

    // obtem minutos que não chegaram a completar 1 hora (resto da divisão do Total de Segundos por 60 segundos):
    let minutosRestantes = Math.trunc((faltaOuvirTempo / 60) % 60)

    // obtem segundos que não chegaram a completar 1 minuto:
    let segundosRestantes = Math.trunc(faltaOuvirTempo % 60)

    // imprime:
    document.querySelector("#horasFaltam").innerHTML = tempoEmHoras
    document.querySelector("#minutosFaltam").innerHTML = minutosRestantes
    document.querySelector("#segundosFaltam").innerHTML = segundosRestantes
}

function quantoOuviuHoje() {

    // obtem nro do mes e do dia:
    obtemDataHoje()

    let diaSemZero = diaHoje.replace(/^0/, '')

    // obtem da lista${mes}[dia]
    let qtoOuviuHoje = JSON.parse(localStorage.getItem(`biblia_mes_${mesHoje}`))[diaSemZero]

    qtoOuviuHoje = qtoOuviuHoje + tempoFaixaAtual

    let horas = Math.trunc(qtoOuviuHoje / 3600)
    if (horas === 0) {horas = ''}else{horas = `${horas}h, `}

    // obtem minutos que não chegaram a completar 1 hora (resto da divisão do Total de Segundos por 60 segundos):
    let minutos = Math.trunc((qtoOuviuHoje / 60) % 60)

    // obtem segundos que não chegaram a completar 1 minuto:
    let segundos = Math.trunc(qtoOuviuHoje % 60)

     // imprime qto tempo já ouvir hoje em ('#totalDiario'):
     document.querySelector('#totalDiario').innerHTML = `${horas}${minutos}min e ${segundos}seg.`

}

function calculaMetricas() {

    // obtem o tempo corrente em que o usuário está ouvindo a atual faixa:
    tempoFaixaAtual = Math.trunc(player.currentTime)

    // obtem tempo de audicao do localStorage:
    tempoAudicao = Math.trunc(Number(localStorage.tempoAudicao))

    calculaCapitulosOuvidos()
    totalTempoOuvido()
    faltaOuvir()
    quantoOuviuHoje()
}