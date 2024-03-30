import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { SubservicesType } from "./subservices.type";
import { SubservicesService } from "./subservices.service";
import { CatalogLogger } from "../catalog/catalog.logger";
import { catchError, map, Observable } from "rxjs";

@Resolver(of => SubservicesType)
export class SubservicesResolver{
  constructor(
    private service: SubservicesService,
    private logger: CatalogLogger
  ) {}

  @Query(of => [SubservicesType])
  getSubServices(
    @Args('id', { nullable: true, type: () => Int }) id: number | null,
    @Args('serviceId', { type: () => Int }) serviceId: number,
    @Args('lancode', { type: () => String }) lancode: string,
    @Args('ccode', { type: () => String }) ccode: string
  ): Observable<SubservicesType[]>{
      return this.service.getSubServices(id, serviceId, lancode, ccode).pipe(
        map(subservices => subservices.map(sser => ({ ...sser, id: +sser.id}))),
        catchError(error => {
          this.logger.error('Error getting SubServices in resolver', error.stack);
          throw new Error('Failed to get SubServices'); // You can customize the error message here.
        })
      );
  }

}