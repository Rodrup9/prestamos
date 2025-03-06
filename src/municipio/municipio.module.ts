import { Module } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { MunicipioController } from './municipio.controller';
import { DatabaseModule } from 'src/config/database.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { EstadoModule } from 'src/estado/estado.module';
import { municipioProviders } from './municipio.providers';

@Module({
  imports: [DatabaseModule, UsuarioModule, EstadoModule],
  controllers: [MunicipioController],
  providers: [MunicipioService, ...municipioProviders],
  exports: [MunicipioService],
})
export class MunicipioModule {}
