import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Catalog } from '../catalog/catalog.entity';
import { CatalogTran } from '../catalogtran/catalogtran.entity';

const devConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ElioRivas2023**',
  database: 'robertos_dev',
  entities: [
    Catalog,
    CatalogTran
  ],
  synchronize: false,
};

export default devConfig;