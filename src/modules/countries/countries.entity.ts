import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { States } from "../states/states.entity";


@Entity({ name: 'auth.countries' })
@ObjectType()
export class Countries {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ name: 'country_name', nullable: false })
  @Field()
  countryName: string;

  @Column({ name: 'country_alias', nullable: true })
  @Field({ nullable: true })
  countryAlias: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  @Field({ nullable: true })
  createdAt: Date;

  @Column({ name: 'created_by', nullable: false })
  @Field()
  createdBy: number;

  @Column({ name: 'updated_at', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date | null;

  @Column({ name: 'updated_by', nullable: true })
  @Field({ nullable: true })
  updatedBy: number | null;

  @OneToMany(() => States, state => state.country)
  @Field(() => [States], { nullable: true })
  states: States[];
}