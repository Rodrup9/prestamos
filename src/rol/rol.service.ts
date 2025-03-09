import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { In, Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { PermisoService } from '../permiso/permiso.service';
import { Permiso } from 'src/permiso/entities/permiso.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class RolService {

  constructor(
    @Inject('ROL_REPOSITORY')
    private rolRepository: Repository<Rol>,
    @Inject(forwardRef(() => UsuarioService))
    private usuarioService: UsuarioService,
    private permisoService: PermisoService,
  ) {}

  async create(createRolDto: CreateRolDto, idUsuarioCreador: number): Promise<Rol> {

    const usuarioCreador: Usuario = await this.usuarioService.findOne(idUsuarioCreador);

    let permisos: Permiso[] = [];

    if (createRolDto.permisos && createRolDto.permisos.length > 0) {
      permisos = await this.permisoService.findByArrayIds(createRolDto.permisos);
    } 

    const nuevoRol: Rol = this.rolRepository.create({
      ...createRolDto,
      // usuario_creador: usuarioCreador,
      permisos,
    });

    return this.rolRepository.save(nuevoRol);
  }

  findAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }

  async findOne(id: number): Promise<Rol> {
    const rol: Rol | null = await this.rolRepository.findOne({
      where: { id }
    });

    if (!rol)
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);

    return rol;
  }

  async findByArrayIds(ids: number[]): Promise<Rol[]> {
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
