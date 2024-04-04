import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('States')
export class StatesType {
  @Field(() => ID)
  id: number;

  @Field()
  stateName: string;

  @Field(() => ID)
  countryId: number;

  @Field({ nullable: true })
  stateAlias: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field()
  createdBy: number;

  @Field({ nullable: true })
  updatedAt: Date | null;

  @Field({ nullable: true })
  updatedBy: number | null;
}
