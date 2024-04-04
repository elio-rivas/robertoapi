import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Countries } from "./countries.entity";
import { CountriesService } from './countries.service';
import { CountriesResolver } from "./countries.resolver";

@Module({
  imports:[TypeOrmModule.forFeature([Countries])],
  providers:[CountriesResolver, CountriesService]
})
export class CountriesModule {}
