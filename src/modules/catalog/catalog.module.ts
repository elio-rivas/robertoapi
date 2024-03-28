import { Module } from '@nestjs/common';

import { CatalogService } from './catalog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catalog } from './catalog.entity';
import { CatalogLogger } from './catalog.logger';
import { CatalogResolver } from './catalog.resolver';
@Module({
  imports:[
    TypeOrmModule.forFeature([Catalog])
  ],
  providers: [
    CatalogResolver,
    CatalogService,
    CatalogLogger
  ]
})
export class CatalogModule {}
