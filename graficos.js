// GRAFICOS.JS

// Este script é para obter a quantidade de tempo e as faixas ouvidas pelo usuário e 
// fazer os gráficos estatísticos de desempenho da leitura bíblica:

// Autor: Hélio Giroto

let totalCapitulosOuvido

function totalTempoOuvido() {

    // obtem o tempo corrente em que o usuário está ouvindo a atual faixa:
    tempoFaixaAtual = Math.trunc(player.currentTime)

    // obtem tempo de audicao do localStorage:
    tempoAudicao = Math.trunc(Number(localStorage.tempoAudicao))

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
    let horasAudicao = tempoEmHoras
    let minutosAudicao = minutosRestantes
    let segundosAudicao = segundosRestantes

    // se horasAudicao seja < 1 (não chega a 1 hora), não imprime nada.
    // se minutosAudicao seja < 1 (não chega a 1 minuto), não imprime nada.
    // se segundosAudicao seja < 1 (não há segundo), não imprime nada.

    document.querySelector("#horasOuvido").innerHTML = horasAudicao
    document.querySelector("#minutosOuvido").innerHTML = minutosAudicao
    document.querySelector("#segundosOuvido").innerHTML = segundosAudicao

}

function calculaCapitulosOuvidos() {
    let capitulosOuvidos = JSON.parse(localStorage.capitulosOuvidos)
    totalCapitulosOuvido = capitulosOuvidos.length
    document.querySelector("#totalCapitulos").innerHTML = totalCapitulosOuvido
}

function faltaOuvir(){
    // quantos capítulos falta ouvir:
    let faltaOuvirCapitulos = 1190 - totalCapitulosOuvido
    document.querySelector('#faltaOuvirCapitulos').innerHTML = faltaOuvirCapitulos

    // quanto tempo falta ouvir...
    // obtem o que já foi ouvido:
    tempoAudicao = Math.trunc(Number(localStorage.tempoAudicao))
    // em média, são 83 horas no total de áudios:
    let faltaOuvirTempo = (83*3600) - tempoAudicao

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

function quantoOuviuHoje(){
    // obtem nro do mes e do dia:

    // obtem da lista${mes}[dia]

    // imprime qto tempo já ouvir hoje em ('#totalDiario'):
}

function calculaMetricas() {
    calculaCapitulosOuvidos()
    totalTempoOuvido()
    faltaOuvir()
    quantoOuviuHoje()
}