import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('Subservices')
export class SubservicesType{

  @Field()
  id: number;

  @Field()
  serviceId: number;

  @Field()
  description: string;

  @Field()
  status: string;

  @Field()
  code: number;

  @Field()
  createdAt: Date;

  @Field()
  createdBy: number;

  @Field({ nullable: true })
  updatedAt: Date | null;

  @Field({ nullable: true })
  updatedBy: number | null;

  @Field({ defaultValue: 'es' })
  languageCode: string;

  @Field({ defaultValue: 'US' })
  countryCode: string;
}