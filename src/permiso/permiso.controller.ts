import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';

@Controller('permiso')
export class PermisoController {
  constructor(private readonly permisoService: PermisoService) {}

  @Post('crear')
  // @UseGuards(JwtAuthGuard)
  create(@Body() createPermisoDto: CreatePermisoDto, @Request() req) {
    return this.permisoService.create(createPermisoDto, req.user.id);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  findAll() {
    return this.permisoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permisoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisoService.update(+id, updatePermisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permisoService.remove(+id);
  }
}
