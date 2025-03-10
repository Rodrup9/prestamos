import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { UpdateAutenticacionDto } from './dto/update-autenticacion.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class AutenticacionService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(loginUsuarioDto: LoginUsuarioDto) {
    const usuario: Usuario = await this.usuarioService.findByEmail(loginUsuarioDto.correo);
  
    if (!usuario) {
      throw new NotFoundException(`Usuario con correo ${loginUsuarioDto.correo} no encontrado`);
    }
  
    const isPasswordValid = await bcrypt.compare(loginUsuarioDto.clave, usuario.clave);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  
    const payload = { id: usuario.id, correo: usuario.correo };
    const token = this.jwtService.sign(payload);

    return { access_token: token, usuario: usuario.nombre };  
  }

  
}
