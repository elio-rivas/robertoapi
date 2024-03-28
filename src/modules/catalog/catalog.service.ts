import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError  } from 'typeorm/error/EntityNotFoundError';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from './catalog.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CatalogLogger } from './catalog.logger';
import { CatalogInput } from './catalog.input';

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

    async createCatalog(createCatalogInput: CatalogInput): Promise<Catalog> {
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

    async createOrUpdateCatalog(catalogInput: CatalogInput): Promise<Catalog>{
        try{
            const {id, description, status, code, createdBy, updatedAt, updatedBy } = catalogInput;
            if (description === null || description === undefined || status === null || status === undefined || code === null || code === undefined) {
                throw new Error('Description, status, and code are required');
            }

            //Automatically set createdAt if not provided
            if(!catalogInput.createdAt){
                catalogInput.createdAt = new Date();
            }

            //Provide default values for updatedAt and updatedBy if not provided
            if (updatedAt === null || updatedAt === undefined) {
                catalogInput.updatedAt = null; // Or any other default value that meets your constraints
            }
            if (updatedBy === null || updatedBy === undefined) {
                catalogInput.updatedBy = null; // Or any other default value that meets your constraints
            }
            let catalog: Catalog;
            if (id) {
                // Update existing record
                catalog = await this.catalogRepository.findOne({ where: { id } });
                if (!catalog) {
                    throw new Error('Catalog not found');
                }

                catalog.description = description;
                catalog.status = status;
                catalog.code = code;
                catalog.updatedAt = catalogInput.updatedAt;
                catalog.updatedBy = updatedBy;
            } else {
                // Create new record
                catalog = this.catalogRepository.create({
                    description,
                    status,
                    code,
                    createdAt: catalogInput.createdAt,
                    createdBy,
                    updatedAt: catalogInput.updatedAt,
                    updatedBy: updatedBy
                });
            }

            return await this.catalogRepository.save(catalog);

        }catch (error) {
            this.logger.error('Error creating catalog: ', error.stack);
            throw error; // Re-throw the error to propagate it up the call stack
        }
    }

    async getCatalogTranslation(id: number | null, lancode: string, ccode: string): Promise<Catalog[]> {
        let query = `
        SELECT
            gc.id,
            COALESCE(gct.description, gc.description) AS description
        FROM
            operative.general_catalog gc
                LEFT JOIN
            operative.general_catalog_translations gct ON gc.id = gct.catalog_id
    `;

        const parameters = [];
        if (id !== null) {
            query += ` WHERE gc.id = $1`;
            parameters.push(id);
        }

        if (id !== null) {
            query += ` AND (gct.language_code = $2 AND gct.country_code = $3)`;
            parameters.push(lancode, ccode);
        } else {
            query += ` AND (gct.language_code = $1 AND gct.country_code = $2)`;
            parameters.push(lancode, ccode);
        }

        query += ` ORDER BY gc.id`;

        try {
            return await this.catalogRepository.query(query, parameters);
        } catch (error) {
            this.logger.error(`Error retrieving catalog translations for ID ${id}: ${error.message}`, error.stack);
            throw new NotFoundException(`Catalog translations for ID ${id} not found`);
        }
    }


}
