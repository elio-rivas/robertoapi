import { Module } from '@nestjs/common';
import { StatesService } from './states.service';
import { StatesResolver } from "./states.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { States } from "./states.entity";

@Module({
  imports:[TypeOrmModule.forFeature([States])],
  providers: [StatesResolver,StatesService],
})
export class StatesModule {}
