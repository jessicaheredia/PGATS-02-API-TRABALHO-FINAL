const request = require('supertest');
const { expect } = require('chai');

require('dotenv').config();
  
const cadastroLivros = require('../fixtures/requisicoes/adicionarLivro/postCadastrarLivros.json');

describe('Library External', () => {
    describe('POST /library/addLibrary', () => {
        
      before(async () => {
            const postLogin = require('../fixtures/requisicoes/login/postLogin.json');
            const respostaLogin = await request(process.env.BASE_URL_REST)
                .post('/users/login')
                .send(postLogin);

            token = respostaLogin.body.token;
      });

      beforeEach(async () => {
        await request(process.env.BASE_URL_REST)
           .post('/library/resetLibraries')
           .send();
  });

      it('Não deve permitir cadastro de livro sem token', async () => {
        const respostaLogin = await request(process.env.BASE_URL_REST)
              .post('/library/addLibrary')
              .send(cadastroLivros);

        expect(respostaLogin.status).to.equal(401);
        expect(respostaLogin.body).to.have.property('error');

   });

       it('Não deve permitir cadastro de livro duplicado', async () => {
            await request(process.env.BASE_URL_REST)
                .post('/library/addLibrary')
                .set('Authorization', `Bearer ${token}`)
                .send(cadastroLivros[1]);

            const respostaDuplicado = await request(process.env.BASE_URL_REST)
                .post('/library/addLibrary')
                .set('Authorization', `Bearer ${token}`)
                .send(cadastroLivros[1]);

        expect(respostaDuplicado.status).to.equal(400);
        expect(respostaDuplicado.body).to.have.property('error', 'Titulo duplicado: Biblioteca ja possui esse titulo cadastrado');
      });    
  });
});