import { forwardRef, Module } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { PrestamoController } from './prestamo.controller';
import { DatabaseModule } from 'src/config/database.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ClienteModule } from 'src/cliente/cliente.module';
import { prestamoProviders } from './prestamo.providers';

@Module({
  imports: [DatabaseModule, forwardRef(() => UsuarioModule), ClienteModule],
  controllers: [PrestamoController],
  providers: [PrestamoService, ...prestamoProviders],
  exports: [PrestamoService]
})
export class PrestamoModule {}
