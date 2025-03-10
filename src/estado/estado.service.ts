import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Repository } from 'typeorm';
import { Estado } from './entities/estado.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { formatFirstUpperCaseEvery } from 'src/helpers/formatFirstUpperCaseEvery';

@Injectable()
export class EstadoService {

  constructor(
    @Inject('ESTADO_REPOSITORY')
    private estadoRepository: Repository<Estado>,
    private usuarioService: UsuarioService,
  ) {}

  async create(createEstadoDto: CreateEstadoDto, idUsuarioCreador: number) {
    createEstadoDto.nombre = formatFirstUpperCaseEvery(createEstadoDto.nombre);
      
    const usuarioCreador = await this.usuarioService.findOne(idUsuarioCreador);
    const nuevoEstado = this.estadoRepository.create({
      ...createEstadoDto,
      // usuario_creador: usuarioCreador,
    });
    return this.estadoRepository.save(nuevoEstado);
  }

  findAll() {
    return this.estadoRepository.find();
  }

  async findOne(id: number) {
    const estado = await this.estadoRepository.findOne({
      where: { id },
    });  

    if (!estado)
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    
    return estado;  
  }

  update(id: number, updateEstadoDto: UpdateEstadoDto) {
    return `This action updates a #${id} estado`;
  }

  remove(id: number) {
    return `This action removes a #${id} estado`;
  }
}
