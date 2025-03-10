import { forwardRef, Module } from '@nestjs/common';
import { MetodoPagoService } from './metodo_pago.service';
import { MetodoPagoController } from './metodo_pago.controller';
import { DatabaseModule } from 'src/config/database.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { metodoPagoProviders } from './metodo_pago.providers';

@Module({
  imports: [DatabaseModule, forwardRef(() => UsuarioModule)],
  controllers: [MetodoPagoController],
  providers: [MetodoPagoService, ...metodoPagoProviders],
  exports: [MetodoPagoService]
})
export class MetodoPagoModule {}
