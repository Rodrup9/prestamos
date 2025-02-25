import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { In, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { Rol } from 'src/rol/entities/rol.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UsuarioService {

constructor(
  @Inject('USUARIO_REPOSITORY')
  private usuarioRepository: Repository<Usuario>,

  @Inject('ROL_REPOSITORY')
  private rolRepository: Repository<Rol>,
) {}

async create(createUsuarioDto: CreateUsuarioDto) {
  const salt = await bcrypt.genSalt(+process.env.SALT);
  const hashedPassword = await bcrypt.hash(createUsuarioDto.clave, salt);

  let usuarioCreador: Usuario | null = null;

  if (createUsuarioDto.usuario_creador) {
    usuarioCreador = await this.findOne(createUsuarioDto.usuario_creador);

    if (!usuarioCreador) {
      throw new NotFoundException(`Usuario creador con ID ${createUsuarioDto.usuario_creador} no encontrado`);
    }
  }

  let roles: Rol[] = [];
  if (createUsuarioDto.roles && createUsuarioDto.roles.length > 0) {
    roles = await this.rolRepository.findBy({
      id: In(createUsuarioDto.roles)
    });
  } 

  const nuevoUsuario = this.usuarioRepository.create({
    ...createUsuarioDto,
    clave: hashedPassword,
    usuario_creador: usuarioCreador,
    roles,  // ✅ Ahora pasamos un array de `Rol`, no `number[]`
  });
  return this.usuarioRepository.save(nuevoUsuario);
}

async findByEmail(email: string): Promise<Usuario | null> {
  return await this.usuarioRepository.findOne({
    where: { correo: email },
  });
}

async findAll() {
  return this.usuarioRepository.find();
}

async findOne(id: number) {
  const usuario = await this.usuarioRepository.findOne({
    where: { id },
  });  
  return usuario;
}

update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  return `This action updates a #${id} usuario`;
}

remove(id: number) {
  return `This action removes a #${id} usuario`;
}
}
