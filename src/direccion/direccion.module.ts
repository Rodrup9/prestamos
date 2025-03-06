import { Module } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { DireccionController } from './direccion.controller';
import { DatabaseModule } from 'src/config/database.module';
import { direccionProviders } from './direccion.providers';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LocalidadModule } from 'src/localidad/localidad.module';

@Module({
  imports: [DatabaseModule, UsuarioModule, LocalidadModule],
  controllers: [DireccionController],
  providers: [DireccionService, ...direccionProviders],
  exports: [DireccionService, ...direccionProviders]
})
export class DireccionModule {}
