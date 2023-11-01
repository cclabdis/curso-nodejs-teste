import request from 'supertest';
import {
    describe, expect, it, jest,
} from '@jest/globals';
import app from '../../app.js';

let server;
beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

describe('post /login', () => {
    it('O login deve possuir um email e senha para se autenticar', async () => {
        const loginMock = {
            email: `salsicha@test.com`
        }
        await request(server)
            .post('/login')
            .send(loginMock)
            .expect(500)
            .expect('"A senha de usuario é obrigatório."')
    });
    it('O login deve validar se o usuário está cadastrado', async () => {
        const loginMock = {
            nome: "blend",
            email: "salsicha@test.com",
            senha: 12345
        }

        await request(server)
            .post('/login')
            .send(loginMock)
            .expect(500)
    });
    it('O login deve validar e-mail e senha incorreto', async () => {
        const loginMock = {
            email: `salsicha@test.com`
        }
        await request(server)
            .post('/login')
            .set('Accept', 'application/json')
            .send(loginMock)
            .expect(500)
            .expect('"A senha de usuario é obrigatório."');
    });

    it('O login deve validar se está sendo retornado um accessToken.', async () => {
        const loginMock = {
            email: 'raphael@teste.com.br',
            senha: '123456',
        };
        const resposta = await request(server)
            .post('/login')
            .set('Accept', 'application/json')
            .send(loginMock)
            .expect(201);

        expect(resposta.body.message).toBe('Usuario conectado');
        expect(resposta.body).toHaveProperty('accessToken');
    });
});


