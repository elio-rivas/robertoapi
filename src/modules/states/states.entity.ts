import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Countries } from "../countries/countries.entity";
import { Cities } from "../cities/cities.entity";


@Entity({ name: 'auth.states' })
@ObjectType()
export class States {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ name: 'state_name', nullable: false })
  @Field()
  stateName: string;

  @Column({ name: 'country_id', nullable: false })
  @Field(() => ID)
  countryId: number;

  @Column({ name: 'state_alias', nullable: true })
  @Field({ nullable: true })
  stateAlias: string;

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

  @ManyToOne(() => Countries, country => country.states)
  @JoinColumn({ name: 'country_id' })
  @Field(() => Countries)
  country: Countries;

  @OneToMany(() => Cities, city => city.state)
  cities: Cities[]; // This establishes the one-to-many relationship
}
