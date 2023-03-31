import { MigrationInterface, QueryRunner } from "typeorm";

export class addContactEntity1680142829037 implements MigrationInterface {
    name = 'addContactEntity1680142829037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(127) NOT NULL, "full_name" varchar(255) NOT NULL, "phone" bigint NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
