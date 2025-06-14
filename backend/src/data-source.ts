import { DataSource } from 'typeorm';
import { Sampledata } from './entities/sampledata.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data/db.sqlite',
  entities: [Sampledata],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
