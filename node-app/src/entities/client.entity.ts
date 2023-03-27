import { getRounds, hashSync } from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { normalize } from "../scripts";
import {v4 as uuid} from "uuid";


@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @BeforeInsert()
  addUUID() {
    this.id = uuid();
  }

  @Column({type: "varchar", length: 127, unique: true})
  email: string;
  @BeforeInsert()
  @BeforeUpdate()
  mormalizeEmail() {
    if (this.email) {
      this.email = normalize(this.email)
    }
  }

  @Column({type: "varchar", length: 127})
  password: string
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(){
    const isEncrypted = getRounds(this.password)
    if (!isEncrypted){
      this.password = hashSync(this.password, 10)
    }
  }

  @Column({type: "varchar", length: 255})
  full_name: string

  @Column({type: "bigint"})
  phone: number

  @Column({default: false})
  isAdm: boolean

  @CreateDateColumn()
  createdAt: Date
}

export default Client