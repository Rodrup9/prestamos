import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
      // usuario_creador: usuarioCreador,
      localidad,
    });

    return this.direccionRepository.save(nuevaDireccion);
  }

  findAll() {
    return this.direccionRepository.find();
  }

  async findOne(id: number) {
    return await this.direccionRepository.findOne({
      where: { id },
      relations: {
        localidad: true,
      }
    });
  }

  async updateCascade(direccionOld: Direccion, updateDireccionDto: UpdateDireccionDto): Promise<Direccion> {
    
    const direccion: Direccion = await this.findOne(direccionOld.id);

    let localidad: Localidad = direccion.localidad;
    if (updateDireccionDto?.localidad)   
        localidad = await this.localidadService.findOne(updateDireccionDto.localidad);

    const direccionUpdate: Direccion = {
      ...direccion,
      ...updateDireccionDto,
      localidad
    };

    if (!direccionUpdate?.localidad || !direccionUpdate?.calle || !direccionUpdate?.codigo_postal || !direccionUpdate?.numero_exterior )
      throw new NotFoundException('Faltan datos en Direccion, localidad, calle, codigo postal, numero_exterior');

    return await this.direccionRepository.save(direccionUpdate);
  }

  remove(id: number) {
    return `This action removes a #${id} direccion`;
  }
}
