import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SubservicesInput{
  @Field( { nullable: true })
  id: number;

  @Field()
  serviceId: number;

  @Field()
  description: string;

  @Field()
  status: string;

  @Field()
  code: number;

  @Field({ nullable: true })
  @Field()
  createdAt: Date | null;

  @Field()
  createdBy: number;

  @Field({ nullable: true })
  updatedAt: Date | null;

  @Field({ nullable: true })
  updatedBy: number | null;

}