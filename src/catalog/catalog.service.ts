import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from './catalog.entity';
import { Repository } from 'typeorm';
import { CatalogLogger } from './catalog.logger';

@Injectable()
export class CatalogService {
    constructor(
        @InjectRepository(Catalog) private catalogRepository: Repository<Catalog>,
        private logger: CatalogLogger
    ){}

    async createCatalog(description: string, status: string, code:number, createdAt:Date, createdBy:number):Promise<Catalog> {
        try {
            if (!description) {
                throw new Error('Description is required');
            }

            const catalog = this.catalogRepository.create({
                description,
                status,
                code,
                createdAt,
                createdBy
            });      
            return await this.catalogRepository.save(catalog);
        }catch (error) {
            this.logger.error('Error creating catalog: ', error.stack);
            throw error; // Re-throw the error to propagate it up the call stack            
        }        
        
    }
}
