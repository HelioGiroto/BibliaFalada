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
    let valorOuvido = fatiaTempo(valor)
    // imprime:
    document.querySelector("#horasOuvido").innerHTML = valorOuvido[0]
    document.querySelector("#minutosOuvido").innerHTML = valorOuvido[1]
    document.querySelector("#segundosOuvido").innerHTML = valorOuvido[2]
}


function faltaOuvir(valor) {
    // quantos capítulos falta ouvir:
    let faltaOuvirCapitulos = 1190 - totalCapOuvidos
    document.querySelector('#faltaOuvirCapitulos').innerHTML = faltaOuvirCapitulos

    // chama função:
    // valor é todo o tempo ouvido + o tempo da fx atual
    // falta Ouvir Total é tudo o que o usuário falta ouvir de toda a Bíblia.
    // 83 horas (total de horas dos 1190 audios) * 3600 segundos:
    let faltaOuvirTotal = (83 * 3600) - valor
    let valorFalta = fatiaTempo(faltaOuvirTotal)
    console.log(valorFalta)

    // imprime:
    document.querySelector("#horasFaltam").innerHTML = valorFalta[0]
    document.querySelector("#minutosFaltam").innerHTML = valorFalta[1]
    document.querySelector("#segundosFaltam").innerHTML = valorFalta[2]
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

    // se não chega a 60 minutos:
    let horas = Math.trunc(qtoOuviuHoje / 3600)
    if (horas === 0) {
        horas = ''
    } else {
        horas = `${horas}h, `
    }

    // obtem minutos que não chegaram a completar 1 hora (resto da divisão do Total de Segundos por 60 segundos):
    let minutos = Math.trunc((qtoOuviuHoje / 60) % 60)

    // obtem segundos que não chegaram a completar 1 minuto:
    let segundos = Math.trunc(qtoOuviuHoje % 60)

    // imprime qto tempo já ouvir hoje em ('#totalDiario'):
    document.querySelector('#totalDiario').innerHTML = `${horas}${minutos} min e ${segundos} seg.`

}


function totalCapitulosOuvidos() {
    let capitulosOuvidos = JSON.parse(localStorage.capitulosOuvidos)
    totalCapOuvidos = capitulosOuvidos.length
    document.querySelector("#totalCapitulos").innerHTML = totalCapOuvidos
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