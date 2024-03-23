import { ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CatalogModule } from './catalog/generalCatalog.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:'schema.gql'
    }),
    CatalogModule
  ],  
})
export class AppModule {}
