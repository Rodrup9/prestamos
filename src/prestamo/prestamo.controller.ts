import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';

@Controller('prestamo')
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) {}

  @Post('crear')
  @UseGuards(JwtAuthGuard)
  create(@Body() createPrestamoDto: CreatePrestamoDto, @Request() req) {
    return this.prestamoService.create(createPrestamoDto, req.user.id);
  }

  @Get('obtener-listado')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.prestamoService.findAll();
  }

  @Get('obtener/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.prestamoService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePrestamoDto: UpdatePrestamoDto) {
    return this.prestamoService.update(+id, updatePrestamoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.prestamoService.remove(+id);
  }
}
