import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MetodoPagoService } from './metodo_pago.service';
import { CreateMetodoPagoDto } from './dto/create-metodo_pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo_pago.dto';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';

@Controller('metodo-pago')
export class MetodoPagoController {
  constructor(private readonly metodoPagoService: MetodoPagoService) {}

  @Post('crear')
  @UseGuards(JwtAuthGuard)
  create(@Body() createMetodoPagoDto: CreateMetodoPagoDto, @Request() req) {
    return this.metodoPagoService.create(createMetodoPagoDto, req?.user?.id);
  }

  @Get('obtener-listado')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.metodoPagoService.findAll();
  }

  @Get('obtener/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.metodoPagoService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateMetodoPagoDto: UpdateMetodoPagoDto) {
    return this.metodoPagoService.update(+id, updateMetodoPagoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.metodoPagoService.remove(+id);
  }
}
