import { getRounds, hashSync } from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { normalize } from "../scripts";
import { v4 as uuid } from "uuid";
import Contact from "../entities/contact.entity";


@Entity("clients")
export default class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  // FOR SQLITE
  // @BeforeInsert()
  // addUUID() {
  //   this.id = uuid();
  // }

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
  phone: number | string

  @Column({default: false})
  isAdm: boolean

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(()=> Contact, (ct) => ct.client, {
    cascade: true
  })
  contacts: Contact[]
}
