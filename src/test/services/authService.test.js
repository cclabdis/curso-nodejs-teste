import { describe, jest } from "@jest/globals";
import AuthService from "../../services/authService.js";
import Usuario from "../../models/usuario.js";



const authService = new AuthService();

describe(`Testando a authService.cadastrarUsuario`, () => {
    it(`O usuario deve possuir um nome, email e senha`, async () => {

        //arrage
        const usuarioMock = {
            nome: "Levi",
            email: "levi@mail.com.br"
        }
        //act
        const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);
        //assert
        await expect(usuarioSalvo).rejects.toThrowError('Senha obrigatória')

    }),
        it(`A senha do usuario precisa ser criptografa quando for salva no banco de dados`, async () => {
            //arrage
            const usuarioMock = {
                nome: "Levi",
                email: "levi2000@mail.com.br",
                senha: "12345"
            }
            //act
            const usuarioSalvo = await authService.cadastrarUsuario(usuarioMock);

            //assert

            //verificado se a senha salvo é diferente da que foi inserida
            expect(usuarioSalvo.content.senha).not.toEqual('12345');
            // Verifique se a função retorna a mensagem esperada
            expect(usuarioSalvo.message).toBe('usuario criado');
            // Verifique se a função retorna os dados do usuário
            expect(usuarioSalvo.content.nome).toBe('Levi');
            expect(usuarioSalvo.content.email).toBe(usuarioMock.email);

        }),
        it(`Nao pode ser cadastrado um usuario com email duplicado`, async () => {
            const usuarioMock = {
                nome: "Levi",
                email: "levi10000@mail.com.br",
                senha: "12345"
            }

            jest.spyOn(Usuario, 'emailJaExiste').mockResolvedValue(true);

            try {
                await authService.cadastrarUsuario(usuarioMock);
            } catch (err) {
                expect(err.message).toBe('E-mail já cadastrado');
            }

        }),
        it(`Ao cadastrar um usuario deve ser retornado uma mensagem informando que o usuario foi cadastrado`, async () => {
            const usuarioMock = {
                nome: "Levi",
                email: "levite2000@mail.com.br",
                senha: "12345"
            }
            const usuarioSalvo = await authService.cadastrarUsuario(usuarioMock);
            expect(usuarioSalvo.message).toBe('usuario criado');
           

        }),
        it(`Ao cadastrar um usuario validar retorno do usuario`, async () => {
             const usuarioMock = {
                nome: "Levi",
                email: "leviteeeee2000@mail.com.br",
                senha: "12345"
            }
            const usuarioSalvo = await authService.cadastrarUsuario(usuarioMock);
            expect(usuarioSalvo.content.nome).toBe(usuarioMock.nome);
            expect(usuarioSalvo.content.email).toBe(usuarioMock.email);

        })

})