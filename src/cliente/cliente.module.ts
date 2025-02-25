import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { DatabaseModule } from 'src/config/database.module';
import { clienteProviders } from './cliente.providers';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { DireccionModule } from 'src/direccion/direccion.module';

@Module({
  imports: [DatabaseModule, UsuarioModule, DireccionModule],
  controllers: [ClienteController],
  providers: [ClienteService, ...clienteProviders],
  exports: [ClienteService, ...clienteProviders]
})
export class ClienteModule {}
