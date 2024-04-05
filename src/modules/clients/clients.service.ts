import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Clients } from "./clients.entity";
import { Repository } from "typeorm";
import { ClientsInput } from "./clients.input";

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

  async createOrUpdateClients(clientData: ClientsInput): Promise<Clients> {
    try {
      const { id,
        firstName,
        lastName,
        status,
        email,
        phone,
        address,
        preferredContactMethod,
        preferredServiceDay,
        preferredCommunicationTime,
        socialNet,
        company,
        phoneMobile,
        phoneLandline,
        fax,
        zipcode,
        job,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
        cityId } = clientData;

      // Input validation
      if (firstName === null || firstName === undefined || status === null || status === undefined) {
        throw new Error('Invalid input');
      }

      // Automatically set createdAt if not provided
      if (!clientData.createdAt) {
        clientData.createdAt = new Date();
      }

      // Provide default values for updatedAt and updatedBy if not provided
      if (updatedAt === null || updatedAt === undefined) {
        clientData.updatedAt = null; // Or any other default value that meets your constraints
      }
      if (updatedBy === null || updatedBy === undefined) {
        clientData.updatedBy = null; // Or any other default value that meets your constraints
      }

      let client: Clients;
      if (id) {
        // Update existing client
        client = await this.clientsRepository.findOne({ where: { id } });
        if (!client) {
          throw new NotFoundException('Client not found');
        }
        // Update client fields
        client.firstName = firstName;
        client.lastName = lastName;
        client.status = status;
        client.email = email;
        client.phone = phone;
        client.address = address;
        client.preferredContactMethod = preferredContactMethod;
        client.preferredServiceDay = preferredServiceDay;
        client.preferredCommunicationTime = preferredCommunicationTime;
        client.socialNet = socialNet;
        client.company = company;
        client.phoneMobile = phoneMobile;
        client.phoneLandline = phoneLandline;
        client.fax = fax;
        client.zipcode = zipcode;
        client.job = job;
        client.updatedAt = clientData.updatedAt;
        client.updatedBy = updatedBy;
      } else {
        // Create new client
        client = this.clientsRepository.create({
          firstName,
          lastName,
          status,
          email,
          phone,
          address,
          preferredContactMethod,
          preferredServiceDay,
          preferredCommunicationTime,
          socialNet,
          company,
          phoneMobile,
          phoneLandline,
          fax,
          zipcode,
          job,
          createdAt: clientData.createdAt,
          createdBy,
          updatedAt: clientData.updatedAt,
          updatedBy: updatedBy,
          cityId,
        });
      }

      return await this.clientsRepository.save(client);
    } catch (error) {
      throw error; // Re-throw the error to propagate it up the call stack
    }
  }
}