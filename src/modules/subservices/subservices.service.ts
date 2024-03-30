import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Subservices } from "./subservices.entity";
import { Repository } from "typeorm";
import { CatalogLogger } from "../catalog/catalog.logger";
import { catchError, from, Observable, throwError } from "rxjs";

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
}
