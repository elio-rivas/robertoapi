import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Subservices } from "./subservices.entity";
import { Repository } from "typeorm";
import { CatalogLogger } from "../catalog/catalog.logger";
import { catchError, from, Observable, throwError } from "rxjs";
import { SubservicesInput } from "./subservices.input";

@Injectable()
export class SubservicesService {
  constructor(
    @InjectRepository(Subservices)
    private SubServicesRepository: Repository<Subservices>,
    private logger: CatalogLogger
  ) {}

  getSubServices(id: number, serviceId: number, lancode: string, ccode: string): Observable<Subservices[]> {
    return from (
      this.SubServicesRepository.query(`select * from operative.get_subservices($1, $2, $3, $4)`, [id, serviceId, lancode, ccode])
    ).pipe(
      catchError(error => {
        this.logger.error(`Error retrieving SubServices translations for ID ${id}: ${error.message}`, error.stack);
        return throwError(new NotFoundException(`SubService translations for ID ${id} not found`));
      })
    );
  }


  async createOrUpdateSubServices(SubServicesInput: SubservicesInput | null): Promise<Subservices> {
    try {
      if (!SubServicesInput) {
        throw new Error('Invalid input');
      }

      const { id, serviceId, description, status, code, createdBy, updatedAt, updatedBy } = SubServicesInput;

      if (description === null || description === undefined || serviceId === null || serviceId === undefined || status === null || status === undefined || code === null || code === undefined) {
        throw new Error('Invalid input');
      }

      // Automatically set createdAt if not provided
      const createdAt = SubServicesInput.createdAt || new Date();

      // Provide default values for updatedAt and updatedBy if not provided
      const defaultUpdatedAt = updatedAt || null; // Or any other default value that meets your constraints
      const defaultUpdatedBy = updatedBy || null; // Or any other default value that meets your constraints

      let subservice: Subservices;

      if (id) {
        // Update existing subservice
        subservice = await this.SubServicesRepository.findOne({where: { id } } );
        if (!subservice) {
          throw new Error('SubService not found');
        }
        subservice.serviceId = serviceId;
        subservice.description = description;
        subservice.status = status;
        subservice.code = code;
        subservice.updatedAt = updatedAt;
        subservice.updatedBy = updatedBy;
      } else {
        // Create a new subservice
        subservice = this.SubServicesRepository.create({
          serviceId,
          description,
          status,
          code,
          createdAt,
          createdBy,
          updatedAt: defaultUpdatedAt,
          updatedBy: defaultUpdatedBy
        });
      }

      return await this.SubServicesRepository.save(subservice);
    } catch (error) {
      this.logger.error('Error creating services: ', error.stack);
      throw error; // Re-throw the error to propagate it up the call stack
    }
  }
}
