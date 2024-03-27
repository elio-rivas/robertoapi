import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CatalogModule } from './catalog/catalog.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import devConfig from './config/properties_dev';
import prodConfig from './config/properties_prod';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CatalogtranModule } from './catalogtran/catalogtran.module';


const environment = process.env.NODE_ENV || 'development';
const databaseConfig: PostgresConnectionOptions = environment === 'production' ? prodConfig : devConfig;

//console.log(`Active environment: ' + ${environment}`);

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
    CatalogtranModule
  ],
})
export class AppModule {}
