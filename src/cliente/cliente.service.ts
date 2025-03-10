import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { DireccionService } from 'src/direccion/direccion.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';

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
      // usuario_creador: usuarioCreador,
      usuario_asignado: usuarioAsignado,
      direccion: nuevaDireccion
    });
    return this.clienteRepository.save(nuevoCliente);

  }

  findAll() {
    return this.clienteRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: {
        direccion: true,
        usuario_asignado: true,
      },
    });  
    
    if (!cliente)
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    
    return cliente;
  }

  private async findOneInfo(id: number): Promise<Cliente> {
    
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: {
        direccion: {
          localidad: true
        },
        usuario_asignado: true,
      },
    });  
    
    if (!cliente)
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto, idUsuario: number): Promise<Cliente> {
    const cliente = await this.findOneInfo(id);

    let usuarioAsignado: Usuario = cliente.usuario_asignado;
    if (updateClienteDto?.usuario_asignado) {
      const nuevoUsuario = await this.usuarioService.findOne(updateClienteDto.usuario_asignado);
      usuarioAsignado = nuevoUsuario;
    }

    const clienteUpdate: any = {
      ...cliente,
      ...updateClienteDto,
      usuario_asignado: usuarioAsignado,
    }

    if (!clienteUpdate?.nombre || !clienteUpdate?.apellido_paterno || !clienteUpdate?.curp || !clienteUpdate?.fecha_nacimiento)
      throw new NotFoundException('Nombre, apellido parteo, curp, fecha nacimiento no pueden estar vacios');

    let direccion: Direccion = cliente?.direccion;
    if (updateClienteDto?.direccion) {
      direccion = await this.direccionService.updateCascade(cliente.direccion, updateClienteDto.direccion);
    }

    return this.clienteRepository.save({
      ...clienteUpdate,
      direccion,
    });
  }
/*
  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }*/
}
