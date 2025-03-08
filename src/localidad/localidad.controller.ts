import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { LocalidadService } from './localidad.service';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';

@Controller('localidad')
export class LocalidadController {
  constructor(private readonly localidadService: LocalidadService) {}

  @Post('crear')
  // @UseGuards(JwtAuthGuard)
  create(@Body() createLocalidadDto: CreateLocalidadDto, @Request() req) {
    return this.localidadService.create(createLocalidadDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.localidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localidadService.findOne(+id);
  }

  @Get('por-municipio/:id')
  findByMunicipio(@Param('id') id: string) {
    return this.localidadService.findByMunicipio(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocalidadDto: UpdateLocalidadDto) {
    return this.localidadService.update(+id, updateLocalidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localidadService.remove(+id);
  }
}
