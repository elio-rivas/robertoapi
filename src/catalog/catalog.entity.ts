import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Catalog {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  status: string;

  @Column()
  @Field()
  code: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  createdBy: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updatedAt: Date | null;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updatedBy: number | null;

  @Column({ default: 'es' })
  @Field()
  languageCode: string;

  @Column({ default: 'US' })
  @Field()
  countryCode: string;

}