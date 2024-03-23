import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatalogType } from './catalog.type';
import { CatalogService } from './catalog.service';
import { CatalogLogger } from './catalog.logger';

@Resolver(of => CatalogType)
export class CatalogResolver {
  constructor(
    private catalogService: CatalogService,
    private logger: CatalogLogger
  ){}

  @Query(returns => CatalogType)
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

  @Mutation(returns => CatalogType)
  async createCatalog(
    @Args('description') description: string,
    @Args('status') status: string,
    @Args('code') code: number,    
    @Args('createdBy') createdBy: number
  ){
    try{
      const createdAt = new Date(); // current date/time
      return await this.catalogService.createCatalog(description, status, code, createdAt, createdBy);
    }catch (error) {
      this.logger.error('Error creating catalog in resolver', error.stack);
      throw new Error('Failed to create catalog'); // You can customize the error message as needed
    }
  }

}