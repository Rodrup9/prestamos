import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { LocalidadService } from './localidad.service';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';

@Controller('localidad')
export class LocalidadController {
  constructor(private readonly localidadService: LocalidadService) {}

  @Post('crear')
  @UseGuards(JwtAuthGuard)
  create(@Body() createLocalidadDto: CreateLocalidadDto, @Request() req) {
    return this.localidadService.create(createLocalidadDto, req.user.id);
  }

  @Get('obtener-listado')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.localidadService.findAll();
  }

  @Get('obtener/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.localidadService.findOne(+id);
  }

  @Get('obtener-listado/municipio/:id')
  @UseGuards(JwtAuthGuard)
  findByMunicipio(@Param('id') id: string) {
    return this.localidadService.findByMunicipio(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateLocalidadDto: UpdateLocalidadDto) {
    return this.localidadService.update(+id, updateLocalidadDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.localidadService.remove(+id);
  }
}
