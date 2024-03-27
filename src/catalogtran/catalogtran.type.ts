import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType("CatalogTran")
export class CatalogTranType {
  @Field()
  id: number;

  @Field()
  catalogId: number;

  @Field()
  description: string;

  @Field()
  languageCode: string;

  @Field()
  countryCode: string;

}