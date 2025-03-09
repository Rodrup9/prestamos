import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';

@Controller('municipio')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Post('crear')
  @UseGuards(JwtAuthGuard)
  create(@Body() createMunicipioDto: CreateMunicipioDto, @Request() req) {
    return this.municipioService.create(createMunicipioDto, req.user.id);
  }

  @Get('obtener-listado')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.municipioService.findAll();
  }

  @Get('obtener-listado/estado/:id')
  @UseGuards(JwtAuthGuard)
  findByEstado(@Param('id') id: string) {    
    return this.municipioService.findByEstado(+id);
  }

  @Get('obtener/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.municipioService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateMunicipioDto: UpdateMunicipioDto) {
    return this.municipioService.update(+id, updateMunicipioDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.municipioService.remove(+id);
  }
}
