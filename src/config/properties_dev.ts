import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
// import { Catalog } from '../modules/catalog/catalog.entity';
// import { Services } from "../modules/services/services.entity";
// import { Subservices } from "../modules/subservices/subservices.entity";
// import { Countries } from "../modules/countries/countries.entity";
// import { States } from "../modules/states/states.entity";
// import { Cities } from "../modules/cities/cities.entity";
// import { Clients } from "../modules/clients/clients.entity";

const devConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ElioRivas2023**',
  database: 'robertos_dev',
  entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'], // Using auto-discovery
  synchronize: false,
};

export default devConfig;