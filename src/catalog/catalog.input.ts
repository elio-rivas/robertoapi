import { Field, InputType } from "@nestjs/graphql";
import { IsDateString, IsNumber, IsOptional, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateCatalogInput {

    @MinLength(1)
    @Field()
    description: string;

    @MinLength(1)
    @MaxLength(1)
    @Field()
    status: string;

    @IsNumber()
    @Field()
    code: number;
    
    @Field({ nullable: true }) // Provide a default value
    @IsOptional() // Mark updatedAt as optional
    createdAt: Date | null;

    @IsNumber()
    @Field()
    @IsOptional() // Mark updatedAt as optional
    createdBy: number;

    
    @Field({ nullable: true })
    @IsOptional() // Mark updatedBy as optional
    updatedAt: Date | null;

    @IsNumber()
    @IsOptional() // Mark updatedBy as optional
    updatedBy: number | null;    
}