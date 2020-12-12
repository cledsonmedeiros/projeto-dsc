import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";
import { User } from "./User";

@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: 'now()' })
  createdAt?: Date;

  @ManyToOne(type => User, lists => List, {
    eager: true
  })
  user?: User;

  @OneToMany(type => Task, list => List)
  tasks?: Task[];
}
