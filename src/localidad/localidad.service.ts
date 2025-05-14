import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
import { Repository } from 'typeorm';
import { Localidad } from './entities/localidad.entity';
import { MunicipioService } from 'src/municipio/municipio.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { formatFirstUpperCaseEvery } from 'src/helpers/formatFirstUpperCaseEvery';

@Injectable()
export class LocalidadService {

  constructor(
    @Inject('LOCALIDAD_REPOSITORY')
    private localidadRepository: Repository<Localidad>,
    private usuarioService: UsuarioService,
    private municipioService: MunicipioService
  ) {}

  async create(createLocalidadDto: CreateLocalidadDto, idUsuarioCreador: number) {

    createLocalidadDto.nombre = formatFirstUpperCaseEvery(createLocalidadDto.nombre);

    const usuarioCreador = await this.usuarioService.findOne(idUsuarioCreador);

    const municipio = await this.municipioService.findOne(createLocalidadDto.municipio);

    const nuevaLocalidad = this.localidadRepository.create({
      ...createLocalidadDto,
      // usuario_creador: usuarioCreador,
      municipio: municipio
    })

    return this.localidadRepository.save(nuevaLocalidad);
  }

  findAll() {
    return this.localidadRepository.find();
  }

  async findOne(id: number) {
    const municipio = await this.localidadRepository.findOne({
      where: { id },
    });  

    if (!municipio)
      throw new NotFoundException(`Localidad con ID ${id} no encontrado`);
    
    return municipio;
  }

  async findByMunicipio(municipioId: number) {
    return await this.localidadRepository.find({
      where: {
        municipio: { id: municipioId }
      },
      relations: ['municipio'],
      order: {
        nombre: 'ASC'
      }
    });
  }

  update(id: number, updateLocalidadDto: UpdateLocalidadDto) {
    return `This action updates a #${id} localidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} localidad`;
  }
}
