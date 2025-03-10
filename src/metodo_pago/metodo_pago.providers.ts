
import { DataSource } from 'typeorm';
import { MetodoPago } from './entities/metodo_pago.entity';

export const metodoPagoProviders = [
  {
    provide: 'METODO_PAGO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MetodoPago),
    inject: ['DATA_SOURCE'],
  },
];
