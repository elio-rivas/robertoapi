import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CatalogModule } from './catalog/catalog.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import devConfig from '../config/properties_dev';
import prodConfig from '../config/properties_prod';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ServicesModule } from './services/services.module';
import { SubservicesModule } from './subservices/subservices.module';
import { GatewayModule } from './gateway/gateway.module';

const environment = process.env.NODE_ENV || 'development';
const databaseConfig: PostgresConnectionOptions = environment === 'production' ? prodConfig : devConfig;

//console.log(`Active environment: ' + ${environment}`);

const ServicesCatalog = [
  CatalogModule,
  ServicesModule,
  SubservicesModule
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfig,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    ...ServicesCatalog,
    GatewayModule
  ],
})
export class AppModule {}
