import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError  } from 'typeorm/error/EntityNotFoundError';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from './catalog.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CatalogLogger } from './catalog.logger';
import { CreateCatalogInput } from './catalog.input';

@Injectable()
export class CatalogService {
    constructor(
        @InjectRepository(Catalog)
        private catalogRepository: Repository<Catalog>,
        private logger: CatalogLogger
    ){}

    async getCatalog(id:number):Promise<Catalog>{
        try {
            const options: FindOneOptions<Catalog> = {where: {id}};
            return await this.catalogRepository.findOneOrFail(options);    
        } catch (error) {
            if(error instanceof EntityNotFoundError) {
                // Handle case when the entity is not found
                // For example, you might want to throw a custom exception or return null
                throw new NotFoundException(`Catalog with id ${id} not found`);
            }
            // Handle other types of errors, or rethrow the error if it's unexpected
            throw error;
        }
        
    }

    async getCatalogs():Promise<Catalog[]>{
        return await this.catalogRepository.find();
    }

    async createCatalog(createCatalogInput: CreateCatalogInput): Promise<Catalog> {
        try {
            const {description, status, code, createdBy, updatedAt, updatedBy} = createCatalogInput;
    
            if (description === null || description === undefined || status === null || status === undefined || code === null || code === undefined) {
                throw new Error('Description, status, and code are required');
            }
                
            // Automatically set createdAt if not provided
            if (!createCatalogInput.createdAt) {
                createCatalogInput.createdAt = new Date();
            }
    
            // Provide default values for updatedAt and updatedBy if not provided
            if (updatedAt === null || updatedAt === undefined) {
                createCatalogInput.updatedAt = null; // Or any other default value that meets your constraints
            }
            if (updatedBy === null || updatedBy === undefined) {
                createCatalogInput.updatedBy = null; // Or any other default value that meets your constraints
            }
    
            const catalog = this.catalogRepository.create({
                description,
                status,
                code,
                createdAt: createCatalogInput.createdAt,
                createdBy,
                updatedAt: createCatalogInput.updatedAt,
                updatedBy: createCatalogInput.updatedBy
            });      
            return await this.catalogRepository.save(catalog);
        } catch (error) {
            this.logger.error('Error creating catalog: ', error.stack);
            throw error; // Re-throw the error to propagate it up the call stack            
        }        
    }
    
}
