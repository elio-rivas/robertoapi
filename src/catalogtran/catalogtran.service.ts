import { Injectable, NotFoundException } from '@nestjs/common';
import { CatalogTran } from './catalogtran.entity';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { FindOneOptions, Repository } from 'typeorm';
import { CatalogLogger } from '../catalog/catalog.logger';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CatalogTranService{
  constructor(
    @InjectRepository(CatalogTran)
    private catalogTranRepository: Repository<CatalogTran>,
    private logger: CatalogLogger
  ){}

  async getCatalogTran(id: number): Promise<CatalogTran>{
    try{
      const options: FindOneOptions<CatalogTran> = {where: {id}};
      return await this.catalogTranRepository.findOneOrFail(options);
    }catch (error){
      if(error instanceof EntityNotFoundError) {
        // Handle case when the entity is not found
        // For example, you might want to throw a custom exception or return null
        throw new NotFoundException(`Catalog with id ${id} not found`);
      }
      // Handle other types of errors, or rethrow the error if it's unexpected
      throw error;
    }
  }

  async getCatalogTrans(): Promise<CatalogTran[]> {
    return await this.catalogTranRepository.find();
  }
}