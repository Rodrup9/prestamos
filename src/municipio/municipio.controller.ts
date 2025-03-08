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

  @Get()
  findAll() {
    return this.municipioService.findAll();
  }

  @Get('por-estado/:id')
  findByEstado(@Param('id') id: string) {    
    return this.municipioService.findByEstado(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.municipioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMunicipioDto: UpdateMunicipioDto) {
    return this.municipioService.update(+id, updateMunicipioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.municipioService.remove(+id);
  }
}
