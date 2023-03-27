import { MigrationInterface, QueryRunner } from "typeorm";

export class uuidForSQLite1679856974974 implements MigrationInterface {
    name = 'uuidForSQLite1679856974974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(127) NOT NULL, "password" varchar(127) NOT NULL, "full_name" varchar(255) NOT NULL, "phone" bigint NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
