import { forwardRef, Module } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { PermisoController } from './permiso.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { permisoProviders } from './permiso.providers';
import { DatabaseModule } from 'src/config/database.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UsuarioModule)],
  controllers: [PermisoController],
  providers: [PermisoService, ...permisoProviders],
  exports: [PermisoService]
})
export class PermisoModule {}
