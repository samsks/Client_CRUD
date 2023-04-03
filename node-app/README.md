# README

## Índice

- [README](#readme)
  - [Índice](#índice)
  - [Introdução](#introdução)
  - [Pré-requisitos](#pré-requisitos)
  - [Instruções](#instruções)

## Introdução

Este é um guia simples para executar um projeto em Node.js, que usa o framework Express, o ORM TypeORM, e um banco de dados que precisa de migrações.

## Pré-requisitos

Para seguir este guia, você precisará ter o Node.js instalado em sua máquina. Você pode baixar o Node.js no site oficial [node.org](https://nodejs.org/en).

## Instruções

1. Clone este repositório e navegue para a pasta node-app do projeto.
   Obs: Este repositório é compartilhado. Verifique se está na pasta node-app.

2. Instale as dependências do projeto usando o seguinte comando no terminal:

```
npm install
```

3. Crie um arquivo .env na pasta node-app do projeto e configure as variáveis de ambiente necessárias para o banco de dados conforme exemplos no arquivo .env.example. Por exemplo:

```
DATABASE_URL=postgres://user:password@localhost:5432/database
```
Obs: Existe mais de uma opção para banco de dados, portanto acesse o arquivo data-source localizado na pasta src/ para auxiliar na configuração do arquivo .env. 

4. Execute as migrações do banco de dados com o seguinte comando no terminal:

```
npm run typeorm migration:run -- -d ./src/data-source
```

Este comando executará as migrações necessárias para configurar o banco de dados do projeto.

5. Agora você está pronto para executar o projeto! Use o seguinte comando para iniciar o servidor:

```
npm run dev
```


Este comando iniciará o servidor da aplicação. Acesse a aplicação no navegador da web, digitando `http://localhost:3001/api/v1` na barra de endereço.

6. Quando terminar de usar o projeto, você pode parar o servidor pressionando Ctrl+C no terminal.

7. Para remover as tabelas do banco de dados, use o seguinte comando no terminal:

```
npm run typeorm migration:revert -- -d ./src/data-source
```

Esse comando executa o método down da última migração executada.


