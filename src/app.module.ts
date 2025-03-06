import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { ClienteModule } from './cliente/cliente.module';
import { DireccionModule } from './direccion/direccion.module';
import { EstadoModule } from './estado/estado.module';
import { MunicipioModule } from './municipio/municipio.module';
import { LocalidadModule } from './localidad/localidad.module';
import { CommonModule } from './common/common.module';
import { PermisoModule } from './permiso/permiso.module';
import { PrestamoModule } from './prestamo/prestamo.module';
import { AbonoModule } from './abono/abono.module';
import { MetodoPagoModule } from './metodo_pago/metodo_pago.module';

@Module({
  imports: [UsuarioModule, RolModule, AutenticacionModule, ClienteModule, DireccionModule, EstadoModule, MunicipioModule, LocalidadModule, CommonModule, PermisoModule, PrestamoModule, AbonoModule, MetodoPagoModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
