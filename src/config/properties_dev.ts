import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Catalog } from '../modules/catalog/catalog.entity';

const devConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ElioRivas2023**',
  database: 'robertos_dev',
  entities: [
    Catalog
  ],
  synchronize: false,
};

export default devConfig;