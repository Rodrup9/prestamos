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
  const salt: string = await bcrypt.genSalt(+process.env.SALT);
  const hashedPassword: string = await bcrypt.hash(createUsuarioDto.clave, salt);

  let usuarioCreador: Usuario | null = null;

  if (idUsuarioCreador) {
    usuarioCreador = await this.findOne(idUsuarioCreador);
  }

  let roles: Rol[] = [];
  if (createUsuarioDto.roles && createUsuarioDto.roles.length > 0) {
    roles = await this.rolService.findByArrayIds(createUsuarioDto.roles);
  }

  if (createUsuarioDto?.correo) {
    const usuarioExistente: Usuario = await this.findByEmail(createUsuarioDto.correo);
    if (usuarioExistente)
      throw new NotFoundException('El correo ya existe');
  }

  const nuevoUsuario: Usuario = this.usuarioRepository.create({
    ...createUsuarioDto,
    clave: hashedPassword,
    // usuario_creador: usuarioCreador,
    roles
  });
  return this.usuarioRepository.save(nuevoUsuario);
}

async findByEmail(email: string): Promise<Usuario> {
  const usuario: Usuario | null = await this.usuarioRepository.findOne({
    where: { correo: email },
  });

  if (!usuario)
    throw new NotFoundException(`Usuario con email ${email} no encontrado`);

  return usuario;
}

async findAll(): Promise<Usuario[]> {
  return this.usuarioRepository.find({
    relations: {
      roles: true,
    }
  });
}

async findOne(id: number): Promise<Usuario> {  
  const usuario: Usuario | null = await this.usuarioRepository.findOne({
    where: { id },
    relations: {
      roles: true
    }
  });  

  if (!usuario)
    throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
  
  return usuario;
}

async update(id: number, updateUsuarioDto: UpdateUsuarioDto, idUsuario: number): Promise<Usuario> {
  const usuario: Usuario = await this.findOne(id);

  if (updateUsuarioDto?.clave) {
    const salt: string = await bcrypt.genSalt(+process.env.SALT);
    const hashedPassword: string = await bcrypt.hash(updateUsuarioDto.clave, salt);
    updateUsuarioDto.clave = hashedPassword;
  }

  let roles: Rol[] | null = usuario?.roles;
  if (updateUsuarioDto?.roles)
    roles = await this.rolService.findByArrayIds(updateUsuarioDto.roles);

  if (updateUsuarioDto?.correo) {
    const usuarioExistente: Usuario = await this.findByEmail(updateUsuarioDto.correo);
    if (usuarioExistente)
      if (usuarioExistente.id !== id)
        throw new NotFoundException('El correo ya existe');
  }
  
  const usuarioUpdate: Usuario = {
    ...usuario,
    ...updateUsuarioDto,
    roles
  }

  if (usuarioUpdate?.nombre || usuarioUpdate?.clave || updateUsuarioDto?.correo)
    throw new NotFoundException('Nombre, clave y correo no pueden estar vacios');
  
  return this.usuarioRepository.save(usuarioUpdate);
    
}

remove(id: number) {
  return `This action removes a #${id} usuario`;
}
}
