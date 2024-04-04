import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { States } from "../states/states.entity";
import { Clients } from "../clients/clients.entity";


@Entity({ name: 'auth.cities' })
@ObjectType()
export class Cities {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ name: 'city_name', nullable: false })
  @Field()
  cityName: string;

  @Column({ name: 'state_id', nullable: false })
  @Field(() => ID)
  stateId: number;

  @Column({ name: 'city_alias', nullable: true })
  @Field({ nullable: true })
  cityAlias: string;

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

  @ManyToOne(() => States, state => state.cities)
  @JoinColumn({ name: 'state_id' })
  @Field(() => States)
  state: States;

  @OneToMany(() => Clients, client => client.city) // Establish one-to-many relationship with Clients
  clients: Clients[]; // This property represents the clients associated with the city
}
