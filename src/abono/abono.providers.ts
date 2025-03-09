import { DataSource } from 'typeorm';
import { Abono } from './entities/abono.entity';

export const abonoProviders = [
  {
    provide: 'ABONO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Abono),
    inject: ['DATA_SOURCE'],
  },
];
