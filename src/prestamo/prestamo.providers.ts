
import { DataSource } from 'typeorm';
import { Prestamo } from './entities/prestamo.entity';

export const prestamoProviders = [
  {
    provide: 'PRESTAMO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Prestamo),
    inject: ['DATA_SOURCE'],
  },
];
