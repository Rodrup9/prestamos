import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { DireccionService } from 'src/direccion/direccion.service';

@Injectable()
export class ClienteService {
  constructor(
      @Inject('CLIENTE_REPOSITORY')
      private clienteRepository: Repository<Cliente>,
      private usuarioService: UsuarioService,
      private direccionService: DireccionService,
  ) {}

  async create(createClienteDto: CreateClienteDto, idUsuarioCreador: number) {
    
    const usuarioCreador = await this.usuarioService.findOne(idUsuarioCreador);
    
    const usuarioAsignado = await this.usuarioService.findOne(createClienteDto.usuario_asignado);

    const nuevaDireccion = await this.direccionService.createCascade(createClienteDto.direccion, usuarioCreador);

    const nuevoCliente = this.clienteRepository.create({
      ...createClienteDto,
      usuario_creador: usuarioCreador,
      usuario_asignado: usuarioAsignado,
      direccion: nuevaDireccion
    });
    return this.clienteRepository.save(nuevoCliente);

  }

  findAll() {
    return this.clienteRepository.find();
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['direccion', 'usuario_asignado'],
    });  

    if (!cliente)
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.findOne(id);

    if (updateClienteDto.usuario_asignado) {
      const usuarioAsignado = await this.usuarioService.findOne(updateClienteDto.usuario_asignado);
      cliente.usuario_asignado = usuarioAsignado;
    }
    const { direccion, ...clienteData } = updateClienteDto;

    // const clienteActualizado = await this.clienteRepository.save({
    //   ...cliente,
    //   ...clienteData,
    // })

    // if (direccion && cliente.direccion) {
    //   const direccionActualizada = await this.direccionService.updateCascade(cliente.direccion, direccion);
    //   return { ...clienteActualizado, direccion: direccionActualizada };
    // }
    // return clienteActualizado;
  }
/*
  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }*/
}
