import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubservicesService } from './subservices.service';
import { SubservicesResolver } from "./subservices.resolver";
import { CatalogLogger } from "../catalog/catalog.logger";
import { Subservices } from "./subservices.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Subservices])],
  providers:[SubservicesResolver,
             SubservicesService,
            CatalogLogger,
  ],
  exports:[],
})
export class SubservicesModule {}
