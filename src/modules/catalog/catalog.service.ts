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

    async getCatalogs(id: number | null, lancode: string, ccode: string): Promise<Catalog[]> {
       try {
           const catalogs = await this.catalogRepository.query(`select * from operative.get_catalogs($1, $2,$3)`, [id, lancode, ccode]);
            return catalogs.map(cat =>({ ...cat, id: +cat.id}));
        } catch (error) {
            this.logger.error(`Error retrieving catalog translations for ID ${id}: ${error.message}`, error.stack);
            throw new NotFoundException(`Catalog translations for ID ${id} not found`);
        }
    }




}
