// arquivo que contem os dados de cada um dos 66 livros da Bíblia

const BibliaOBJ = [{
        "livro": "",
        "abrev": "",
        "qtdeCap": "",
        "testamento": "",
        "cronologia": "",
        "abreviacion": "",
        "nombreLibro": ""
    },
    {
        "livro": "Gênesis",
        "abrev": "Gn",
        "qtdeCap": "50",
        "testamento": "AT",
        "cronologia": "1",
        "abreviacion": "Gn",
        "nombreLibro": "Génesis"
    },
    {
        "livro": "Êxodo",
        "abrev": "Ex",
        "qtdeCap": "40",
        "testamento": "AT",
        "cronologia": "2",
        "abreviacion": "Ex",
        "nombreLibro": "Éxodo"
    },
    {
        "livro": "Levítico",
        "abrev": "Lv",
        "qtdeCap": "27",
        "testamento": "AT",
        "cronologia": "3",
        "abreviacion": "Lv",
        "nombreLibro": "Levítico"
    },
    {
        "livro": "Números",
        "abrev": "Nm",
        "qtdeCap": "36",
        "testamento": "AT",
        "cronologia": "4",
        "abreviacion": "Nm",
        "nombreLibro": "Números"
    },
    {
        "livro": "Deuteronômio",
        "abrev": "Dt",
        "qtdeCap": "34",
        "testamento": "AT",
        "cronologia": "5",
        "abreviacion": "Dt",
        "nombreLibro": "Deuteronomio"
    },
    {
        "livro": "Josué",
        "abrev": "Js",
        "qtdeCap": "24",
        "testamento": "AT",
        "cronologia": "6",
        "abreviacion": "Jos",
        "nombreLibro": "Josué"
    },
    {
        "livro": "Juízes",
        "abrev": "Jz",
        "qtdeCap": "21",
        "testamento": "AT",
        "cronologia": "7",
        "abreviacion": "Jue",
        "nombreLibro": "Jueces"
    },
    {
        "livro": "Rute",
        "abrev": "Rt",
        "qtdeCap": "4",
        "testamento": "AT",
        "cronologia": "8",
        "abreviacion": "Rt",
        "nombreLibro": "Rut"
    },
    {
        "livro": "1 Samuel",
        "abrev": "1Sm",
        "qtdeCap": "31",
        "testamento": "AT",
        "cronologia": "9",
        "abreviacion": "1S",
        "nombreLibro": "1 Samuel"
    },
    {
        "livro": "2 Samuel",
        "abrev": "2Sm",
        "qtdeCap": "24",
        "testamento": "AT",
        "cronologia": "10",
        "abreviacion": "2S",
        "nombreLibro": "2 Samuel"
    },
    {
        "livro": "1 Reis",
        "abrev": "1Rs",
        "qtdeCap": "22",
        "testamento": "AT",
        "cronologia": "11",
        "abreviacion": "1R",
        "nombreLibro": "1 Reyes"
    },
    {
        "livro": "2 Reis",
        "abrev": "2Rs",
        "qtdeCap": "25",
        "testamento": "AT",
        "cronologia": "12",
        "abreviacion": "2R",
        "nombreLibro": "2 Reyes"
    },
    {
        "livro": "1 Crônicas",
        "abrev": "1Cr",
        "qtdeCap": "29",
        "testamento": "AT",
        "cronologia": "28",
        "abreviacion": "1Cr",
        "nombreLibro": "1 Crónicas"
    },
    {
        "livro": "2 Crônicas",
        "abrev": "2Cr",
        "qtdeCap": "36",
        "testamento": "AT",
        "cronologia": "29",
        "abreviacion": "2Cr",
        "nombreLibro": "2 Crónicas"
    },
    {
        "livro": "Esdras",
        "abrev": "Ed",
        "qtdeCap": "10",
        "testamento": "AT",
        "cronologia": "30",
        "abreviacion": "Esd",
        "nombreLibro": "Esdras"
    },
    {
        "livro": "Neemias",
        "abrev": "Ne",
        "qtdeCap": "13",
        "testamento": "AT",
        "cronologia": "31",
        "abreviacion": "Neh",
        "nombreLibro": "Nehemías"
    },
    {
        "livro": "Ester",
        "abrev": "Et",
        "qtdeCap": "10",
        "testamento": "AT",
        "cronologia": "27",
        "abreviacion": "Est",
        "nombreLibro": "Ester"
    },
    {
        "livro": "Jó",
        "abrev": "Jó",
        "qtdeCap": "42",
        "testamento": "AT",
        "cronologia": "35",
        "abreviacion": "Job",
        "nombreLibro": "Job"
    },
    {
        "livro": "Salmos",
        "abrev": "Sl",
        "qtdeCap": "150",
        "testamento": "AT",
        "cronologia": "36",
        "abreviacion": "Sal",
        "nombreLibro": "Salmos"
    },
    {
        "livro": "Provérbios",
        "abrev": "Pv",
        "qtdeCap": "31",
        "testamento": "AT",
        "cronologia": "37",
        "abreviacion": "Pr",
        "nombreLibro": "Proverbios"
    },
    {
        "livro": "Eclesiastes",
        "abrev": "Ec",
        "qtdeCap": "12",
        "testamento": "AT",
        "cronologia": "38",
        "abreviacion": "Ec",
        "nombreLibro": "Eclesiastés"
    },
    {
        "livro": "Cânticos",
        "abrev": "Ct",
        "qtdeCap": "8",
        "testamento": "AT",
        "cronologia": "39",
        "abreviacion": "Cnt",
        "nombreLibro": "Cantares"
    },
    {
        "livro": "Isaías",
        "abrev": "Is",
        "qtdeCap": "66",
        "testamento": "AT",
        "cronologia": "16",
        "abreviacion": "Is",
        "nombreLibro": "Isaías"
    },
    {
        "livro": "Jeremias",
        "abrev": "Jr",
        "qtdeCap": "52",
        "testamento": "AT",
        "cronologia": "22",
        "abreviacion": "Jer",
        "nombreLibro": "Jeremías"
    },
    {
        "livro": "Lamentações",
        "abrev": "Lm",
        "qtdeCap": "5",
        "testamento": "AT",
        "cronologia": "23",
        "abreviacion": "Lm",
        "nombreLibro": "Lamentaciones"
    },
    {
        "livro": "Ezequiel",
        "abrev": "Ez",
        "qtdeCap": "48",
        "testamento": "AT",
        "cronologia": "25",
        "abreviacion": "Ez",
        "nombreLibro": "Ezequiel"
    },
    {
        "livro": "Daniel",
        "abrev": "Dn",
        "qtdeCap": "12",
        "testamento": "AT",
        "cronologia": "26",
        "abreviacion": "Dn",
        "nombreLibro": "Daniel"
    },
    {
        "livro": "Oséias",
        "abrev": "Os",
        "qtdeCap": "14",
        "testamento": "AT",
        "cronologia": "15",
        "abreviacion": "Os",
        "nombreLibro": "Oseas"
    },
    {
        "livro": "Joel",
        "abrev": "Jl",
        "qtdeCap": "3",
        "testamento": "AT",
        "cronologia": "18",
        "abreviacion": "Jl",
        "nombreLibro": "Joel"
    },
    {
        "livro": "Amós",
        "abrev": "Am",
        "qtdeCap": "9",
        "testamento": "AT",
        "cronologia": "14",
        "abreviacion": "Am",
        "nombreLibro": "Amós"
    },
    {
        "livro": "Obadias",
        "abrev": "Ob",
        "qtdeCap": "1",
        "testamento": "AT",
        "cronologia": "24",
        "abreviacion": "Ab",
        "nombreLibro": "Abdías"
    },
    {
        "livro": "Jonas",
        "abrev": "Jn",
        "qtdeCap": "4",
        "testamento": "AT",
        "cronologia": "13",
        "abreviacion": "Jon",
        "nombreLibro": "Jonás"
    },
    {
        "livro": "Miquéias",
        "abrev": "Mq",
        "qtdeCap": "7",
        "testamento": "AT",
        "cronologia": "17",
        "abreviacion": "Mi",
        "nombreLibro": "Miqueas"
    },
    {
        "livro": "Naum",
        "abrev": "Na",
        "qtdeCap": "3",
        "testamento": "AT",
        "cronologia": "20",
        "abreviacion": "Nah",
        "nombreLibro": "Nahum"
    },
    {
        "livro": "Habacuque",
        "abrev": "Hc",
        "qtdeCap": "3",
        "testamento": "AT",
        "cronologia": "21",
        "abreviacion": "Hab",
        "nombreLibro": "Habacuc"
    },
    {
        "livro": "Sofonias",
        "abrev": "Sf",
        "qtdeCap": "3",
        "testamento": "AT",
        "cronologia": "19",
        "abreviacion": "Sof",
        "nombreLibro": "Sofonías"
    },
    {
        "livro": "Ageu",
        "abrev": "Ag",
        "qtdeCap": "2",
        "testamento": "AT",
        "cronologia": "32",
        "abreviacion": "Hag",
        "nombreLibro": "Hageo"
    },
    {
        "livro": "Zacarias",
        "abrev": "Zc",
        "qtdeCap": "14",
        "testamento": "AT",
        "cronologia": "33",
        "abreviacion": "Zac",
        "nombreLibro": "Zacarías"
    },
    {
        "livro": "Malaquias",
        "abrev": "Ml",
        "qtdeCap": "4",
        "testamento": "AT",
        "cronologia": "34",
        "abreviacion": "Mal",
        "nombreLibro": "Malaquías"
    },
    {
        "livro": "Mateus",
        "abrev": "Mt",
        "qtdeCap": "28",
        "testamento": "NT",
        "cronologia": "41",
        "abreviacion": "Mt",
        "nombreLibro": "Mateo"
    },
    {
        "livro": "Marcos",
        "abrev": "Mc",
        "qtdeCap": "16",
        "testamento": "NT",
        "cronologia": "40",
        "abreviacion": "Mc",
        "nombreLibro": "Marcos"
    },
    {
        "livro": "Lucas",
        "abrev": "Lc",
        "qtdeCap": "24",
        "testamento": "NT",
        "cronologia": "42",
        "abreviacion": "Lc",
        "nombreLibro": "Lucas"
    },
    {
        "livro": "João",
        "abrev": "Jo",
        "qtdeCap": "21",
        "testamento": "NT",
        "cronologia": "62",
        "abreviacion": "Jn",
        "nombreLibro": "Juan"
    },
    {
        "livro": "Atos",
        "abrev": "At",
        "qtdeCap": "28",
        "testamento": "NT",
        "cronologia": "43",
        "abreviacion": "Hch",
        "nombreLibro": "Hechos"
    },
    {
        "livro": "Romanos",
        "abrev": "Rm",
        "qtdeCap": "16",
        "testamento": "NT",
        "cronologia": "49",
        "abreviacion": "Ro",
        "nombreLibro": "Romanos"
    },
    {
        "livro": "1 Coríntios",
        "abrev": "1Co",
        "qtdeCap": "16",
        "testamento": "NT",
        "cronologia": "47",
        "abreviacion": "1Co",
        "nombreLibro": "1 Corintios"
    },
    {
        "livro": "2 Coríntios",
        "abrev": "2Co",
        "qtdeCap": "13",
        "testamento": "NT",
        "cronologia": "48",
        "abreviacion": "2Co",
        "nombreLibro": "2 Corintios"
    },
    {
        "livro": "Gálatas",
        "abrev": "Gl",
        "qtdeCap": "6",
        "testamento": "NT",
        "cronologia": "44",
        "abreviacion": "Gl",
        "nombreLibro": "Gálatas"
    },
    {
        "livro": "Efésios",
        "abrev": "Ef",
        "qtdeCap": "6",
        "testamento": "NT",
        "cronologia": "50",
        "abreviacion": "Ef",
        "nombreLibro": "Efesios"
    },
    {
        "livro": "Filipenses",
        "abrev": "Fp",
        "qtdeCap": "4",
        "testamento": "NT",
        "cronologia": "53",
        "abreviacion": "Fil",
        "nombreLibro": "Filipenses"
    },
    {
        "livro": "Colossenses",
        "abrev": "Cl",
        "qtdeCap": "4",
        "testamento": "NT",
        "cronologia": "51",
        "abreviacion": "Col",
        "nombreLibro": "Colosenses"
    },
    {
        "livro": "1 Tessalonicenses",
        "abrev": "1Ts",
        "qtdeCap": "5",
        "testamento": "NT",
        "cronologia": "45",
        "abreviacion": "1Ts",
        "nombreLibro": "1 Tesalonicenses"
    },
    {
        "livro": "2 Tessalonicenses",
        "abrev": "2Ts",
        "qtdeCap": "3",
        "testamento": "NT",
        "cronologia": "46",
        "abreviacion": "2Ts",
        "nombreLibro": "2 Tesalonicenses"
    },
    {
        "livro": "1 Timóteo",
        "abrev": "1Tm",
        "qtdeCap": "6",
        "testamento": "NT",
        "cronologia": "55",
        "abreviacion": "1Ti",
        "nombreLibro": "1 Timoteo"
    },
    {
        "livro": "2 Timóteo",
        "abrev": "2Tm",
        "qtdeCap": "4",
        "testamento": "NT",
        "cronologia": "56",
        "abreviacion": "2Ti",
        "nombreLibro": "2 Timoteo"
    },
    {
        "livro": "Tito",
        "abrev": "Tt",
        "qtdeCap": "3",
        "testamento": "NT",
        "cronologia": "54",
        "abreviacion": "Tit",
        "nombreLibro": "Tito"
    },
    {
        "livro": "Filemom",
        "abrev": "Fm",
        "qtdeCap": "1",
        "testamento": "NT",
        "cronologia": "52",
        "abreviacion": "Flm",
        "nombreLibro": "Filemón"
    },
    {
        "livro": "Hebreus",
        "abrev": "Hb",
        "qtdeCap": "13",
        "testamento": "NT",
        "cronologia": "61",
        "abreviacion": "He",
        "nombreLibro": "Hebreos"
    },
    {
        "livro": "Tiago",
        "abrev": "Tg",
        "qtdeCap": "5",
        "testamento": "NT",
        "cronologia": "57",
        "abreviacion": "Stg",
        "nombreLibro": "Santiago"
    },
    {
        "livro": "1 Pedro",
        "abrev": "1Pe",
        "qtdeCap": "5",
        "testamento": "NT",
        "cronologia": "58",
        "abreviacion": "1P",
        "nombreLibro": "1 Pedro"
    },
    {
        "livro": "2 Pedro",
        "abrev": "2Pe",
        "qtdeCap": "3",
        "testamento": "NT",
        "cronologia": "59",
        "abreviacion": "2P",
        "nombreLibro": "2 Pedro"
    },
    {
        "livro": "1 João",
        "abrev": "1Jo",
        "qtdeCap": "5",
        "testamento": "NT",
        "cronologia": "63",
        "abreviacion": "1Jn",
        "nombreLibro": "1 Juan"
    },
    {
        "livro": "2 João",
        "abrev": "2Jo",
        "qtdeCap": "1",
        "testamento": "NT",
        "cronologia": "64",
        "abreviacion": "2Jn",
        "nombreLibro": "2 Juan"
    },
    {
        "livro": "3 João",
        "abrev": "3Jo",
        "qtdeCap": "1",
        "testamento": "NT",
        "cronologia": "65",
        "abreviacion": "3Jn",
        "nombreLibro": "3 Juan"
    },
    {
        "livro": "Judas",
        "abrev": "Jd",
        "qtdeCap": "1",
        "testamento": "NT",
        "cronologia": "60",
        "abreviacion": "Jud",
        "nombreLibro": "Judas"
    },
    {
        "livro": "Apocalipse",
        "abrev": "Ap",
        "qtdeCap": "22",
        "testamento": "NT",
        "cronologia": "66",
        "abreviacion": "Ap",
        "nombreLibro": "Apocalipsis"
    }
]
