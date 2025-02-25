import { Inject, Injectable } from '@nestjs/common';
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

  create(createClienteDto: CreateClienteDto) {
    //Crear direccion primero, luego crear el cliente
    return 'This action adds a new cliente';
  }

  findAll() {
    return `This action returns all cliente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }
/*
  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }*/
}
