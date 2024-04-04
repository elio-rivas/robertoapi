import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Cities')
export class CitiesType {
  @Field(() => ID)
  id: number;

  @Field()
  cityName: string;

  @Field(() => ID)
  stateId: number;

  @Field({ nullable: true })
  cityAlias: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field()
  createdBy: number;

  @Field({ nullable: true })
  updatedAt: Date | null;

  @Field({ nullable: true })
  updatedBy: number | null;
}
