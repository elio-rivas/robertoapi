import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from './services.entity';
import { ServicesService } from './services.service';
import { ServicesResolver } from "./services.resolver";
import { CatalogLogger } from "../catalog/catalog.logger";


@Module({
  imports: [TypeOrmModule.forFeature([Services])],
  providers: [ServicesResolver,ServicesService, CatalogLogger]
})
export class ServicesModule {}
