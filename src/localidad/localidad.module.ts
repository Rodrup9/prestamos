import { Module } from '@nestjs/common';
import { LocalidadService } from './localidad.service';
import { LocalidadController } from './localidad.controller';
import { DatabaseModule } from 'src/config/database.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { MunicipioModule } from 'src/municipio/municipio.module';
import { localidadProviders } from './localidad.providers';

@Module({
  imports: [DatabaseModule, UsuarioModule, MunicipioModule],
  controllers: [LocalidadController],
  providers: [LocalidadService, ...localidadProviders],
  exports: [LocalidadService]
})
export class LocalidadModule {}
