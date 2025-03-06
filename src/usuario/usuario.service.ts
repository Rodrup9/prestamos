import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { In, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { RolService } from '../rol/rol.service';
import { Rol } from 'src/rol/entities/rol.entity';
dotenv.config();

@Injectable()
export class UsuarioService {

constructor(
  @Inject('USUARIO_REPOSITORY')
  private usuarioRepository: Repository<Usuario>,
  @Inject(forwardRef(() => RolService))
  private rolService: RolService,
) {}

async create(createUsuarioDto: CreateUsuarioDto, idUsuarioCreador: number) {
  const salt = await bcrypt.genSalt(+process.env.SALT);
  const hashedPassword = await bcrypt.hash(createUsuarioDto.clave, salt);

  let usuarioCreador: Usuario | null = null;

  if (idUsuarioCreador) {
    usuarioCreador = await this.findOne(idUsuarioCreador);
  }

  let roles: Rol[] = [];
  if (createUsuarioDto.roles && createUsuarioDto.roles.length > 0) {
    roles = await this.rolService.findByArrayIds(createUsuarioDto.roles);
  } 

  const nuevoUsuario = this.usuarioRepository.create({
    ...createUsuarioDto,
    clave: hashedPassword,
    usuario_creador: usuarioCreador,
    roles
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

  if (!usuario)
    throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
  
  return usuario;
}

update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  return `This action updates a #${id} usuario`;
}

remove(id: number) {
  return `This action removes a #${id} usuario`;
}
}
