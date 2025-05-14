import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AbonoService } from './abono.service';
import { CreateAbonoDto } from './dto/create-abono.dto';
import { UpdateAbonoDto } from './dto/update-abono.dto';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';

@Controller('abono')
export class AbonoController {
  constructor(private readonly abonoService: AbonoService) {}

  @Post('crear')
  @UseGuards(JwtAuthGuard)
  create(@Body() createAbonoDto: CreateAbonoDto, @Request() req) {
    return this.abonoService.create(createAbonoDto, req.user.id);
  }

  @Get('obtener-listado')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.abonoService.findAll();
  }

  @Get('obtener/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.abonoService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateAbonoDto: UpdateAbonoDto) {
    return this.abonoService.update(+id, updateAbonoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.abonoService.remove(+id);
  }
}
