import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ClientsInput {
  @Field({ nullable: true })
  id: number;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  preferredContactMethod: string;

  @Field({ nullable: true })
  preferredServiceDay: string;

  @Field({ nullable: true })
  preferredCommunicationTime: string;

  @Field({ nullable: true })
  socialNet: string;

  @Field({ nullable: true })
  company: string;

  @Field({ nullable: true })
  phoneMobile: string;

  @Field({ nullable: true })
  phoneLandline: string;

  @Field({ nullable: true })
  fax: string;

  @Field({ nullable: true })
  zipcode: string;

  @Field({ nullable: true })
  job: string;

  @Field({ nullable: true })
  createdAt: Date | null;

  @Field()
  createdBy: number;

  @Field({ nullable: true })
  updatedAt: Date | null;

  @Field({ nullable: true })
  updatedBy: number | null;

  @Field({ nullable: true })
  cityId: number | null;
}
