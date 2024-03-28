import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CatalogInput {

    @Field({nullable:true})
    id: number;

    @Field()
    description: string;

    @Field()
    status: string;

    @Field()
    code: number;

    @Field({ nullable: true })
    createdAt: Date | null;

    @Field()
    createdBy: number;

    @Field({ nullable: true })
    updatedAt: Date | null;

    @Field({ nullable: true })
    updatedBy: number | null;    
}