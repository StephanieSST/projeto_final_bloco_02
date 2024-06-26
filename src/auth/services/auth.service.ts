import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "src/usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";
import { Login } from "../entities/login.entity";

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt

    ) { }
    async validateUser(username: string, password: string): Promise<any> {

        const buscaUsuario = await this.usuarioService.findByUsuario(username);

        if (!buscaUsuario)
            throw new HttpException('Usuário não Encontrado', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenhas(buscaUsuario.senha, password)
        if (buscaUsuario && matchPassword) {
            const { senha, ...resposta } = buscaUsuario

            return resposta
        }
        return null
    }
    async login(Login: Login){
        const payload = {
            sub: Login.usuario
        }
        const buscaUsuario = await this.usuarioService.findByUsuario(Login.usuario);

        if (!buscaUsuario)
            throw new HttpException('Usuário não Encontrado', HttpStatus.NOT_FOUND)

        return{
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: buscaUsuario.usuario,
            senha: '',
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }
}