
import { DataSource } from 'typeorm';
import { Direccion } from './entities/direccion.entity';

export const direccionProviders = [
  {
    provide: 'DIRECCION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Direccion),
    inject: ['DATA_SOURCE'],
  },
];
