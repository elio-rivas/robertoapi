import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Clients } from "./clients.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients) private clientsRepository: Repository<Clients>,
  ) {
  }

  async getClients(id: number | null): Promise<Clients[]> {
    try {
      console.log('Service Received ID:', id); // Add this line for debugging
      if (id !== null) {
        const client = await this.clientsRepository.findOne({ where: { id } });
        if (!client) {
          return []; // Return an empty array if client is not found
        }
        return [client]; // Returning an array to maintain consistency
      } else {
        const clients = await this.clientsRepository.find();
        if (!clients || clients.length === 0) {
          return []; // Return an empty array if no clients found
        }
        return clients; // Return all clients
      }
    } catch (error) {
      throw new NotFoundException(`Client ID ${id} not found`);
    }
  }
}