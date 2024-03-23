import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CatalogModule } from './catalog/catalog.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import devConfig from './config/properties_dev';
import prodConfig from './config/properties_prod';
import * as process from 'process';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const environment = process.env.NODE_ENV || 'development';
const databaseConfig: PostgresConnectionOptions = environment === 'production' ? prodConfig : devConfig;
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
    CatalogModule,
  ],
})
export class AppModule {}
