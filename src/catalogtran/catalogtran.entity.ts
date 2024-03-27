import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field } from '@nestjs/graphql';

@Entity({name: 'operative.general_catalog_translations'})
export class CatalogTran{

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({name:'catalog_id'})
  @Field({ nullable: true })
  catalogId: number;

  @Column()
  @Field({ nullable: true })
  description: string;

  @Column({ name:'language_code'})
  @Field({ nullable: true })
  languageCode: string;

  @Column({name:'country_code'})
  @Field({ nullable: true })
  countryCode: string;


}