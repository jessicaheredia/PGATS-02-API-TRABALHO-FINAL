const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../../app');

const cadastroLivros = require('../fixtures/requisicoes/adicionarLivro/postCadastrarLivros.json');
const libraryService = require('../../../services/libraryService');

describe('Library Controller', () => {
    describe('POST /library/addLibrary', () => {
        let token;

        beforeEach(async () => {
            const postLogin = require('../fixtures/requisicoes/login/postLogin.json');
            const respostaLogin = await request(app)
                .post('/users/login')
                .send(postLogin);

            token = respostaLogin.body.token;
            expect(token).to.be.a('string');
        });

        it('Deve permitir cadastro de livro com token', async () => {
            const resposta = await request(app)
                .post('/library/addLibrary')
                .set('Authorization', `Bearer ${token}`)
                .send(cadastroLivros[0]);

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('title', cadastroLivros[0].title);
            expect(resposta.body).to.have.property('year', cadastroLivros[0].year);
        });

        it('Usando Mocks: Se eu cadastro um livro com token válido, recebo 201', async () => {
        sinon.stub(libraryService, 'addLibrary').resolves({
            title: cadastroLivros[0].title,
            year: cadastroLivros[0].year
        });

        const resposta = await request(app)
            .post('/library/addLibrary')
            .set('Authorization', `Bearer ${token}`)
            .send(cadastroLivros);

        expect(resposta.status).to.equal(201);
        expect(resposta.body).to.have.property('title', cadastroLivros[0].title);
        expect(resposta.body).to.have.property('year', cadastroLivros[0].year);
    });

        it('Não deve permitir cadastro de livro sem token', async () => {
            const resposta = await request(app)
                .post('/library/addLibrary')
                .send(cadastroLivros[0]);

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error');
        });

        it('Não deve permitir cadastro de livro duplicado', async () => {
            await request(app)
                .post('/library/addLibrary')
                .set('Authorization', `Bearer ${token}`)
                .send(cadastroLivros[0]);

            const respostaDuplicado = await request(app)
                .post('/library/addLibrary')
                .set('Authorization', `Bearer ${token}`)
                .send(cadastroLivros[0]);

            expect(respostaDuplicado.status).to.equal(400);
            expect(respostaDuplicado.body).to.have.property('error', 'Titulo duplicado: Biblioteca ja possui esse titulo cadastrado');
        });

        afterEach(() => {
            sinon.restore();
        });
    });

    describe('GET /library/listLibraries', () => {
    });
});