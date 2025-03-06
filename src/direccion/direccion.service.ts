import { Inject, Injectable } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { Direccion } from './entities/direccion.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LocalidadService } from 'src/localidad/localidad.service';
import { Localidad } from '../localidad/entities/localidad.entity';

@Injectable()
export class DireccionService {

  constructor(
    @Inject('DIRECCION_REPOSITORY')
    private direccionRepository: Repository<Direccion>,
    private usuarioService: UsuarioService,
    private localidadService: LocalidadService,
  ) {}

  async createCascade(createDireccionDto: CreateDireccionDto, usuarioCreador: any) {
    const localidad = await this.localidadService.findOne(createDireccionDto.localidad);

    const nuevaDireccion = this.direccionRepository.create({
      ...createDireccionDto,
      usuario_creador: usuarioCreador,
      localidad,
    });

    return this.direccionRepository.save(nuevaDireccion);
  }

  findAll() {
    return this.direccionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} direccion`;
  }

  async updateCascade(direccionOld: Direccion, updateDireccionDto: UpdateDireccionDto) {
    const localidad = await this.localidadService.findOne(updateDireccionDto.localidad);
    
    const direccionActualizada = await this.direccionRepository.save({
      ...direccionOld,
      ...updateDireccionDto,
      localidad
    });

    return direccionActualizada;
  }

  remove(id: number) {
    return `This action removes a #${id} direccion`;
  }
}
