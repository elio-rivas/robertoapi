import { Module } from '@nestjs/common';
import { CatalogTranResolver } from './catalogtran.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogTran } from './catalogtran.entity';
import { CatalogTranService } from './catalogtran.service';
import { CatalogLogger } from '../catalog/catalog.logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatalogTran])
  ],
  providers:[
    CatalogTranResolver,
    CatalogTranService,
    CatalogLogger
  ]
})
export class CatalogtranModule {}
