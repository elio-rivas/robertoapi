import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ServicesInput{
  @Field({ nullable: true})
  id: number;

  @Field()
  catalogId: number;

  @Field()
  description: string;

  @Field()
  status: string;

  @Field()
  code: number;

  @Field()
  createdAt: Date | null;

  @Field()
  createdBy: number;

  @Field({ nullable: true })
  updatedAt: Date | null;

  @Field({ nullable: true })
  updatedBy: number | null;
}