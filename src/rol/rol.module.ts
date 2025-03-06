import { forwardRef, Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { DatabaseModule } from 'src/config/database.module';
import { rolProviders } from './rol.providers';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PermisoModule } from 'src/permiso/permiso.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UsuarioModule), PermisoModule],
  controllers: [RolController],
  providers: [RolService, ...rolProviders],
  exports: [RolService],
})
export class RolModule {}
