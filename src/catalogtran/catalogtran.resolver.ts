import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { CatalogTranType } from './catalogtran.type';
import { CatalogTranService } from './catalogtran.service';
import { CatalogLogger } from '../catalog/catalog.logger';

@Resolver(of=> CatalogTranType)
export class CatalogTranResolver{

  constructor(
    private service: CatalogTranService,
    private logger: CatalogLogger
  ) {}

  @Query(returns => CatalogTranType)
  catalogTran(
    @Args('id', {type : ()=> Int}) id: number,
  ){
    return this.service.getCatalogTran(id);
  }

  @Query(returns => [CatalogTranType])
  async catalogTrans(): Promise<CatalogTranType[]>{
    try{
      const catalogTrans = await this.service.getCatalogTrans();
      return catalogTrans.map(cat =>({ ...cat, id: +cat.id}));
    }catch(error){
      this.logger.error('Error getting catalogs in resolver', error.stack);
      throw new Error('Failed to get catalogs'); // You can customize the error message as needed
    }
  }

}