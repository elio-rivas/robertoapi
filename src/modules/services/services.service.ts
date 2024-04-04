import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Services } from "./services.entity";
import { Repository } from "typeorm";
import { CatalogLogger } from "../catalog/catalog.logger";
import { ServicesInput } from "./services.input";
import { Subservices } from "../subservices/subservices.entity";

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,
    private logger: CatalogLogger,
    @InjectRepository(Subservices)
    private subservicesRepository: Repository<Subservices>

  ) {}

  async getServices(id: number | null, catalogId:number, lancode: string, ccode:string ): Promise<Services[]> {
    try {
      const services = await this.servicesRepository.query(`select * from operative.get_services($1,$2,$3,$4)`,[id, catalogId, lancode, ccode]);
      return services || []; // If services is null or undefined, return an empty array
    } catch (error) {
      this.logger.error(`Error retrieving services translations for ID ${id}: ${error.message}`, error.stack);
      throw new NotFoundException(`Service translations for ID ${id} not found`);
    }
  }

  async createOrUpdateServices(servicesInput: ServicesInput): Promise<Services>{
    try {
    const {id, catalogId, description, status, code, createdBy, updatedAt, updatedBy } = servicesInput;
    if(description === null || description === undefined || catalogId === null || catalogId === undefined || status === null || status === undefined || code === null || code === undefined) {
      throw new Error('Invalid input');
    }

    //automatically set createdAt if not provided
      if(!servicesInput.createdAt){
        servicesInput.createdAt = new Date();
      }
      //Provide default values for updatedAt and updatedBy if not provided
      if (updatedAt === null || updatedAt === undefined) {
        servicesInput.updatedAt = null; // Or any other default value that meets your constraints
      }
      if(updatedBy === null || updatedBy === undefined) {
        servicesInput.updatedBy = null; // Or any other default value that meets your constraints
      }

      let service: Services;
      if(id){
        //update existing service
        service = await this.servicesRepository.findOne({ where: { id } });
        if(!service){
          throw new Error('Service not found');
        }
        service.catalogId = catalogId;
        service.description = description;
        service.status = status;
        service.code = code;
        service.updatedAt = servicesInput.updatedAt;
        service.updatedBy = updatedBy;
      } else {
        //create new service
        service = this.servicesRepository.create({
          catalogId,
          description,
          status,
          code,
          createdAt: servicesInput.createdAt,
          createdBy,
          updatedAt: servicesInput.updatedAt,
          updatedBy: updatedBy
        });
      }
      return await this.servicesRepository.save(service);
    }catch (error) {
      this.logger.error('Error creating services: ', error.stack);
      throw error; // Re-throw the error to propagate it up the call stack
    }
  }

}
