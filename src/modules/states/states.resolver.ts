import { Resolver } from "@nestjs/graphql";
import { StatesType } from "./states.type";

@Resolver(of=> StatesType)
export class StatesResolver{
  constructor(){}
}