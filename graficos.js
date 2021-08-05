// GRAFICOS.JS

// Este script é para obter a quantidade de tempo e as faixas ouvidas pelo usuário e 
// fazer os gráficos estatísticos de desempenho da leitura bíblica:

// Autor: Hélio Giroto

let totalCapOuvidos, faltaOuvirTotal, totalTempo, qtoOuviuHoje, media, relacaoMedia

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
    // obtem nro do mes e do dia:
    obtemDataHoje()
    // mesHoje e diaHoje são variáveis globais atualizadas ao serem chamadas na função obtemDataHoje() - ver calculaMetricas()
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

// para ajustar:
document.querySelector('#pizza1').addEventListener('click', () => {
    abreDivDesempenho()
    document.querySelector('#pizza1').scrollIntoView({
        behavior: 'smooth'
    });
    document.querySelector('#ajuste1').style.display = 'none'
})

function ult10dias() {
    // obtem nro do mes:
    obtemDataHoje()

    // manipula string do nro do mês atual e anterior:
    let mesAnt = Number(mesHoje) - 1
    if (mesAnt < 10) mesAnt = `0${mesAnt}`

    // obtem dados da lista do mês atual:
    let listaMesAtual = JSON.parse(localStorage.getItem(`biblia_mes_${mesHoje}`))
    let listaMesAnterior = JSON.parse(localStorage.getItem(`biblia_mes_${mesAnt}`))

    // reseta listas:
    let novaListaMesAtual = []
    let novaListaMesAnterior = []

    // ABAIXO:
    // if(e) significa se o espaço da lista tem algum conteúdo...
    // O formato de saida para appendar às listas acima (no caso: ${i}/${mesHoje} é para sair com a data formatada d/mm):
    listaMesAtual.map((e, i) => {
        if (e) {
            let subLista = [`${i}/${mesHoje}`, Math.trunc(e / 60)]
            // abaixo: descartado pq confundiria usuário ao ver: "19.79 minutos"
            // let subLista = [`${i}/${mesHoje}`, Number((e/60).toFixed(2))]
            novaListaMesAtual.push(subLista)
        }
    })

    listaMesAnterior.map((e, i) => {
        if (e) {
            let subLista = [`${i}/${mesAnt}`, Math.trunc(e / 60)]
            // let subLista = [`${i}/${mesAnt}`, Number((e/60).toFixed(2))]
            novaListaMesAnterior.push(subLista)
        }
    })

    /* 
    // formato antes do mesmo que está ACIMA:
    
    listaMesAnterior.map((e,i)=>{
        if(e){
            let subLista = [`${i}`, mesAnt, e]
            novaListaMesAnterior.push(subLista)
        }
    })
    
    //  saida: ["26", "07", 20.842181]
    */

    // ABAIXO: Não é necessário, senão o gráfico tb ficará ao revés.
    // coloca em ordem inversa de dias: 31, 30, 29, 28.... 1.
    // novaListaMesAtual = novaListaMesAtual.reverse()
    // novaListaMesAnterior = novaListaMesAnterior.reverse()


    // faz um merge das listas dos últimos dias do mês atual + mês anterior
    let listaUltDias = [...novaListaMesAnterior, ...novaListaMesAtual]

    // de toda a lista acima, pega apenas 10 itens (dias):
    // usa reverse duas vezes para obter apenas os últimos 10 da lista e não os primeiros 10 da lista:
    let listaUlt10dias = listaUltDias.reverse().filter((e, i) => i < 10).reverse()

    // console.log(typeof (listaUlt10dias))
    // console.log('lista 10 dias atrás: ', listaUlt10dias)

    ////////////////////////// CÁLCULOS DE MÉDIA /////////////////////////////

    // reseta média (é variável global):
    media = 0

    // Cria lista para obter dados do tempo dos 10 últimos dias: 
    let tempo10dias = []

    // pega da lista de dados listaUlt10dias somente o valor do tempo (sem data):
    listaUlt10dias.map(a => tempo10dias.push(a[1]))
    console.log(listaUlt10dias)

    // soma total do tempo da lista:
    let total10dias = tempo10dias.reduce((total, cada) => total + cada, 0)
    // console.log(total10dias)

    // calcula a média dos 10 dias:
    media = Math.round(total10dias / 10)

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

    ////////////////////////// PREPARAÇÃO DOS GRÁFICOS /////////////////////////////

    // para ser aceito no Google Charts, é preciso esta linha como cabeçalho:
    listaUlt10dias.unshift(['Dia/Mês', 'Minutos'])

    // e o nro de index (do dia?)
    // listaMesAtual.reverse().filter(a=>a)
    // listaMesAnterior.reverse().filter(a=>a)

    google.charts.load("current", {
        packages: ["corechart"],
        'language': 'pt-BR'
    });

    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        // abaixo: Passa os valores de X e Y do gráfico (neste caso, está no array listaUlt10dias):
        let data = google.visualization.arrayToDataTable(
            listaUlt10dias
        );

        // abaixo: Estiliza o gráfico, título, legendas, cores, animações, etc..:
        let options = {
            title: 'ÚLTIMOS 10 DIAS - EM MINUTOS',
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

        // define tipo gráfico e dispara na div escolhida:
        // let chart = new google.visualization.ColumnChart(document.querySelector('#barras10dias'));
        // let chart = new google.visualization.BarChart(document.querySelector('#barras10dias'));
        // chart.draw(data, options);

        let chart

        // muda para gráfico de colunas (barras verticais):
        document.querySelector('#barrasV').addEventListener('click', () => {
            document.querySelector('#barrasV').classList.add('oculta')
            document.querySelector('#barrasH').classList.remove('oculta')
            document.querySelector('#escolhaBarra').classList.add('oculta')
            document.querySelector('#ajuste2').classList.remove('oculta')
            chart = new google.visualization.ColumnChart(document.querySelector('#barras10dias'))
            chart.draw(data, options)
        })

        // muda para gráfico de barras horizontais:
        document.querySelector('#barrasH').addEventListener('click', () => {
            document.querySelector('#barrasH').classList.add('oculta')
            document.querySelector('#barrasV').classList.remove('oculta')
            document.querySelector('#escolhaBarra').classList.add('oculta')
            document.querySelector('#ajuste2').classList.remove('oculta')
            chart = new google.visualization.BarChart(document.querySelector('#barras10dias'))
            chart.draw(data, options)
        })
    }
}

// clica no gráfico para ajustar:
document.querySelector('#barras10dias').addEventListener('click', () => {
    abreDivDesempenho()
    document.querySelector('#barras10dias').scrollIntoView({
        behavior: 'smooth'
    });
    document.querySelector('#ajuste2').style.display = 'none'
})

/* 
// quando muda a orientação do celular, chama novamente a função ult10dias para ajustar ao tamanho responsivo o bar column plot:
// https://stackoverflow.com/questions/4917664/detect-viewport-orientation-if-orientation-is-portrait-display-alert-message-ad
window.addEventListener("orientationchange", () => {
    piechart()
    // ult10dias()
    // calculaMetricas()
    // ERRO - corrigir melhor.
})

 */
// https://developers.google.com/chart/interactive/docs/gallery/piechart?hl=en#data-format
// http://www.duncanstruthers.design/ddv/tutorials/google-charts/responsive-google-charts-api/
// https://developers.google.com/chart/interactive/docs/gallery/columnchart?hl=en


function calculaMetricas() {
    // obtem tempo de audicao do local Storage:
    tempoAudicao = Math.trunc(Number(localStorage.tempoAudicao))

    // obtem o tempo corrente da fx que o usuário está ouvindo:
    tempoFaixaAtual = Math.trunc(player.currentTime)

    // total com o tempo de duração da faixa atual que está sendo tocada:
    totalTempo = tempoAudicao + tempoFaixaAtual

    totalCapitulosOuvidos()
    quantoOuviuHoje()

    totalTempoOuvido(totalTempo)
    faltaOuvir(totalTempo)

    piechart()
    ult10dias()
}