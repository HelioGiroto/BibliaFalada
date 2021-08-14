// GRAFICOS.JS

// Este script é para obter a quantidade de tempo e as faixas ouvidas pelo usuário e 
// fazer os gráficos estatísticos de desempenho da audição bíblica:

// Autor: Hélio Giroto

let totalCapOuvidos, faltaOuvirTotal, totalTempo, qtoOuviuHoje, mesAnt, listaUlt10dias, listaMensal, listaSemana, domingoPassado, media, relacaoMedia

function fatiaTempo(valor) {
    // Função para fornecer dados a partir de uma data requerida para que se tenha uma mensagem de tempo sobre qto tempo já ouviu ou não:
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
    // função para calcular o percentual de cor gradiente que pintará a quadrícula do nome do livro.
    // Ex.: valor=25; total=100. resultado = 25%.
    let resultado = Number((valor / (total) * 100).toFixed(2))
    return resultado
}

function quadriculasColor() {
    // pega todos os capítulos já ouvidos:
    let capitulosOuvidos = JSON.parse(localStorage.getItem('capitulosOuvidos'))
    // obtem todos os elementos da quadricula livros:
    let elementosQuadriculaLivro = document.querySelectorAll('.quadriculaLivro')

    // pinta as quadrículas de Livros conforme o  nro de capítulos ouvidos pelo usuário:
    elementosQuadriculaLivro.forEach(a => {
        // obtem o id desse elemento e tira o _ de seu nome:
        let nomeId = a.id
        // console.log(nomeId)
        let abrev = nomeId.replace('_', '')
        // quantos capítulos no total têm o livro (será preciso consultar no OBJ):
        let totalCapitulos
        BibliaOBJ.find((e,i)=>{
            if(e.abrev == abrev){totalCapitulos = e.qtdeCap}
        })
        // quantos capitulos desse livro já foram ouvidos:
        let qtdeCapitulosOuvidos = capitulosOuvidos.filter(a => a.includes(`${abrev} `)).length
        // faz cálculo da porcentagem de qto o ouvinte já escutou desse livro:
        let porcentagem = (Number(qtdeCapitulosOuvidos) / Number(totalCapitulos)) * 100
        // qto maior a porcentagem menor a cor (mais escuro), 
        // i. é: cor 90 = verde claro e cor 40 = verde mais escuro.
        // ex.: 0% = 90; 10% = 85; 70% = 55; 100% = 40...
        // https://codepen.io/colombe/pen/WNRdrPY
        let cor = 90 - (porcentagem / 2)
        // console.log(porcentagem)
        document.querySelector(`#${nomeId}`).style.background = `hsl(120, 50%, ${cor}%)`
    })

    // pinta de amarelo com letras vermelhas a quadrícula do livro atual; e as demais de preto:
    negritaLivro()
}

function totalTempoOuvido(valor) {
    // chama função:
    let tempoFatiado = fatiaTempo(valor)

    // imprime qto tempo já ouviu hoje em ('#tempoOuvido'):
    let impressao = imprimeFatiado(tempoFatiado)
    // document.querySelector('#tempoOuvido').innerHTML = `${impressao[0]}${impressao[1]}${impressao[2]}`
    document.querySelector('#tempoOuvido').innerHTML = `${impressao[0]}${impressao[1]}`
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
    // document.querySelector('#tempoFalta').innerHTML = `${impressao[0]}${impressao[1]}${impressao[2]}`
    document.querySelector('#tempoFalta').innerHTML = `${impressao[0]}${impressao[1]}`
}

function quantoOuviuHoje() {
    // mesHoje e diaHoje são variáveis globais atualizadas da função obtem_DataHoje() - ver disparaGraficos()
    let diaSemZero = diaHoje.toString().replace(/^0/, '')

    // obtem da lista${mes}[dia]
    qtoOuviuHoje = JSON.parse(localStorage.getItem(`biblia_mes_${mesHoje}`))[diaSemZero]

    // soma quanto ouviu hoje com o tempo de duração da faixa atual:
    qtoOuviuHoje = qtoOuviuHoje + tempoFaixaAtual

    // vai buscar os valores de hora, minuto e segundo de total de segundos (qtoOuviuHoje)
    let tempoFatiado = fatiaTempo(qtoOuviuHoje)

    // imprime qto tempo em ('#totalDiario'):
    let impressao = imprimeFatiado(tempoFatiado)
    if (qtoOuviuHoje == 0) {
        document.querySelector('#totalDiario').innerHTML = `nenhum capítulo...`
    } else {
        document.querySelector('#totalDiario').innerHTML = `${impressao[0]}${impressao[1]}${impressao[2]}`
        // document.querySelector('#totalDiario').innerHTML = `${impressao[0]}${impressao[1]}`
    }
}

function totalCapitulosOuvidos() {
    let capitulosOuvidos = JSON.parse(localStorage.capitulosOuvidos)
    totalCapOuvidos = capitulosOuvidos.length
    document.querySelector("#totalCapitulos").innerHTML = totalCapOuvidos
}

function imprimeFatiado(lista) {
    // caso hora, min ou seg seja = 0, omite o 0, como tb faz lgumas modificações no texto:
    //  lista[0] - hora    //  lista[1] - minuto    //  lista[2] - segundo:
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

function geraGraficoPizza() {
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

        // as opções abaixo comentadas, são para:
        // ativar 3D - mas desativa o donnut
        // slice - tira um pedaço para fora da pizza 0.X pixels
        let options = {
            // is3D: true,
            pieHole: 0.5,
            colors: ['#ff6666', '#668cff'],
            legend: 'bottom',
            width: window.innerWidth,
            height: 380,
            chartArea: {
                top: '7%',
                left: 0,
                width: '90%',
                height: '80%'
            },
            // slices: {1: {offset: 0.3}},
        };

        // if(window.innerWidth < 350){ options.width = 300 }
        // if(window.innerWidth > 380){ options.width = 380 }
        // if(window.innerWidth > 450){ options.width = window.innerWidth }
        // if(window.innerWidth > 380){ options.width = window.innerWidth }

        let chart = new google.visualization.PieChart(document.querySelector('#pizza1'));
        chart.draw(data, options);
    }
}

// prepara todas as listas de dados (X e Y) e faz os cálculos para fornecer às funções de graficar:
function obtemDados() {
    // nro do mês atual e anterior:
    mesAnt = Number(mesHoje) - 1
    if (mesAnt < 10) mesAnt = `0${mesAnt}`
    // mesHoje = '07'   // para testes
    // mesAnt = '06'    // para testes

    // lista do mês atual:
    let listaMesAtual = JSON.parse(localStorage.getItem(`biblia_mes_${mesHoje}`))
    let listaMesAnterior = JSON.parse(localStorage.getItem(`biblia_mes_${mesAnt}`))

    // ERRO - corrigir isto abaixo. Pq o item 0 das duas listas abaixo é o ano de 2021.
    listaMesAtual[0] = ''
    listaMesAnterior[0] = ''

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


    //////////////////////////////////////////////////////

    // para gráfico semanal:
    /* 
        // teste: 
        // 1° de SET - 4a. 
        // DomingoPassado = 29/ago!!
        diaHoje = '01'
        mesHoje = '09'
        mesAnt = '08'
        hoje = new Date(2021, 08, 1);
    */

    // cria/reseta array global para ser exportada:
    listaSemana = []

    // problema: quando a semana vai de 28 do mes anterior até 4 do outro mes, p.ex.

    // obtem dia do mes (25, p.ex.) e dia da semana (0 - Domingo)
    domingoPassado = hoje.getDate() - hoje.getDay()


    // se Domingo passado é antes do dia 1, o Domingo estará no mês passado!
    if (domingoPassado < 1) {

        // qtos dias tem o mêsPassado (se 28, 30, 31?):
        let qtosDiasTemMesAnt = new Date(anoHoje, mesAnt, 0).getDate()

        // forma lista de semana de dados:
        let diaSemanaUltDiaMesAnt = new Date(anoHoje, Number(mesAnt - 1), qtosDiasTemMesAnt).getDay()

        // console.log(`o ult dia do mes passado: ${mesAnt} foi ${qtosDiasTemMesAnt} e caiu numa ${diaSemanaUltDiaMesAnt}`)

        // você está no mes passado:
        // console.log('mesHoje ' + mesHoje)

        // então se faz backup do mes Atual como mes original:
        let mesHojeOriginal = mesHoje

        // muda o atual para anterior e posteriormente muda o atual para o original
        mesHoje = mesAnt

        // console.log('mesHoje ' + mesHoje) 
        // console.log('diaHoje =' + diaHoje)
        // console.log('diaSemanaUltDiaMesAnt : ' + diaSemanaUltDiaMesAnt)

        for (a = 0; a < 7; a++) {
            // nroDia será algum nro de 1 a 31
            let nroDia = domingoPassado + a + qtosDiasTemMesAnt
            // se o dia atual passou o último dia do Mês passado, vira o mês!
            if (nroDia > qtosDiasTemMesAnt) {
                nroDia = a - diaSemanaUltDiaMesAnt // erro corrigido. antes era: nroDia = a
                mesHoje = mesHojeOriginal
            }
            // para efeito de formatação coerente com o nome do array em localStorage:
            if (Number(mesHoje) < 9) {
                mesHoje = `0${Number(mesHoje)}`
            }
            // procura na array do localStorage no mesHoje e no nroDia o valor:
            let segundosDia = JSON.parse(localStorage.getItem(`biblia_mes_${mesHoje}`))[nroDia]
            // converte para minutos:
            let minutosDia = Math.trunc(segundosDia / 60)
            // forma a data para a nova lista neste formato: 21/09 (p.ex.):
            let qualDia = `${nroDia}/${mesHoje}`
            // forma uma lista com os dois valores: data e minutos:
            let subLista = [qualDia, minutosDia]
            // appenda na array listaSemana:
            listaSemana.push(subLista)
        }

        // domingoPassado não é 0, ou -1, ou -3... mas sim:
        // esta atualização da variável abaixo é para ir no título do gráfico semanal:
        domingoPassado = domingoPassado + qtosDiasTemMesAnt

    } else {
        // não estamos na primeira semana do mês nem que o Domingo foi < 1.
        // forma um array de 7 items (dias) - de 0 (domingo) até 6 (sábado)...
        // ... para receber os valores do localStorage ref. ao dia e mês da semana atual:
        for (a = 0; a < 7; a++) {
            // obtem nro do dia da semana do dia-da-semana[a] baseado no dia que era DomingoPassado:
            let nroDia = domingoPassado + a
            // procura na array do localStorage no mesHoje e no nroDia o valor:
            let segundosDia = JSON.parse(localStorage.getItem(`biblia_mes_${mesHoje}`))[nroDia]
            // converte para minutos:
            let minutosDia = Math.trunc(segundosDia / 60)
            // forma a data para a nova lista neste formato: 21/09 (p.ex.):
            let qualDia = `${nroDia}/${mesHoje}`
            // forma uma lista com os dois valores: data e minutos:
            let subLista = [qualDia, minutosDia]
            // appenda na array listaSemana:
            listaSemana.push(subLista)
        }
    }

    // pega biblia_mes_[mesAnt][domingoPassado] até biblia_mes_[mesHoje][domingoPassado + 6]

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

}

// faz cálculo de média baseado na array de 10 dias de audição do usuário:
function calculaMedia() {
    ////////////////////////// CÁLCULOS DE MÉDIA /////////////////////////////

    // reseta média (é variável global):
    media = 0

    // Cria lista para obter dados do tempo dos 10 últimos dias: 
    let tempo10dias = []

    // Dos valores da listaUlt10dias obtem apenas os tempos (minutos):
    // o array global abaixo vem da função obtemDados():
    listaUlt10dias.map(a => tempo10dias.push(a[1]))
    // console.log(listaUlt10dias)
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

    // exporta para gráfico de barras:
    console.log(listaSemana)
    let titulo = `AUDIÊNCIA DA SEMANA: ${domingoPassado}/${mesHoje} (Domingo) à ${listaSemana[7][0]} (Sábado)`
    geraGraficoBarras(listaSemana, titulo)

    // pinta botão correspondente:
    document.querySelectorAll('.cabecalhoPeriodo > div').forEach(a => {
        a.style.background = 'khaki'
    })
    document.querySelector('#semanasOuvido').style.background = 'chocolate'
}

function grafico10dias() {

    // o array listaUlt_10dias é global e já recebeu valores de obtemDados():
    console.log(listaUlt10dias)

    // chama o gráfico:
    let titulo = "ÚLTIMOS 10 DIAS - em minutos:"
    geraGraficoBarras(listaUlt10dias, titulo)

    // pinta botão correspondente:
    document.querySelectorAll('.cabecalhoPeriodo > div').forEach(a => {
        a.style.background = 'khaki'
    })
    document.querySelector('#ult10Ouvido').style.background = 'chocolate'
}

function graficoMensal() {

    // exporta para gráfico de barras:
    console.log(listaMensal)
    let titulo = `AUDIÊNCIA DO MÊS ${mesHoje}`
    geraGraficoBarras(listaMensal, titulo)

    // pinta botão correspondente:
    document.querySelectorAll('.cabecalhoPeriodo > div').forEach(a => {
        a.style.background = 'khaki'
    })
    document.querySelector('#mesesOuvido').style.background = 'chocolate'
}

function geraGraficoBarras(listaXY, tituloGrafico) {

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
            /* 
             */
            hAxis: {
                title: 'Dia/Mês'
            },
            vAxis: {
                title: 'Minutos'
            },
            colors: ['#e7711c'],
            'width': window.innerWidth,
            'height': '100%', // era 70%
            'chartArea': {
                width: '80%',
                height: '70%'
            },
            animation: {
                duration: 3000,
                easing: 'out',
            },
        };

        let chart

        // define tipo de gráfico inicialmente (na abertura):
        // let chart = new google.visualization.BarChart(document.querySelector('#graficosBarras'));
        chart = new google.visualization.ColumnChart(document.querySelector('#graficosBarras'));
        chart.draw(data, options);

        // mostra os botões de escolher tipo de gráfico de barras (inicialmente):
        document.querySelector('.btsMudaBarra').classList.remove('oculta')
        document.querySelector('#escolheTipoGrafico').classList.remove('oculta')
        document.querySelector('#barrasH').classList.remove('oculta')
        document.querySelector('#linhaChart').classList.remove('oculta')
        document.querySelector('#barrasV').classList.add('oculta')
        rolaBarras()


        // muda para gráfico de colunas (barras verticais):
        document.querySelector('#barrasV').addEventListener('click', () => {
            document.querySelector('#barrasV').classList.add('oculta')
            document.querySelector('#barrasH').classList.remove('oculta')
            document.querySelector('#linhaChart').classList.remove('oculta')
            // document.querySelector('#ajuste2').classList.remove('oculta')
            options.hAxis.title = 'Dia/Mês'
            options.vAxis.title = 'Minutos'
            // abaixo muda o id
            chart = new google.visualization.ColumnChart(document.querySelector('#graficosBarras'))
            chart.draw(data, options)
            rolaBarras()
        })

        // muda para gráfico de barras horizontais:
        document.querySelector('#barrasH').addEventListener('click', () => {
            document.querySelector('#barrasH').classList.add('oculta')
            document.querySelector('#barrasV').classList.remove('oculta')
            document.querySelector('#linhaChart').classList.remove('oculta')
            // document.querySelector('#ajuste2').classList.remove('oculta')
            options.vAxis.title = 'Dia/Mês'
            options.hAxis.title = 'Minutos'
            // abaixo: muda o id:
            chart = new google.visualization.BarChart(document.querySelector('#graficosBarras'))
            chart.draw(data, options)
            rolaBarras()
        })

        // muda para gráfico de linhas:
        document.querySelector('#linhaChart').addEventListener('click', () => {
            document.querySelector('#barrasH').classList.remove('oculta')
            document.querySelector('#barrasV').classList.remove('oculta')
            document.querySelector('#linhaChart').classList.add('oculta')
            // document.querySelector('#ajuste2').classList.remove('oculta')
            options.hAxis.title = 'Dia/Mês'
            options.vAxis.title = 'Minutos'
            // abaixo: muda o id:
            chart = new google.visualization.LineChart(document.querySelector('#graficosBarras'))
            chart.draw(data, options)
            rolaBarras()
        })

    }
}

// futuramente: 
function geraGraficoCalendario() {
    google.charts.load("current", {
        packages: ["calendar"],
        'language': 'pt-BR'
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        let dataTable = new google.visualization.DataTable();
        dataTable.addColumn({
            type: 'date',
            id: 'Date'
        });
        dataTable.addColumn({
            type: 'number',
            id: 'Won/Loss'
        });
        dataTable.addRows([
            [new Date(2012, 3, 13), 37032],
            [new Date(2012, 3, 14), 38024],
            [new Date(2012, 3, 15), 38024],
            [new Date(2012, 3, 16), 38108],
            [new Date(2012, 3, 17), 38229],
        ]);

        let chart = new google.visualization.Calendar(document.querySelector('#calendario'));

        let options = {
            title: "Título do calendário",
            color: 'black',
            calendar: {
                cellSize: 12, // 16. Diminuindo, diminui tb o width do graf.
                daysOfWeek: 'DSTQQSS',
                underYearSpace: 10,
                dayOfWeekLabel: {
                    fontName: 'Times-Roman',
                    fontSize: 12,
                    color: 'grey',
                    bold: true,
                    italic: true,
                },
                monthLabel: {
                    fontName: 'Times-Roman',
                    fontSize: 12,
                    color: 'darkred',
                    bold: true,
                    italic: true
                },
                yearLabel: {
                    fontName: 'Times-Roman',
                    fontSize: 30,
                    color: 'darkblue',
                    bold: true,
                    italic: true
                }
            },
            width: 640,
            height: 350,
        };

        chart.draw(dataTable, options);
    }
}


// quando o usuário clica num dos 3 botões de gráficos de barras, disparam os seguintes eventos:
let btSemanal = document.querySelector('#semanasOuvido')
let bt10dias = document.querySelector('#ult10Ouvido')
let btMensal = document.querySelector('#mesesOuvido')

btSemanal.addEventListener('click', graficoSemanal)
bt10dias.addEventListener('click', grafico10dias)
btMensal.addEventListener('click', graficoMensal)


// para ajustar clica no gráfico de pizza:
document.querySelector('#pizza1').addEventListener('click', () => {
    disparaGraficos()
    // abreDivDesempenho()
    document.querySelector('#pizza1').scrollIntoView({
        behavior: 'smooth'
    });
    document.querySelector('#ajuste1').style.display = 'none'
})


function disparaGraficos() {
    // aumenta a altura da area do gráfico de Barras:
    // document.querySelector('#graficosBarras').style.height = window.innerWidth

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

    geraGraficoPizza()
    obtemDados()
    calculaMedia()
}


// pinta quadrículas de livros conforme o nro de capítulos já ouvidos:
quadriculasColor()
