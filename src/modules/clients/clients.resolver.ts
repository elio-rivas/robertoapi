import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ClientsType } from "./clients.types";
import { ClientsService } from "./clients.service";
import { ClientsInput } from "./clients.input";

@Resolver(of => ClientsType)
export class ClientsResolver {
  constructor(
    private service: ClientsService
  ){}

  @Query(returns => [ClientsType])
  async getClients(@Args('id', { nullable: true , type: ()=> Int }) id: number | null): Promise<ClientsType[]>{
    try {
      const clients = await this.service.getClients(id);
      console.log(clients);
      return clients.map(cli => ({ ...cli, id: +cli.id}));
    }catch (error){
      throw new Error('Failed to get clientes');
    }
  }

  @Mutation(returns => ClientsType)
  async createOrUpdateClients(@Args('clientData') clientData: ClientsInput ): Promise<ClientsType>{
    return this.service.createOrUpdateClients(clientData);
  }
}
