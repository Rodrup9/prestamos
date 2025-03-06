import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { usuarioProviders } from './usuario.providers';
import { DatabaseModule } from 'src/config/database.module';
import { RolModule } from 'src/rol/rol.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => RolModule)],
  controllers: [UsuarioController],
  providers: [UsuarioService, ...usuarioProviders],
  exports: [UsuarioService],
})
export class UsuarioModule {}
