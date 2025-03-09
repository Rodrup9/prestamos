import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('crear')
  @UseGuards(JwtAuthGuard)
  create(@Body() createClienteDto: CreateClienteDto, @Request() req) {
    return this.clienteService.create(createClienteDto, req.user.id);
  }

  @Get('obtener-listado')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.clienteService.findAll();
  }

  @Post('actualizar/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string,  @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Get('obtener/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

}
