import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioModule } from 'src/usuario/usuario.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    UsuarioModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.TOKEN_JWT_SECRET,
      signOptions: {expiresIn: '1h'}
    })
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, JwtStrategy],
})
export class AutenticacionModule {}
