# Biblioteca API - Trabalho Final

## Sobre o Projeto
API para gerenciamento de biblioteca, com suporte a REST e GraphQL. Permite cadastro de usuários, login com autenticação JWT, cadastro de livros e consulta de livros cadastrados. Para cadastrar livros, é necessário estar autenticado.

## Endpoints REST

### Usuários
- **POST /users/register**
  - Cadastra novo usuário
  - Body: `{ "name": "string", "password": "string" }`

- **POST /users/login**
  - Realiza login e retorna JWT
  - Body: `{ "name": "string", "password": "string" }`

- **GET /users/list**
  - Lista todos os usuários cadastrados

### Biblioteca
- **POST /library/addLibrary**
  - Cadastra novo livro (JWT obrigatório)
  - Body: `{ "title": "string", "year": "integer" }`

- **GET /library/listLibraries**
  - Lista todos os livros cadastrados

---

## GraphQL

### Types
```graphql
type User { name: String! }
type Library { title: String!, year: Int! }
```

### Queries
- **libraries:** `[Library]` — Lista todos os livros

### Mutations
- **register(name: String!, password: String!): User** — Cadastra usuário
- **login(name: String!, password: String!): String** — Realiza login e retorna JWT
- **addLibrary(title: String!, year: Int!, token: String!): Library** — Cadastra livro (JWT obrigatório)
- **resetLibraries: Boolean** — Limpa todos os livros cadastrados (apenas para testes)

---

## Regras de Negócio
- Usuário deve ser cadastrado com nome único e senha obrigatória.
- Login retorna JWT válido por 1 hora.
- Para cadastrar livro, é obrigatório informar título, ano e token JWT válido.
- Não é permitido cadastrar livros com títulos duplicados.
- Listagem de livros retorna todos os livros cadastrados.
- O reset de biblioteca apaga todos os livros (usado em testes).

---

## Scripts de Execução
- **REST:** `npm start` (porta 3000)
- **Swagger:** http://localhost:3000/api-docs
- **GraphQL:** `npm run start-graphql` (porta 4000)
- **GraphQL Playground:** http://localhost:4000/graphql

## Testes
- **Todos os testes:** `npm test`
- **Testes REST Controller:** `npm run test-rest-controller`
- **Testes REST Externos:** `npm run test-rest-external`
- **Testes GraphQL Externos:** `npm run test-graphql-external`

## Como rodar no GitHub Actions
O workflow `.github/workflows/node-ci.yml` já está configurado para rodar todos os testes automaticamente em cada push ou pull request.

## Variáveis de Ambiente
Crie um arquivo `.env` com:
```
BASE_URL_REST=http://localhost:3000
BASE_URL_GRAPHQL=http://localhost:4000
```
Ou configure via secrets no GitHub Actions.

## Dependências principais
- express
- apollo-server-express
- graphql
- jsonwebtoken
- mocha, chai, supertest, sinon

## Estrutura de Pastas
- `/controllers` - lógica REST
- `/graphql` - lógica GraphQL
- `/models` - modelos de dados
- `/services` - regras de negócio
- `/test` - testes automatizados

