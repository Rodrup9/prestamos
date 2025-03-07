import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: process.env.HOST_DB,
        port: +process.env.PORT_DB,
        username: process.env.USERNAME_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.NAME_DB,
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
