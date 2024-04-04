import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsService } from './clients.service';
import { ClientsResolver } from './clients.resolver';
import { Clients } from "./clients.entity";
import { Cities } from "../cities/cities.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Clients, Cities])],
  providers:[ClientsService, ClientsResolver]
})
export class ClientsModule {}
