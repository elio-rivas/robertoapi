import { Resolver } from "@nestjs/graphql";
import { CountriesType } from "./countries.type";

@Resolver(of => CountriesType)
export class CountriesResolver{
  constructor(){}

}