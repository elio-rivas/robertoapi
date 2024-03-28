import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ServicesType } from "./services.type";
import { ServicesService } from "./services.service";
import { CatalogLogger } from "../catalog/catalog.logger";
import { ServicesInput } from "./services.input";

@Resolver(of => ServicesType)
export class ServicesResolver{
  constructor(
    private service: ServicesService,
    private logger: CatalogLogger
  ){}

  @Query(returns => [ServicesType])
  async getServices(
    @Args('id', { nullable: true, type: () => Int }) id: number | null,
    @Args('catalogId', { type: () => Int }) catalogId: number,
    @Args('lancode', { type: () => String }) lancode: string,
    @Args('ccode', { type: () => String }) ccode: string
  ): Promise<ServicesType[]>{
    try{
      const services = await this.service.getServices(id, catalogId, lancode, ccode);
      return services.map(ser =>({ ...ser, id: +ser.id}));
    }catch (error){
      this.logger.error('Error getting services in resolver', error.stack);
      throw new Error('Failed to get services'); // You can customize the error message as needed
    }
  }

  @Mutation(returns => ServicesType)
  async createOrUpdateServices( @Args('ServicesInput') ServicesInput: ServicesInput ){
    try{
      return await this.service.createOrUpdateServices(ServicesInput);
    }catch (error) {
      this.logger.error('Error creating catalog in resolver', error.stack);
      throw new Error('Failed to create catalog'); // You can customize the error message as needed
    }
  }

}