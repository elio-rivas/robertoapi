import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Services } from "./services.entity";
import { Repository } from "typeorm";
import { CatalogLogger } from "../catalog/catalog.logger";
import { ServicesInput } from "./services.input";

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,
    private logger: CatalogLogger
  ) {}

  async getServices(id: number | null, catalogId:number, lancode: string, ccode:string ): Promise<Services[]> {
    let query = `
        SELECT
            s.id,
            COALESCE(st.description, s.description) AS description
        FROM
            operative.services s
                LEFT JOIN
            operative.services_translations st ON s.id = st.services_id
                AND (st.language_code = $2 AND st.country_code = $3)
                WHERE s.catalog_id = $1 `;

    const parameters = [catalogId,lancode, ccode];

    if (id !== null) {
      query += ` AND s.id = $${parameters.length + 1}`;
      parameters.push(id.toString());
    }

    query += ` ORDER BY s.id`;

    try {
      return await this.servicesRepository.query(query, parameters);
    } catch (error) {
      this.logger.error(`Error retrieving catalog translations for ID ${id}: ${error.message}`, error.stack);
      throw new NotFoundException(`Catalog translations for ID ${id} not found`);
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
