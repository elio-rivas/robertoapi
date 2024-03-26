import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType("Catalog")
export class CatalogType {
  @Field()
  id: number

  @Field()
  description: string;

  @Field()
  status: string;

  @Field()
  code: number;

  @Field()
  createdAt: Date; // Use JavaScript Date object instead of string

  @Field()
  createdBy: number;

  @Field({ nullable: true }) // Mark as nullable since it might be updated later
  updatedAt: Date | null; // Use JavaScript Date object instead of string

  @Field({ nullable: true }) // Mark as nullable since it might be updated later
  updatedBy: number | null;

  @Field({ defaultValue: 'es' }) // Use default value directly in the decorator
  languageCode: string;

  @Field({ defaultValue: 'US' }) // Use default value directly in the decorator
  countryCode: string;

}