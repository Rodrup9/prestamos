import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';

@Controller('estado')
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  @Post('crear')
  @UseGuards(JwtAuthGuard)
  create(@Body() createEstadoDto: CreateEstadoDto, @Request() req) {
    return this.estadoService.create(createEstadoDto, req.user.id);
  }

  @Get('obtener-listado')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.estadoService.findAll();
  }

  @Get('obtener/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.estadoService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoDto) {
    return this.estadoService.update(+id, updateEstadoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.estadoService.remove(+id);
  }
}
