// Script para ser executado no console do navegador
// Adiciona novas propriedades ao objeto BibliaOBJ como nomes dos livros em outro idioma, etc.

// Autor: Hélio Giroto

let abreviaciones=["", "Gn", "Ex", "Lv", "Nm", "Dt", "Jos", "Jue", "Rt", "1S", "2S", "1R", "2R", "1Cr", "2Cr", "Esd", "Neh", "Est", "Job", "Sal", "Pr", "Ec", "Cnt", "Is", "Jer", "Lm", "Ez", "Dn", "Os", "Jl", "Am", "Ab", "Jon", "Mi", "Nah", "Hab", "Sof", "Hag", "Zac", "Mal", "Mt", "Mc", "Lc", "Jn", "Hch", "Ro", "1Co", "2Co", "Gl", "Ef", "Fil", "Col", "1Ts", "2Ts", "1Ti", "2Ti", "Tit", "Flm", "He", "Stg", "1P", "2P", "1Jn", "2Jn", "3Jn", "Jud", "Ap"]

let nombreLibros = ["", "Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio", "Josué", "Jueces", "Rut", "1 Samuel", "2 Samuel", "1 Reyes", "2 Reyes", "1 Crónicas", "2 Crónicas", "Esdras", "Nehemías", "Ester", "Job", "Salmos", "Proverbios", "Eclesiastés", "Cantares", "Isaías", "Jeremías", "Lamentaciones", "Ezequiel", "Daniel", "Oseas", "Joel", "Amós", "Abdías", "Jonás", "Miqueas", "Nahum", "Habacuc", "Sofonías", "Hageo", "Zacarías", "Malaquías", "Mateo", "Marcos", "Lucas", "Juan", "Hechos", "Romanos", "1 Corintios", "2 Corintios", "Gálatas", "Efesios", "Filipenses", "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo", "2 Timoteo", "Tito", "Filemón", "Hebreos", "Santiago", "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan", "Judas", "Apocalipsis"]

BibliaOBJ.map((a,b)=>{
    BibliaOBJ[b].abreviaciones = abreviaciones[b]
    BibliaOBJ[b].nombreLibro = nombreLibros[b]
})

copyFile(BibliaOBJ)
