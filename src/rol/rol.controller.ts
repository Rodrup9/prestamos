import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { JwtAuthGuard } from 'src/autenticacion/jwt-auth.guard';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post('crear')
  // @UseGuards(JwtAuthGuard)
  create(@Body() createRolDto: CreateRolDto, @Request() req) {
    return this.rolService.create(createRolDto, req.user.id);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.rolService.findOne(+id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(+id, updateRolDto);
  }

}
