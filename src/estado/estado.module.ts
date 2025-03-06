import { Module } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { EstadoController } from './estado.controller';
import { estadoProviders } from './estado.providers';
import { DatabaseModule } from 'src/config/database.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [DatabaseModule, UsuarioModule],
  controllers: [EstadoController],
  providers: [EstadoService, ...estadoProviders],
  exports: [EstadoService,]
})
export class EstadoModule {}
