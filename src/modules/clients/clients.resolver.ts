import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { ClientsType } from "./clients.types";
import { ClientsService } from "./clients.service";

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

}
