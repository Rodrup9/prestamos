import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';

@Controller('direccion')
export class DireccionController {
  constructor(private readonly direccionService: DireccionService) {}

  // @Post()
  // create(@Body() createDireccionDto: CreateDireccionDto) {
  //   return this.direccionService.create(createDireccionDto);
  // }

  @Get('obtener-listado')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.direccionService.findAll();
  }

  @Get('obtener/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.direccionService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDireccionDto: UpdateDireccionDto) {
  //   return this.direccionService.update(+id, updateDireccionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.direccionService.remove(+id);
  // }
}
