// GRAFICOS.JS

// Este script é para obter a quantidade de tempo e as faixas ouvidas pelo usuário e 
// fazer os gráficos estatísticos de desempenho da leitura bíblica:

// Autor: Hélio Giroto

// obtem o tempo corrente em que o usuário está ouvindo a atual faixa:
tempoFaixaAtual = Math.trunc(player.currentTime)

// obtem tempo de audicao do localStorage:
let tempoAudicao = Math.trunc(Number(localStorage.tempoAudicao))

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
