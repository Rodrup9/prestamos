
import { DataSource } from 'typeorm';
import { Estado } from './entities/estado.entity';

export const estadoProviders = [
  {
    provide: 'ESTADO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Estado),
    inject: ['DATA_SOURCE'],
  },
];
