import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { SubservicesType } from "./subservices.type";
import { SubservicesService } from "./subservices.service";
import { CatalogLogger } from "../catalog/catalog.logger";

@Resolver(of => SubservicesType)
export class SubservicesResolver{
  constructor(
    private service: SubservicesService,
    private logger: CatalogLogger
  ) {}

  @Query(of => [SubservicesType])
  async getSubServices(
    @Args('id', { nullable: true, type: () => Int }) id: number | null,
    @Args('serviceId', { type: () => Int }) serviceId: number,
    @Args('lancode', { type: () => String }) lancode: string,
    @Args('ccode', { type: () => String }) ccode: string
  ): Promise<SubservicesType[]>{
    try {
      const subservices = await this.service.getSubServices(id, serviceId, lancode, ccode);
      return subservices.map(sser => ({ ...sser, id: +sser.id})); // Convert the id to a number and return the object with the id as a number
    }catch (error){
      this.logger.error('Error getting services in resolver', error.stack);
      throw new Error('Failed to get services'); // You can customize the e
    }
  }

}