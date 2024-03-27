import { Module } from '@nestjs/common';
import { CatalogResolver } from './catalog.resolver';
import { CatalogService } from './catalog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catalog } from './catalog.entity';
import { CatalogLogger } from './catalog.logger';
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
