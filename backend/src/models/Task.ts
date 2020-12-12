import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { List } from "./List";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  isCompleted!: boolean;

  @Column({ default: 'now()' })
  createdAt?: Date;

  @ManyToOne(type => List, tasks => List, {
    eager: true
  })
  list?: List;
}
