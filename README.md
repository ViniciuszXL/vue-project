## Vue-Project
# Desafio Edtech

Olá! Bem-vindos. Esse é o projeto feito através do desafio me repassado. É um projeto simples que consiste em três telas mais ou menos. No projeto, é nos dado o desafio de criar um painel simples, para visualização de alunos, edição, remoção e cadastramento.

# Como inicializar o projeto

Versão do Node usado: `v17.9.1`
Versão do MariaDB usado: `v10.11.2`

OBS: É necessário que você tenha um banco de dados em sua máquina antes de iniciar o projeto de `backend`. Há algumas configurações que você necessita fazer no projeto `backend` em `/common/environment.js`.

As configurações obrigatórias a serem modificadas são:
  * MARIA.HOST
  * MARIA.PORT
  * MARIA.USERNAME
  * MARIA.PASSWORD
  * MARIA.DATABASE (Necessário criar a database para que funcione a conexão e a criação das tabelas)

Configurações opcionais:
  * SERVER.PORT
  * SERVER.NAME
  * SERVER.VERSION
  * SERVER.URL_BASE
  * SERVER.DEFAULT_ADMIN

Primeiro passo:
  - Vá até a pasta `frontend`, e rode o comando `npm install` e `yarn dev` para que a aplicação seja inicializada.

Segundo passo:
  - Vá até a pasta `backend`, e rode o comando `npm install` e `npm start` para que a aplicação backend seja inicializada.

Terceiro passo:
  - A aplicação estará disponível na porta `3000`.

Acesso (Com base na configuração padrão):
  - teste@teste.com
  - 123

# Linguagens e frameworks utilizados

- Node.js
- MySQL
- Vue.js
- Vuetify
- Vue Router
- Sweetalert
- Axios
- Express
- Jest
- JWT
- TypeORM
