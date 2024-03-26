import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCatalogInput {

    @Field()
    description: string;

    @Field()
    status: string;

    @Field()
    code: number;

    createdAt: Date | null;

    @Field()
    createdBy: number;

    @Field({ nullable: true })
    updatedAt: Date | null;

    @Field({ nullable: true })
    updatedBy: number | null;    
}