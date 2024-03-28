import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'operative.services' })
@ObjectType()
export class Services {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ name: 'catalog_id', nullable: false })
  @Field()
  catalogId: number;

  @Column()
  @Field()
  description: string;

  @Column({ length: 1 })
  @Field()
  status: string;

  @Column()
  @Field()
  code: number;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @Column({ name: 'created_by' })
  @Field()
  createdBy: number;

  @Column({ name: 'updated_at', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date | null;

  @Column({ name: 'updated_by', nullable: true })
  @Field({ nullable: true })
  updatedBy: number | null;

  @Column({ name: 'language_code', default: 'es' })
  @Field()
  languageCode: string;

  @Column({ name: 'country_code', default: 'US' })
  @Field()
  countryCode: string;
}
