import { DataSource } from 'typeorm';

export const AppDaraSource = new DataSource({
    type: 'postgres',
});
