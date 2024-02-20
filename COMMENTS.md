1. Decisão da arquitetura utilizada

A descição pela arquitetura no backend se dá pela facilidade na conexão com o banco de dados, requisição ao banco e muitas outras funcionalidades que é nos dada. O TypeORM é um ORM incrível e muito bem estruturado, facilitando nossa vida na criação das tabelas no banco, inserção de valores, obter os dados, entre muitos outros.

Também utilizei o SweetAlert para auxiliar na criação de algumas modals e notifications que eu acho agradável e bem intuitivo. É um ótimo pacote para se utilizar em diversas situações.

2. Lista de bibliotecas de terceiros utilizadas

Como mencionado no README.md, a biblioteca de terceiros utilizadas foram: Vue Router, SweetAlert, Axios, Express, Jest, JWT e TypeORM (Tirando as obrigatórias, que são: Node.js, MySQL, Vue.js, Vuetify).

3. O que você melhoraria se tivesse mais tempo

Com certeza melhoria a inicialização do projeto. Minha ideia era deixar o serviço tudo em containers, com configuração toda completa e deixando a inicialização da aplicação muito mais fácil. Só que encontrei problemas de última hora e não pude prosseguir com essa ideia.

Deixando em containers Docker, eu poderia escalar o serviço de backend utilizando o PM2. Caso tenha necessidade pois o PM2 é uma boa biblioteca para inicialização de serviços tanto no modo normal como no modo cluster (que é o modo no qual é iniciado mais de uma instância, e ele mesmo faz o gerenciamento de rotas, redirecionando a requisição para os serviços inicializados, dependendo da quantidade de instância).

4. Quais requisitos obrigatórios que não foram entregues

Acredito eu que somente a documentação da API. Queria ter feito em Swagger, mas como o tempo estava curto, não dei continuidade com a documentação e mesmo não sendo obrigatório, fiz os testes das rotas com o Jest. E também tendo a dificuldade de não saber Vue.js, eu fui atrás para que eu pudesse entregar um projeto adequado e ao que estava proposto no desafio. Tive algumas dificuldades de principiantes, mas com algumas pesquisas no Google, consegui além de sanar essas dificuldades, tive um rápido entendimento sobre o Vue.js para que eu pudesse prosseguir sozinho sem o auxilio do Google. 

Foi um bom desafio para testar minha capacidade de aprendizado em um curto espaço de tempo. E, além disso, também tive uns contra-tempos nesse final de semana que passou, e só consegui iniciar a criação do projeto no Domingo pela manhã. Então basicamente tive menos de dois dias para que o projeto ficasse pronto à tempo.
