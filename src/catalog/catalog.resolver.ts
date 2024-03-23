import { Query, Resolver } from '@nestjs/graphql';
import { CatalogType } from './catalog.type';

@Resolver(() => CatalogType)
export class CatalogResolver {

  @Query(() => CatalogType)
  catalog(): CatalogType {
    // Replace this with your actual logic to fetch catalog data from your database or any other source
    return {
      id: 1,
      description: 'Sample Catalog',
      status: 'Active',
      code: 1234,
      createdAt: new Date(),
      createdBy: 1,
      updatedAt: new Date(),
      updatedBy: 1,
      languageCode: 'en',
      countryCode: 'US'
    };
  }
}