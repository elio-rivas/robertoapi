import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Countries')
export class CountriesType {
  @Field(() => ID)
  id: number;

  @Field()
  countryName: string;

  @Field({ nullable: true })
  countryAlias: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field()
  createdBy: number;

  @Field({ nullable: true })
  updatedAt: Date | null;

  @Field({ nullable: true })
  updatedBy: number | null;
}
