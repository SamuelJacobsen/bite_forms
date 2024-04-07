# Formulário de Perguntas com Firebase

Este é um aplicativo de formulário de perguntas onde os usuários podem criar, votar, visualizar e responder perguntas. O aplicativo é construído utilizando Node.js, Express e Firebase.

## Funcionalidades

- **Criar Pergunta**: Os usuários podem criar uma nova pergunta.
- **Votar em Pergunta**: Os usuários podem votar em uma pergunta específica.
- **Detalhes da Pergunta**: Os usuários podem obter detalhes de uma pergunta específica.
- **Listar Perguntas**: Os usuários podem listar todas as perguntas disponíveis.
- **Alterar Pergunta**: Os usuários podem alterar os dados de uma pergunta específica.
- **Remover Pergunta**: Os usuários podem remover uma pergunta específica.

## Tecnologias Utilizadas

- Node.js
- Express
- Firebase

## Rotas

- **POST /create**: Rota para criar uma nova pergunta.
- **POST /vote/:questionId**: Rota para votar em uma pergunta específica.
- **GET /:questionId**: Rota para obter detalhes de uma pergunta específica.
- **GET /**: Rota para listar todas as perguntas disponíveis.
- **PUT /:questionId**: Rota para alterar dados de uma pergunta específica.
- **DELETE /:questionId**: Rota para remover uma pergunta específica.

## Pré-requisitos

- Node.js instalado
- Firebase configurado e conectado ao projeto

## Instalação

1. Clone este repositório:
   ```
   git clone https://github.com/seu_usuario/nome-do-repositorio.git
   ```

2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o servidor:
   ```
   npm start
   ```