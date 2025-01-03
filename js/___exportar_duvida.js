// este script estava na anterior index.html, mas não sei se funciona ou é descartável

//  <!-- AQUI ABAIXO: não sei se deve estar aqui este script ou em exportar.js ??? -->
//        <!-- de todas as formas a função que se ativava ao clicar no botão #iconeMais foi comentada -->
//        <script>
            // define variáveis globais
            let arqImportado, conteudoArquivo, ok1, ok2, ok3

            // obtem o arquivo a ser importado que vai "subir" do dispositivo do usuário:
            const arqEscolhido = document.querySelector("#arqEscolhido");

            // conteudo de arquivo teste:
            // ok1 = "Jesus seja louvado!"
            // ok2 = [10, 11, 12]
            // ok3 = 123

            // dispara o evento:
            arqEscolhido.addEventListener("change", () => {
                // pega o arquivo escolhido 
                arqImportado = arqEscolhido.files[0];
                // imprime em console
                console.log(arqImportado)

                // lê o arquivo como texto:
                let reader = new FileReader();
                reader.readAsText(arqImportado);

                // ao terminar (end) de carregar...:
                // reader.onload = () => {  // antes
                reader.onloadend = () => {
                    // var global recebe o conteudo do arquivo:
                    conteudoArquivo = reader.result
                    // imprime em console o que leu:
                    console.log(conteudoArquivo);

                    // esse conteudo executa como JS, lê não como txt, mas como JS (eval):
                    // os valores das variáveis globais ok1, ok2, ok3 são atualizados! 
                    let transformaEmJS = eval(conteudoArquivo)
                };

                // em caso de erro:
                reader.onerror = function () {
                    console.log(reader.error);
                };

                // FONTE: 
                // https://javascript.info/file
                // https://developer.mozilla.org/en-US/docs/Web/API/Blob
                // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
                // https://www.w3schools.com/jsref/dom_obj_fileupload.asp

            })
//       </script>
