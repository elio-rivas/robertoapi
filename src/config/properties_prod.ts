import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const prodConfig: PostgresConnectionOptions ={
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ElioRivas2023**',
  database: 'robertos_dev',
  entities: [],
  synchronize: false,
};

export default prodConfig;