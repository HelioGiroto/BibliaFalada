// falta:




// DONE:

        // ERRO: quando troca barraH por barraV os eixos X e Y não se invertem - o dia/mes X minutos permanecem nos mesmos eixos

        // 3 - Graficos semanais: REVISAR
                // caso domingoPassado seja num mês e dia da mesma semana seja noutro mês
        // 2 - tem que aparecer os botões de barrasH e barrasV 
        // para o usuário poder trocar de gráfico de barras.

        // 1 - ao clicar no gráfico de barras de 30 dias ele tem que ajustar na tela.

        // 3.1 - fazer a função semanal que pega o Domingo da semana atual:
        // let hoje = new Date()
        // let domingoPassado = hoje.getDate() - hoje.getDay()
        // 3.2 - pega biblia_mes_[mesAtual][domingoPassado] até biblia_mes_[mesAtual][domingoPassado + 6]

        // https://stackoverflow.com/questions/9989382/how-can-i-add-1-day-to-current-date


        // 4 - por que ao clicar no bt ult10dias não sai o array no console diferente de qdo clica em mensal e semanal (no submenu gráfico mensal e semanal)?

        /* 
        // quando muda a orientação do celular, chama novamente a função grafico10dias para ajustar ao tamanho responsivo o bar column plot:
        // https://stackoverflow.com/questions/4917664/detect-viewport-orientation-if-orientation-is-portrait-display-alert-message-ad
        window.addEventListener("orientationchange", () => {
            piechart()
            // grafico10dias()
            // disparaGraficos()
            // ERRO - corrigir melhor.
        })
        // https://developers.google.com/chart/interactive/docs/gallery/piechart?hl=en#data-format
        // http://www.duncanstruthers.design/ddv/tutorials/google-charts/responsive-google-charts-api/
        // https://developers.google.com/chart/interactive/docs/gallery/columnchart?hl=en
        */




    // 3 - Graficos semanais:
    // 3.1 - fazer a função semanal que pega o Domingo da semana atual:
    // let hoje = new Date()
    // let domingoPassado = hoje.getDate() - hoje.getDay()
    // let mesHoje = hoje.getMonth() + 1
    // if (mesHoje < 10) {
    //     mesHoje = mesHoje.toString().replace(/.*/, "0$&")
    //   }
    // mesHoje = '07'

    // 3.2 - pega biblia_mes_[mesHoje][domingoPassado] até biblia_mes_[mesHoje][domingoPassado + 6]
    // let listaSemana = []

    /*
    for (a = 0; a < 7; a++) {
        let nroDia = domingoPassado + a
        let qualDia = `${nroDia}/${mesHoje}`
        let segundosDia = JSON.parse(localStorage.getItem(`biblia_mes_${mesHoje}`))[nroDia]
        let minutosDia = Math.trunc(segundosDia / 60)
        let subLista = [qualDia, minutosDia]
        listaSemana.push(subLista)
    }

    // "cabeçalho" da lista:
    listaSemana.unshift(['Dia/Mês', 'Minutos'])
    */


    ///// mensais


    // mesHoje = '07'
    // let listaMesAtual = JSON.parse(localStorage.getItem(`biblia_mes_${mesHoje}`))
    // let novaListaMesAtual = []
    // listaMesAtual.map((e, i) => {
    //     let subLista = [`${i}/${mesHoje}`, Math.trunc(e / 60)]
    //     novaListaMesAtual.push(subLista)
    // })
    // // remove item[0] da lista:
    // novaListaMesAtual.shift()

    // retorna qtos dias tem o mêsHoje (se 28, 30, 31?):
    // let qtosDiasTemMes = new Date(anoHoje, mesHoje, 0).getDate()
    // listaMensal = novaListaMesAtual.filter((e, i) => i < qtosDiasTemMes)





// Este é desnecessário, pq os 3 botões já fazem isso:
/* 
// para ajustar clica no gráfico de barras:
document.querySelector('#graficosBarras').addEventListener('click', () => {
    disparaGraficos()
    // abreDivDesempenho()
    document.querySelector('#graficosBarras').scrollIntoView({
        behavior: 'smooth'
    });
    // apaga frase: Clique para ajustar...
    // document.querySelector('#ajuste2').style.display = 'none'
})
*/



//////////// obtem dados

    /* 
    
                // formato antes do mesmo que está ACIMA:
            
            listaMesAnterior.map((e,i)=>{
                if(e){
                    let subLista = [`${i}`, mesAnt, e]
                    novaListaMesAnterior.push(subLista)
                }
            })
            
            //  saida: ["26", "07", 20.842181]
           
            // ABAIXO: Não é necessário, senão o gráfico tb ficará ao revés.
            // coloca em ordem inversa de dias: 31, 30, 29, 28.... 1.
            // novaListaMesAtual = novaListaMesAtual.reverse()
            // novaListaMesAnterior = novaListaMesAnterior.reverse()
            // e o nro de index (do dia?)
            // listaMesAtual.reverse().filter(a=>a)
            // listaMesAnterior.reverse().filter(a=>a)
        */

    //


