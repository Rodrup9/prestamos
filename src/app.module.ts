import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';

@Module({
  imports: [UsuarioModule, RolModule, AutenticacionModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
