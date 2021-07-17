#!/bin/bash
# Script para automatizar uploads de diretório de audios
# Autor: Hélio Giroto  

## Enquanto wc -l .gitignore > 0 realiza o bloco:
while [[ $(wc -l .gitignore | cut -d' ' -f1) -gt 0 ]]
do

	## Apaga as 5 primeiras linhas:
	# seq 10 | sed '1,5d'
	# sed -i '1,5d' .gitignore
	sed -i '1d' .gitignore

	## faz git completo *
	git add .; git commit -m "Subindo automaticamente: $(date)"; git push

done

# *OBS.: impedir que o git (push) peça novamente a senha no momento de automatizar:
# (Em caso de erro: É preciso certificar-se que foram configurados nome e email de usuário do git).
# Digite:

#	$ git config --global user.name "John Doe"
#	$ git config --global user.email johndoe@example.com

# (Outro erro: é possivel que se tenha que mudar a senha no próprio site do Github se persista algum erro de # autenticação. Razões desconhecidas).

# O script install.sh fará que se faça 'git push' automaticamente sem operação manual. 

# Mas para isso é preciso deixar vazios os arquivos:
#	 ~/.git-credentials 
#	 ~/.gitconfig 

# ou pelo menos comentar as seguintes linhas:

#	 echo "" > ~/.git-credentials

#	 sed 's/\[credential\]/#&/; s/        helper/#&/' ~/.gitconfig


