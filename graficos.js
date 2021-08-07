// GRAFICOS.JS

// Este script é para obter a quantidade de tempo e as faixas ouvidas pelo usuário e 
// fazer os gráficos estatísticos de desempenho da leitura bíblica:

// Autor: Hélio Giroto

let totalCapOuvidos, faltaOuvirTotal, totalTempo, qtoOuviuHoje, mesAnt, listaUlt10dias, listaMensal, listaSemana, domingoPassado, media, relacaoMedia

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

function porcentagem(valor, total) {
    // Ex.: valor=25; total=100. resultado = 25%.
    let resultado = Number((valor / (total) * 100).toFixed(2))
    return resultado
}

function totalTempoOuvido(valor) {
    // chama função:
    let tempoFatiado = fatiaTempo(valor)

    // imprime qto tempo já ouviu hoje em ('#tempoOuvido'):
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
    faltaOuvirTotal = (83 * 3600) - valor
    let tempoFatiado = fatiaTempo(faltaOuvirTotal)

    console.log(`%c TEMPO => Todos os áudios: ${83*3600}. Ouvido: ${valor}. Falta ouvir: ${faltaOuvirTotal} `, 'background: blue; color: white')
    console.log(`%c CAPÍTULOS => Todos: 1190. Ouvido: ${totalCapOuvidos}. Falta ouvir: ${faltaOuvirCapitulos} `, 'background: green; color: white')

    // imprime qto tempo já ouvir hoje em ('#tempoFalta'):
    let impressao = imprimeFatiado(tempoFatiado)
    document.querySelector('#tempoFalta').innerHTML = `${impressao[0]}${impressao[1]}${impressao[2]}`
}

function quantoOuviuHoje() {
    // mesHoje e diaHoje são variáveis globais atualizadas da função obtem_DataHoje() - ver disparaGraficos()
    let diaSemZero = diaHoje.replace(/^0/, '')

    // obtem da lista${mes}[dia]
    qtoOuviuHoje = JSON.parse(localStorage.getItem(`biblia_mes_${mesHoje}`))[diaSemZero]

    // soma quanto ouviu hoje com o tempo de duração da faixa atual:
    qtoOuviuHoje = qtoOuviuHoje + tempoFaixaAtual

    // vai buscar os valores de hora, minuto e segundo de total de segundos (qtoOuviuHoje)
    let tempoFatiado = fatiaTempo(qtoOuviuHoje)

    // imprime qto tempo em ('#totalDiario'):
    let impressao = imprimeFatiado(tempoFatiado)
    if (qtoOuviuHoje == 0) {
        document.querySelector('#totalDiario').innerHTML = `nenhum capítulo!`
    } else {
        document.querySelector('#totalDiario').innerHTML = `${impressao[0]}${impressao[1]}${impressao[2]}`
    }
}

function totalCapitulosOuvidos() {
    let capitulosOuvidos = JSON.parse(localStorage.capitulosOuvidos)
    totalCapOuvidos = capitulosOuvidos.length
    document.querySelector("#totalCapitulos").innerHTML = totalCapOuvidos
}

function imprimeFatiado(lista) {
    // caso hora, min ou seg seja = 0, omite o 0, como tb faz lgumas modificações no texto:
    //  lista[0] - hora
    //  lista[1] - minuto
    //  lista[2] - segundo
    if (lista[0] === 0) {
        lista[0] = ''
    } else {
        lista[0] = `${lista[0]} hs `
    }
    if (lista[1] === 0) {
        lista[1] = ''
    } else {
        lista[1] = `${lista[1]} min `
    }
    if (lista[2] === 0) {
        lista[2] = ''
    } else {
        lista[2] = `${lista[2]} seg`
    }

    let novaLista = [lista[0], lista[1], lista[2]]
    return novaLista
}

function piechart() {
    google.charts.load("current", {
        packages: ["corechart"],
        'language': 'pt-BR'
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        let data = google.visualization.arrayToDataTable([
            ['Dado', 'Valor'],
            ['Falta ouvir', Math.trunc(faltaOuvirTotal / 60)],
            ['Já ouvido', Math.trunc(totalTempo / 60)]
        ]);

        let options = {
            // is3D: true,
            pieHole: 0.5,
            colors: ['#ff6666', '#668cff'],
            legend: 'bottom',
            width: window.innerWidth,
            height: 320,
            chartArea: {
                top: '7%',
                left: 0,
                width: '90%',
                height: '80%'
            },
        };

        // if(window.innerWidth < 350){ options.width = 300 }
        // if(window.innerWidth > 380){ options.width = 380 }
        // if(window.innerWidth > 450){ options.width = window.innerWidth }
        // if(window.innerWidth > 380){ options.width = window.innerWidth }

        let chart = new google.visualization.PieChart(document.querySelector('#pizza1'));
        chart.draw(data, options);
    }
}


function obtemDados() {
    // nro do mês atual e anterior:
    mesAnt = Number(mesHoje) - 1
    if (mesAnt < 10) mesAnt = `0${mesAnt}`
    // mesHoje = '07'   // para testes
    // mesAnt = '06'    // para testes

    // lista do mês atual:
    let listaMesAtual = JSON.parse(localStorage.getItem(`biblia_mes_${mesHoje}`))
    let listaMesAnterior = JSON.parse(localStorage.getItem(`biblia_mes_${mesAnt}`))

    // cria/reseta listas para receber filtragem de dados:
    let novaListaMensal = []
    let novaListaMesAtualSemVazios = []
    let novaListaMesAnteriorSemVazios = []

    // ABAIXO (para formar lista de dados de últimos 10 dias QUE OUVIU):
    // peneira os dias com valores vazios:
    // if(e) significa se o espaço da lista tem algum conteúdo...
    // O formato de saida para appendar às listas acima (no caso: ${i}/${mesHoje} é para sair com a data formatada d/mm):
    listaMesAtual.map((e, i) => {
        if (e) {
            let subLista = [`${i}/${mesHoje}`, Math.trunc(e / 60)]
            novaListaMesAtualSemVazios.push(subLista)
            // abaixo: descartado pq confundiria usuário ao ver: "19.79 minutos"
            // let subLista = [`${i}/${mesHoje}`, Number((e/60).toFixed(2))]
        }
    })

    listaMesAnterior.map((e, i) => {
        if (e) {
            let subLista = [`${i}/${mesAnt}`, Math.trunc(e / 60)]
            novaListaMesAnteriorSemVazios.push(subLista)
            // let subLista = [`${i}/${mesAnt}`, Number((e/60).toFixed(2))]
        }
    })

    // faz um merge das listas dos últimos dias do mês atual + mês anterior
    let novasListas = [...novaListaMesAnteriorSemVazios, ...novaListaMesAtualSemVazios]

    // Filtra de toda a lista acima, apenas os 10 itens (dias):
    // usa reverse duas vezes para obter apenas os últimos 10 da lista e não os primeiros 10 da lista:
    // esta array global abaixo será exportada/retornada para os gráficos10dias:
    listaUlt10dias = novasListas.reverse().filter((e, i) => i < 10).reverse()
    // "cabeçalho" da lista:
    listaUlt10dias.unshift(['Dia/Mês', 'Minutos'])


    // console.log(typeof (listaUlt10dias))
    // console.log('lista 10 dias atrás: ', listaUlt10dias)

    //////////////////////////////////////////////////////

    // para gráfico semanal:

    // obtem dia do mes (25) e dia da semana (0 - Domingo)
    domingoPassado = hoje.getDate() - hoje.getDay()

    // pega biblia_mes_[mesHoje][domingoPassado] até biblia_mes_[mesHoje][domingoPassado + 6]
    // cria/reseta array global para ser exportada:
    listaSemana = []

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

    //////////////////////////////////////////////////////

    // para gráfico mensal:

    listaMesAtual.map((e, i) => {
        let subLista = [`${i}/${mesHoje}`, Math.trunc(e / 60)]
        novaListaMensal.push(subLista)
    })

    // remove item[0] da lista, pq é vazio:
    novaListaMensal.shift()

    // retorna qtos dias tem o mêsHoje (se 28, 30, 31?):
    let qtosDiasTemMes = new Date(anoHoje, mesHoje, 0).getDate()

    // abaixo: array global filtrado conforme nro de dias do mês:
    // esse array será exportado:
    listaMensal = novaListaMensal.filter((e, i) => i < qtosDiasTemMes)
    // "cabeçalho" da lista:
    listaMensal.unshift(['Dia/Mês', 'Minutos'])

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

}

function calculaMedia() {
    ////////////////////////// CÁLCULOS DE MÉDIA /////////////////////////////

    // reseta média (é variável global):
    media = 0

    // Cria lista para obter dados do tempo dos 10 últimos dias: 
    let tempo10dias = []

    // Dos valores da listaUlt10dias obtem apenas os tempos (minutos):
    console.log(listaUlt10dias)
    listaUlt10dias.map(a => tempo10dias.push(a[1]))
    // remove o primeiro item da lista (que é apenas um cabeçalho de nome da coluna):
    tempo10dias.shift()

    // soma total do tempo da lista:
    let acumulado10dias = tempo10dias.reduce((total, cada) => total + cada, 0)

    // calcula a média dos 10 dias:
    media = Math.round(acumulado10dias / 10)

    // imprime em tela na details .media:
    document.querySelector('#media').innerHTML = media

    // hoje em relação com a média. Média está em minutos, qtoOuviuHoje está em segundos:
    relacaoMedia = Math.round((qtoOuviuHoje / 60) - media)

    // imprime valor e frase:
    if (relacaoMedia < 0) {
        document.querySelector('#frenteOuTras').style.color = 'red'
        document.querySelector('#frenteOuTras').innerHTML = "atrás"
        document.querySelector('#mediaHoje').innerHTML = relacaoMedia * -1
    } else {
        document.querySelector('#frenteOuTras').style.color = 'green'
        document.querySelector('#frenteOuTras').innerHTML = "a frente"
        document.querySelector('#mediaHoje').innerHTML = relacaoMedia
    }

    let estimativaTempo = Math.round((faltaOuvirTotal / 60) / media)
    document.querySelector('#faltaMedia').innerHTML = estimativaTempo
}

/////// 3 funções de execução de gráficos: mensal, semanal e 10 dias ///////

function graficoSemanal() {
    document.querySelector('.areaGraficoBarras').classList.remove('oculta')

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
    document.querySelector('.areaGraficoBarras').classList.remove('oculta')

    // problema: quando a semana vai de 28 do mes anterior até 4 do outro mes, p.ex.

    // exporta para gráfico de barras:
    console.log(listaSemana)
    let titulo = `AUDIÊNCIA DA SEMANA: ${domingoPassado}/${mesHoje} (Domingo) à ${domingoPassado+6}/${mesHoje} (Sábado)`
    geraGrafico(listaSemana, titulo)

    // pinta botão correspondente:
    document.querySelectorAll('.cabecalhoPeriodo > div').forEach(a => {
        a.style.background = 'khaki'
    })
    document.querySelector('#semanasOuvido').style.background = 'chocolate'
}

function grafico10dias() {
    document.querySelector('.areaGraficoBarras').classList.remove('oculta')

    // o array listaUlt_10dias é global e já recebeu valores de obtemDados():
    console.log(listaUlt10dias)

    // chama o gráfico:
    let titulo = "ÚLTIMOS 10 DIAS - em minutos:"
    geraGrafico(listaUlt10dias, titulo)

    // pinta botão correspondente:
    document.querySelectorAll('.cabecalhoPeriodo > div').forEach(a => {
        a.style.background = 'khaki'
    })
    document.querySelector('#ult10Ouvido').style.background = 'chocolate'
}

function graficoMensal() {
    document.querySelector('.areaGraficoBarras').classList.remove('oculta')

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

    // exporta para gráfico de barras:
    console.log(listaMensal)
    let titulo = `AUDIÊNCIA DO MÊS ${mesHoje}`
    geraGrafico(listaMensal, titulo)
    // abreDivDesempenho()
    // disparaGraficos()

    // pinta botão correspondente:
    document.querySelectorAll('.cabecalhoPeriodo > div').forEach(a => {
        a.style.background = 'khaki'
    })
    document.querySelector('#mesesOuvido').style.background = 'chocolate'
}

function geraGrafico(listaXY, tituloGrafico) {

    //////////////// PREPARAÇÃO DOS GRÁFICOS DE BARRAS 10 DIAS /////////////

    let listaDados = listaXY
    let titulo = tituloGrafico

    google.charts.load("current", {
        packages: ["corechart"],
        'language': 'pt-BR'
    });

    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        // para ser aceito no Google Charts, é preciso esta linha como cabeçalho:
        // IMPORTA :
        // listaUlt10dias.unshift(['Dia/Mês', 'Minutos'])
        // listaDados.unshift(['Dia/Mês', 'Minutos'])

        // abaixo: Passa os valores de X e Y do gráfico (neste caso, está no array listaUlt10dias):
        let data = google.visualization.arrayToDataTable(
            // listaUlt10dias
            listaDados
        );

        // abaixo: Estiliza o gráfico, título, legendas, cores, animações, etc..:
        // IMPORTA : title
        let options = {
            // title: 'ÚLTIMOS 10 DIAS - EM MINUTOS',
            title: titulo,
            legend: {
                position: 'none'
            },
            colors: ['#e7711c'],
            'width': window.innerWidth,
            'height': '70%',
            'chartArea': {
                width: '80%',
                height: '80%'
            },
            animation: {
                duration: 3000,
                easing: 'out',
            },
        };

        let chart

        // define tipo gráfico e dispara na div escolhida:
        // let chart = new google.visualization.BarChart(document.querySelector('#graficosBarras'));
        // document.querySelector('#barrasV').classList.add('oculta')
        chart = new google.visualization.ColumnChart(document.querySelector('#graficosBarras'));
        chart.draw(data, options);


        // muda para gráfico de colunas (barras verticais):
        document.querySelector('#barrasV').addEventListener('click', () => {
            document.querySelector('#barrasV').classList.add('oculta')
            document.querySelector('#barrasH').classList.remove('oculta')
            document.querySelector('#escolhaBarra').classList.add('oculta')
            // document.querySelector('#ajuste2').classList.remove('oculta')
            // abaixo muda o id
            chart = new google.visualization.ColumnChart(document.querySelector('#graficosBarras'))
            chart.draw(data, options)
        })

        // muda para gráfico de barras horizontais:
        document.querySelector('#barrasH').addEventListener('click', () => {
            document.querySelector('#barrasH').classList.add('oculta')
            document.querySelector('#barrasV').classList.remove('oculta')
            document.querySelector('#escolhaBarra').classList.add('oculta')
            // document.querySelector('#ajuste2').classList.remove('oculta')
            // abaixo: muda o id:
            chart = new google.visualization.BarChart(document.querySelector('#graficosBarras'))
            chart.draw(data, options)
        })
    }
}

// desnecessário:
/* 
// para ajustar clica no gráfico de pizza:
document.querySelector('#pizza1').addEventListener('click', () => {
    disparaGraficos()
    // abreDivDesempenho()
    document.querySelector('#pizza1').scrollIntoView({
        behavior: 'smooth'
    });
    document.querySelector('#ajuste1').style.display = 'none'
})


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

// quando o usuário clica num dos 3 botões de gráficos de barras, disparam os seguintes eventos:
let btSemanal = document.querySelector('#semanasOuvido')
let bt10dias = document.querySelector('#ult10Ouvido')
let btMensal = document.querySelector('#mesesOuvido')

btSemanal.addEventListener('click', graficoSemanal)
bt10dias.addEventListener('click', grafico10dias)
btMensal.addEventListener('click', graficoMensal)



function disparaGraficos() {
    // obtem tempo de audicao do local Storage:
    tempoAudicao = Math.trunc(Number(localStorage.tempoAudicao))

    // obtem o tempo corrente da fx que o usuário está ouvindo:
    tempoFaixaAtual = Math.trunc(player.currentTime)

    // total com o tempo de duração da faixa atual que está sendo tocada:
    totalTempo = tempoAudicao + tempoFaixaAtual

    // obtem todos os dados de tempo do momento atual:
    obtemDataHoje()

    totalCapitulosOuvidos()
    quantoOuviuHoje()

    totalTempoOuvido(totalTempo)
    faltaOuvir(totalTempo)

    piechart()
    obtemDados()
    calculaMedia()
}