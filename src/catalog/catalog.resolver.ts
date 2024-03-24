import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatalogType } from './catalog.type';
import { CatalogService } from './catalog.service';
import { CatalogLogger } from './catalog.logger';
import { CreateCatalogInput } from './catalog.input';

@Resolver(of => CatalogType)
export class CatalogResolver {
  constructor(
    private catalogService: CatalogService,
    private logger: CatalogLogger
  ){}

  @Query(returns => CatalogType)
  catalog(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.catalogService.getCatalog(id);
    
  }

  @Mutation(returns => CatalogType)
  async createCatalog( @Args('createCatalogInput') createCatalogInput: CreateCatalogInput ){
    try{    
      // Ensure createdAt receives a valid ISO 8601 date string 
      //createCatalogInput.createdAt = new Date();
      // No need to manually set createdAt here since it's handled in the service
      return await this.catalogService.createCatalog(createCatalogInput);
    }catch (error) {
      this.logger.error('Error creating catalog in resolver', error.stack);
      throw new Error('Failed to create catalog'); // You can customize the error message as needed
    }
  }

}