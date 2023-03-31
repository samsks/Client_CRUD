import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import {v4 as uuid} from "uuid";
import { normalize } from "../scripts";
import Client from "../entities/client.entity";


@Entity("contacts")
export default class Contact{
  @PrimaryGeneratedColumn("uuid")
  id: string;
  // FOR SQLITE
  // @BeforeInsert()
  // addUUID() {
  //   this.id = uuid();
  // }

  @Column({type: "varchar", length: 127 })
  email: string;
  @BeforeInsert()
  @BeforeUpdate()
  mormalizeEmail() {
    if (this.email) {
      this.email = normalize(this.email)
    }
  }

  @Column({type: "varchar", length: 255})
  full_name: string

  @Column({type: "bigint"})
  phone: number | string

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => Client, (c) => c.contacts, {
    nullable: false,
    onDelete: "CASCADE",
  })
  client: Client;
}