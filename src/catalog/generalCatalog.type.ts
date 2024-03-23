import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType('GeneralCatalog')
export class GeneralCatalogType {

    @Field(type => ID)
    id:number;

    @Field()
    description:string;

    @Field()
    status:string;

    @Field()
    code:string;

    @Field()
    created_at:Date;

    @Field()
    created_by:number;

    @Field()
    updated_at:Date;

    @Field()
    updated_by:number;

    @Field()
    language_code:string;

    @Field()
    country_code:string;
}