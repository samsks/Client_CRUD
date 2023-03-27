import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import path from 'path';
import 'reflect-metadata';

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}');
  const migrationPath: string = path.join(__dirname, './migrations/**.{ts,js}');

  const dbUrl: string | undefined = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

  if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === 'test') {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [entitiesPath],
    };
  }else if(nodeEnv === 'dev_sqlite'){
    return {
        type: 'sqlite',
        database: './database.sqlite',
        synchronize: true,
        entities: [entitiesPath],
        migrations: [migrationPath],
      };
  }else if(nodeEnv === 'dev_postgres'){
    return {
        type: 'postgres',
        url: dbUrl,
        synchronize: true,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationPath],
      };
  }

  return {
    type: 'postgres',
    url: dbUrl,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationPath],
  };
};

const AppDataSource = new DataSource(dataSourceConfig());

export default AppDataSource;