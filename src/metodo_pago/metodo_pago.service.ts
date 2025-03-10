import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateMetodoPagoDto } from './dto/create-metodo_pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo_pago.dto';
import { Repository } from 'typeorm';
import { MetodoPago } from './entities/metodo_pago.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { formatFirstUpperCaseEvery } from 'src/helpers/formatFirstUpperCaseEvery';

@Injectable()
export class MetodoPagoService {
  constructor(
    @Inject('METODO_PAGO_REPOSITORY')
    private metodoPagoRepository: Repository<MetodoPago>,
    @Inject(forwardRef(() => UsuarioService))
    private usuarioService: UsuarioService,
  ) {}

  async create(createMetodoPagoDto: CreateMetodoPagoDto, idUsuario: number) {
    const usuarioCreador = await this.usuarioService.findOne(idUsuario);

    createMetodoPagoDto.nombre = formatFirstUpperCaseEvery(createMetodoPagoDto?.nombre);

    const nuevoMetodoPago = this.metodoPagoRepository.create({
      ...createMetodoPagoDto
    });

    return this.metodoPagoRepository.save(nuevoMetodoPago);
  }

  findAll() {
    return this.metodoPagoRepository.find();
  }

  async findOne(id: number) {
    return await this.metodoPagoRepository.findOne({
      where: { id }
    });
  }

  update(id: number, updateMetodoPagoDto: UpdateMetodoPagoDto) {
    return `This action updates a #${id} metodoPago`;
  }

  remove(id: number) {
    return `This action removes a #${id} metodoPago`;
  }
}
