import { Query, Resolver } from "@nestjs/graphql";
import { GeneralCatalogType } from "./generalCatalog.type";

@Resolver(of=> GeneralCatalogType)
export class GeneralCatalogResolver{

    @Query(returns => GeneralCatalogType)
    generalCatalog(){
        return{
            id: 123,                
            description: String,
            status: String,
            code: String,
            created_at: (new Date()).toISOString(),
            created_by: Number,
            updated_at: (new Date()).toISOString(),
            updated_by: Number,
            language_code: String,
            country_code: String
        }
    }
}