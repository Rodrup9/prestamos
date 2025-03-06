import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { In, Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { PermisoService } from '../permiso/permiso.service';
import { Permiso } from 'src/permiso/entities/permiso.entity';

@Injectable()
export class RolService {

  constructor(
    @Inject('ROL_REPOSITORY')
    private rolRepository: Repository<Rol>,
    @Inject(forwardRef(() => UsuarioService))
    private usuarioService: UsuarioService,
    private permisoService: PermisoService,
  ) {}

  async create(createRolDto: CreateRolDto, idUsuarioCreador: number) {

    const usuarioCreador = await this.usuarioService.findOne(idUsuarioCreador);

    let permisos: Permiso[] = [];

    if (createRolDto.permisos && createRolDto.permisos.length > 0) {
      permisos = await this.permisoService.findByArrayIds(createRolDto.permisos);
    } 

    const nuevoRol = this.rolRepository.create({
      ...createRolDto,
      usuario_creador: usuarioCreador,
      permisos,
    });

    return this.rolRepository.save(nuevoRol);
  }

  findAll() {
    return this.rolRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} rol`;
  }

  async findByArrayIds(ids: number[]) {
    return await this.rolRepository.findBy({ 
      id: In(ids)
    });
  }

  update(id: number, updateRolDto: UpdateRolDto) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
