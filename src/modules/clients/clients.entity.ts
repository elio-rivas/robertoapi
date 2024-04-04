import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Cities } from "../cities/cities.entity";

@Entity({name: 'auth.clients'})
@ObjectType()
export class Clients {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ name: 'first_name', nullable: false })
  @Field()
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column({ name: 'status', length: 1, nullable: false })
  @Field()
  status: string;

  @Column({ name: 'email', nullable: true })
  @Field({ nullable: true })
  email: string;

  @Column({ name: 'phone', nullable: true })
  @Field({ nullable: true })
  phone: string;

  @Column({ name: 'address', nullable: true })
  @Field({ nullable: true })
  address: string;

  @Column({ name: 'preferred_contact_method', nullable: true })
  @Field({ nullable: true })
  preferredContactMethod: string;

  @Column({ name: 'preferred_service_day', nullable: true })
  @Field({ nullable: true })
  preferredServiceDay: string;

  @Column({ name: 'preferred_communication_time', nullable: true })
  @Field({ nullable: true })
  preferredCommunicationTime: string;

  @Column({ name: 'social_net', nullable: true })
  @Field({ nullable: true })
  socialNet: string;

  @Column({ name: 'company', nullable: true })
  @Field({ nullable: true })
  company: string;

  @Column({ name: 'phone_mobile', nullable: true })
  @Field({ nullable: true })
  phoneMobile: string;

  @Column({ name: 'phone_landline', nullable: true })
  @Field({ nullable: true })
  phoneLandline: string;

  @Column({ name: 'fax', nullable: true })
  @Field({ nullable: true })
  fax: string;

  @Column({ name: 'zipcode', nullable: true })
  @Field({ nullable: true })
  zipcode: string;

  @Column({ name: 'job', nullable: true })
  @Field({ nullable: true })
  job: string;

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

  @Column({ name: 'city_id', nullable: true })
  @Field({ nullable: true })
  cityId: number | null;

  @ManyToOne(() => Cities, city => city.clients)
  @JoinColumn({ name: 'city_id' })
  @Field(() => Cities, { nullable: true }) // Corrected decorator to represent a single city
  city: Cities | null;
}
