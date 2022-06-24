# challengeRDStation desenvolvido em JavaScript.

# Abra o arquivo Javascript
## Como rodar os testes

No terminal, execute os comandos:

```bash
cd javascript
yarn
yarn test
```

Ou usando o NPM:

```bash
cd javascript
npm install
npm test
```


Desafio técnico realizado em dois dias corridos, concorridos.
Vaga: Mulher Engenheira de Software - Suporte N3 (Hydra).
Empresa: RD Station.
Local: Florianópolis - Brasil.
Modelo trabalho: Remoto, opcional Híbrido.

====================

# RD Challenge
## Nossas expectativas
A equipe de engenharia da RDStation tem alguns princípios onde baseamos nosso trabalho diário. Um deles é: Projete seu código para ser mais fácil de entender, não mais fácil de escrever. 

Portanto, para nós é mais importante um código de fácil leitura do que um que utilize recursos arquitetados complexos e desnecessários.
O que gostariamos de ver:

- O código deve ser fácil de ler. [Clean Code](https://medium.com/rd-shipit/clean-code-23580b4e556c) pode te ajudar
- Notas gerais e informações sobre a versão da linguagem e outras informações importantes para executar seu código.
- Código que se preocupa com a performance (Complexidade de Algoritmo)
- O seu código deve cobrir todo os casos de usos presentes no README, mesmo que não haja um teste implementado para tal.
- Você deve enviar o código-fonte da solução para nós como um arquivo contendo apenas a solução de código ou
 pode fazer o upload da solução para repositórios públicos (GitHub, BitBucket, etc) desde que nos envie o último commit
- Testes. Você pode adicionar novos testes, mas sem alterar o pacote original

## O Desafio - CustomerSuccess Balancing

Este desafio consiste em um sistema de balanceamento entre clientes e Customer Success (CSs). Os CSs são os Gerentes de Sucesso, são responsáveis pelo acompanhamento estratégico dos clientes.

Dependendo do tamanho do cliente - aqui nos referimos ao tamanho da empresa - nós temos que colocar CSs mais experientes para atendê-los.

Um CS pode atender mais de um cliente e além disso os CSs também podem sair de férias, tirar folga, ou mesmo ficarem doentes. É preciso levar esses critérios em conta na hora de rodar a distribuição.

Dado este cenário, o sistema distribui os clientes com os CSs de capacidade de atendimento mais próxima (maior) ao tamanho do cliente.

