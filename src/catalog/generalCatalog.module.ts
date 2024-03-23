import { Module } from '@nestjs/common';
import { GeneralCatalogResolver } from './generalCatalog.resolver';

@Module({
    providers:[GeneralCatalogResolver]
})
export class CatalogModule {}
