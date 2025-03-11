import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { UpdateAutenticacionDto } from './dto/update-autenticacion.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Response } from 'express';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('login')
  async login(@Body() loginUsuarioDto: LoginUsuarioDto, @Res() res: Response) {
    const usuario = await this.autenticacionService.login(loginUsuarioDto);    
    res.cookie('access_token', usuario.access_token, {
      httpOnly: true,
      secure: true/*process.env.NODE_ENV === 'production'*/,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    return res.json({ message: 'Autenticado con éxito', usuario: usuario.usuario });

  }

}
