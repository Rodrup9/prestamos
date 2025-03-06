
import { DataSource } from 'typeorm';
import { Localidad } from './entities/localidad.entity';

export const localidadProviders = [
  {
    provide: 'LOCALIDAD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Localidad),
    inject: ['DATA_SOURCE'],
  },
];
