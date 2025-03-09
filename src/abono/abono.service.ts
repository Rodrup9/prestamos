import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAbonoDto } from './dto/create-abono.dto';
import { UpdateAbonoDto } from './dto/update-abono.dto';
import { Repository } from 'typeorm';
import { Abono } from './entities/abono.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { MetodoPagoService } from '../metodo_pago/metodo_pago.service';
import { PrestamoService } from 'src/prestamo/prestamo.service';

@Injectable()
export class AbonoService {

  constructor(
    @Inject('ABONO_REPOSITORY')
    private abonoRepository: Repository<Abono>,
    @Inject(forwardRef(() => UsuarioService))
    private usuarioService: UsuarioService,
    private metodoPagoService: MetodoPagoService,
    private prestamoService: PrestamoService,
  ) {}

  async create(createAbonoDto: CreateAbonoDto, idUsuario: number) {
    const usuarioCreador = await this.usuarioService.findOne(idUsuario);

    const prestamo = await this.prestamoService.findOne(createAbonoDto?.prestamo);

    const metodo_pago = await this.metodoPagoService.findOne(createAbonoDto?.metodo_pago);

    const nuevoAbono = this.abonoRepository.create({
      ...createAbonoDto,
      prestamo,
      metodo_pago
    });

    return this.abonoRepository.save(nuevoAbono);
  }

  findAll() {
    return this.abonoRepository.find();
  }

  findOne(id: number) {
    return this.abonoRepository.findOne({
      where: { id }
    });
  }

  update(id: number, updateAbonoDto: UpdateAbonoDto) {
    return `This action updates a #${id} abono`;
  }

  remove(id: number) {
    return `This action removes a #${id} abono`;
  }
}
