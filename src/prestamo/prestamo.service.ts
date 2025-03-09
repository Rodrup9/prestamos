import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { Repository } from 'typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { reduce } from 'rxjs';
import { abonoProviders } from '../abono/abono.providers';
import { Abono } from 'src/abono/entities/abono.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

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
    const prestamista: Usuario = await this.usuarioService.findOne(createPrestamoDto?.prestamista);

    const cliente: Cliente = await this.clienteService.findOne(createPrestamoDto?.cliente);

    const nuevoPrestamo: Prestamo = this.prestamoRepository.create({
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
    const prestamo: Prestamo = await this.prestamoRepository.findOne({
      where: { id },
      relations: {
        prestamista: true,
        cliente: true,
        abonos: true,
      }
    });

    const abonos: Abono[] = prestamo.abonos;

    const abonado: number = abonos.reduce((acc, cur) => acc + cur?.abono, 0);

    return {
      ...prestamo,
      deuda: (prestamo?.monto - abonado),
      abonado,
    }
  }

  update(id: number, updatePrestamoDto: UpdatePrestamoDto) {
    return `This action updates a #${id} prestamo`;
  }

  remove(id: number) {
    return `This action removes a #${id} prestamo`;
  }
}
