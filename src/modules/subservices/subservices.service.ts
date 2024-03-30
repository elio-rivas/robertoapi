import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Subservices } from "./subservices.entity";
import { Repository } from "typeorm";
import { CatalogLogger } from "../catalog/catalog.logger";

@Injectable()
export class SubservicesService {
  constructor(
    @InjectRepository(Subservices)
    private SubServicesRepository: Repository<Subservices>,
    private logger: CatalogLogger
  ) {}

  async getSubServices(id: number, serviceId: number, lancode: string, ccode: string) {
    try {
      const services = await this.SubServicesRepository.query(`select * from operative.get_subservices($1,$2,$3,$4)`,[id, serviceId,lancode, ccode]);
      return services || [];
    }catch (error){
      this.logger.error(`Error retrieving services translations for ID ${id}: ${error.message}`, error.stack);
      throw new NotFoundException(`SubService translations for ID ${id} not found`);
    }
  }
}
