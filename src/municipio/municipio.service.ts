import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { Repository } from 'typeorm';
import { Municipio } from './entities/municipio.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { EstadoService } from 'src/estado/estado.service';
import { formatFirstUpperCaseEvery } from 'src/helpers/formatFirstUpperCaseEvery';

@Injectable()
export class MunicipioService {

  constructor(
    @Inject('MUNICIPIO_REPOSITORY')
    private municipioRepository: Repository<Municipio>,
    private usuarioService: UsuarioService,
    private estadoService: EstadoService,
  ) {}

  async create(createMunicipioDto: CreateMunicipioDto, idUsuarioCreador: number) {
    const usuarioCreador = await this.usuarioService.findOne(idUsuarioCreador);

    const estado = await this.estadoService.findOne(createMunicipioDto.estado);

    createMunicipioDto.nombre = formatFirstUpperCaseEvery(createMunicipioDto.nombre);

    const nuevoMunicipio = this.municipioRepository.create({
      ...createMunicipioDto,
      estado,
      usuario_creador: usuarioCreador,
    });
  
    return this.municipioRepository.save(nuevoMunicipio);
  }

  findAll() {
    return this.municipioRepository.find();
  }

  async findOne(id: number) {
    
    const municipio = await this.municipioRepository.findOne({
      where: { id },
    });  

    if (!municipio)
      throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
    
    return municipio;
  }

  async findByEstado(estadoId: number) {
    return await this.municipioRepository.find({
      where: {
        estado: { id: estadoId }
      },
      relations: ['estado'],
      order: {
        nombre: 'ASC'
      }
    });
  }

  update(id: number, updateMunicipioDto: UpdateMunicipioDto) {
    return `This action updates a #${id} municipio`;
  }

  remove(id: number) {
    return `This action removes a #${id} municipio`;
  }
}
