import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

import * as bcrypt from "bcryptjs";

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

  passwordHash() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  passwordCheck(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
