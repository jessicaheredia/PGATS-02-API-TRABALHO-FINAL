const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

const cadastroLivros = require('../fixtures/requisicoes/adicionarLivro/cadastrarLivros.json');
const loginUser = require('../fixtures/requisicoes/login/loginUser.json');

describe('GraphQL - Teste de cadastro na Biblioteca API', () => {

  before(async () => {
    const respostaLogin = await request(process.env.BASE_URL_GRAPHQL)
      .post('')
      .send(loginUser);

    token = respostaLogin.body.data.login;
  });

  beforeEach(async () => {
    const mutationReset = `
      mutation ResetLibraries {
        resetLibraries
      }
    `;
    const respostaReset = await request(process.env.BASE_URL_GRAPHQL)
      .post('')
      .send({
        query: mutationReset
      });
  
  });
  
  it('Deve permitir cadastro de livro com token válido', async () => {
    const resposta = await request(process.env.BASE_URL_GRAPHQL)
      .post('')
      .send({
        query: cadastroLivros[0].query,
        variables: {
            title: cadastroLivros[0].variables.title,
            year: cadastroLivros[0].variables.year,
            token
        }
      });
    expect(resposta.body.data.addLibrary).to.have.property('title', cadastroLivros[0].variables.title);
    expect(resposta.body.data.addLibrary).to.have.property('year', cadastroLivros[0].variables.year);
  });

  it('Não deve permitir cadastrar livro sem token', async () => {
    const resposta = await request(process.env.BASE_URL_GRAPHQL)
      .post('')
      .send({
        query: cadastroLivros[1].query,
        variables: {
          title: cadastroLivros[1].variables.title,
          year: cadastroLivros[1].variables.year,
          token: ""
        }
    });

    expect(resposta.body.data.addLibrary).to.be.null;
    expect(resposta.body.errors).to.exist;
  });
});