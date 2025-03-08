import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { In, Repository } from 'typeorm';
import { Permiso } from './entities/permiso.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class PermisoService {

  constructor(
    @Inject('PERMISO_REPOSITORY')
    private permisoRepository: Repository<Permiso>,
    @Inject(forwardRef(() => UsuarioService))
    private usuarioService: UsuarioService,
  ) {}

  async create(createPermisoDto: CreatePermisoDto, idUsuarioCreador: number) {

    const usuarioCreador = await this.usuarioService.findOne(idUsuarioCreador);

    const nuevoPermiso = this.permisoRepository.create({
      ...createPermisoDto,
      // usuario_creador: usuarioCreador,
    });

    return this.permisoRepository.save(nuevoPermiso);
  }

  async findByArrayIds(ids: number[]) {
    return await this.permisoRepository.findBy({ 
      id: In(ids)
    });
  }

  findAll() {
    return this.permisoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} permiso`;
  }

  update(id: number, updatePermisoDto: UpdatePermisoDto) {
    return `This action updates a #${id} permiso`;
  }

  remove(id: number) {
    return `This action removes a #${id} permiso`;
  }
}
