import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { ClienteModule } from './cliente/cliente.module';
import { DireccionModule } from './direccion/direccion.module';

@Module({
  imports: [UsuarioModule, RolModule, AutenticacionModule, ClienteModule, DireccionModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
