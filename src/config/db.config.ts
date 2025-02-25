import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'nestjs_user',
        password: 'ivansinn',
        database: 'prestamos',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        options: {
            encrypt: false,
            trustServerCertificate: true,
          },
      });

      return dataSource.initialize();
    },
  },
];
