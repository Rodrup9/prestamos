import { forwardRef, Module } from '@nestjs/common';
import { AbonoService } from './abono.service';
import { AbonoController } from './abono.controller';
import { DatabaseModule } from 'src/config/database.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { abonoProviders } from './abono.providers';
import { PrestamoModule } from 'src/prestamo/prestamo.module';
import { MetodoPagoModule } from 'src/metodo_pago/metodo_pago.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UsuarioModule), PrestamoModule, MetodoPagoModule],
  controllers: [AbonoController],
  providers: [AbonoService, ...abonoProviders],
  exports: [AbonoService]
})
export class AbonoModule {}
