import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class CitiesInput {
  @Field({ nullable: true })
  id: number;

  @Field()
  cityName: string;

  @Field(() => ID)
  stateId: number;

  @Field({ nullable: true })
  cityAlias: string;

  @Field({ nullable: true })
  createdAt: Date | null;

  @Field()
  createdBy: number;

  @Field({ nullable: true })
  updatedAt: Date | null;

  @Field({ nullable: true })
  updatedBy: number | null;
}
