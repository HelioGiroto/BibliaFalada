#!/bin/bash

# como gerei os arrays no formato js desde o arquivo acf.js

LIVROS=("" "Gn" "Ex" "Lv" "Nm" "Dt" "Js" "Jz" "Rt" "1Sm" "2Sm" "1Rs" "2Rs" "1Cr" "2Cr" "Ed" "Ne" "Et" "Jó" "Sl" "Pv" "Ec" "Ct" "Is" "Jr" "Lm" "Ez" "Dn" "Os" "Jl" "Am" "Ob" "Jn" "Mq" "Na" "Hc" "Sf" "Ag" "Zc" "Ml" "Mt" "Mc" "Lc" "Jo" "At" "Rm" "1Co" "2Co" "Gl" "Ef" "Fp" "Cl" "1Ts" "2Ts" "1Tm" "2Tm" "Tt" "Fm" "Hb" "Tg" "1Pe" "2Pe" "1Jo" "2Jo" "3Jo" "Jd" "Ap")


cut -d':' -f1 acf.js | uniq | sed 's/\["//' > livros.dat


grep -c 'Ap ' livros.dat 


for i in ${LIVROS[*]}; do grep -c $i livros.dat ; done | xargs


