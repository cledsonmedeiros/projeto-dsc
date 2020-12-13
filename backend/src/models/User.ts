import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

import * as bcrypt from "bcryptjs";
import { List } from "./List";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ default: 'now()' })
  createdAt?: Date;

  @OneToMany(type => List, user => User)
  lists?: List[];

  passwordHash() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  passwordCheck(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
