import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatalogType } from './catalog.type';
import { CatalogService } from './catalog.service';
import { CatalogLogger } from './catalog.logger';
import { CatalogInput } from './catalog.input';

@Resolver(of => CatalogType)
export class CatalogResolver {
  constructor(
    private service: CatalogService,
    private logger: CatalogLogger
  ){}

  @Query(returns => [CatalogType])
  async getCatalogs(
    @Args('id', { nullable: true, type: () => Int }) id: number | null,
    @Args('lancode', { type: () => String }) lancode: string,
    @Args('ccode', { type: () => String }) ccode: string,
  ): Promise<CatalogType[]>{
    try{
      const catalogtrans = await this.service.getCatalogs(id, lancode, ccode);
      return catalogtrans.map(cat =>({ ...cat, id: +cat.id}));
    }catch (error){
      this.logger.error('Error getting catalogs in resolver', error.stack);
      throw new Error('Failed to get catalogs'); // You can customize the error message as needed
    }
  }

  @Mutation(returns => CatalogType)
  async createOrUpdateCatalog( @Args('createOrUpdateCatalog') CatalogInput: CatalogInput ){
    try{
      return await this.service.createOrUpdateCatalog(CatalogInput);
    }catch (error) {
      this.logger.error('Error creating catalog in resolver', error.stack);
      throw new Error('Failed to create catalog'); // You can customize the error message as needed
    }
  }

}