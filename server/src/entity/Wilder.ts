import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Skill } from "./";

@ObjectType()
@Entity()
export default class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  city: string;

  @Field(() => [Skill])
  @ManyToMany(() => Skill, { eager: true })
  @JoinTable()
  skills: Skill[];
}
