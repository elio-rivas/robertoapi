import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from './services.entity';
import { ServicesService } from './services.service';
import { ServicesResolver } from "./services.resolver";
import { CatalogLogger } from "../catalog/catalog.logger";
import { Subservices } from "../subservices/subservices.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Services, Subservices])],
  providers: [ServicesResolver,ServicesService, CatalogLogger]
})
export class ServicesModule {}
