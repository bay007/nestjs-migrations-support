import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
  const dbOptions = {};

  Object.assign(dbOptions, {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: false,
    ssl: true,
    autoLoadEntities: true,
    //entities: [__dirname + '/../entities/**/*.entity.{js,ts}'],
    entities: ['./**/entities/*.entity.ts'],
  });

  return dbOptions;
};

export const getDataSourceOptions = (): DataSourceOptions => {
  const options: DataSourceOptions = {
    ...getTypeOrmModuleOptions(),
  } as DataSourceOptions;

  Object.assign(options, {
    migrationsTableName: 'db_migrations',
    migrations: ['./**/*-migrations.ts'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  } as Partial<DataSourceOptions>);

  return options;
};

export default new DataSource(getDataSourceOptions());
