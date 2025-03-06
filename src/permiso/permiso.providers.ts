
import { DataSource } from 'typeorm';
import { Permiso } from './entities/permiso.entity';

export const permisoProviders = [
  {
    provide: 'PERMISO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Permiso),
    inject: ['DATA_SOURCE'],
  },
];
