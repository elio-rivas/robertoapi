import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class StatesInput {
  @Field({ nullable: true })
  id: number;

  @Field()
  stateName: string;

  @Field(() => ID)
  countryId: number;

  @Field({ nullable: true })
  stateAlias: string;

  @Field({ nullable: true })
  createdAt: Date | null;

  @Field()
  createdBy: number;

  @Field({ nullable: true })
  updatedAt: Date | null;

  @Field({ nullable: true })
  updatedBy: number | null;
}
