import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { Repository } from 'typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { ClienteService } from 'src/cliente/cliente.service';

@Injectable()
export class PrestamoService {

  constructor(
    @Inject('PRESTAMO_REPOSITORY')
    private prestamoRepository: Repository<Prestamo>,
    @Inject(forwardRef(() => UsuarioService))
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
  ) {}

  async create(createPrestamoDto: CreatePrestamoDto, idUsuarioCreador: number) {
    const prestamista = await this.usuarioService.findOne(createPrestamoDto?.prestamista);

    const cliente = await this.clienteService.findOne(createPrestamoDto?.cliente);

    const nuevoPrestamo = this.prestamoRepository.create({
      ...createPrestamoDto,
      cliente,
      prestamista
    });

    return this.prestamoRepository.save(nuevoPrestamo);
  }

  findAll() {
    return this.prestamoRepository.find();
  }

  async findOne(id: number) {
    return await this.prestamoRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updatePrestamoDto: UpdatePrestamoDto) {
    return `This action updates a #${id} prestamo`;
  }

  remove(id: number) {
    return `This action removes a #${id} prestamo`;
  }
}
