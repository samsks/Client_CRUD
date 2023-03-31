import { MigrationInterface, QueryRunner } from "typeorm";

export class ContactsRelationManyToOneWithClient1680143274309 implements MigrationInterface {
    name = 'ContactsRelationManyToOneWithClient1680143274309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_contacts" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(127) NOT NULL, "full_name" varchar(255) NOT NULL, "phone" bigint NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "clientId" varchar NOT NULL, CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_contacts"("id", "email", "full_name", "phone", "createdAt") SELECT "id", "email", "full_name", "phone", "createdAt" FROM "contacts"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`ALTER TABLE "temporary_contacts" RENAME TO "contacts"`);
        await queryRunner.query(`CREATE TABLE "temporary_contacts" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(127) NOT NULL, "full_name" varchar(255) NOT NULL, "phone" bigint NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "clientId" varchar NOT NULL, CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "FK_8039454fab552403d5579cf7423" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_contacts"("id", "email", "full_name", "phone", "createdAt", "clientId") SELECT "id", "email", "full_name", "phone", "createdAt", "clientId" FROM "contacts"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`ALTER TABLE "temporary_contacts" RENAME TO "contacts"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME TO "temporary_contacts"`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(127) NOT NULL, "full_name" varchar(255) NOT NULL, "phone" bigint NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "clientId" varchar NOT NULL, CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "contacts"("id", "email", "full_name", "phone", "createdAt", "clientId") SELECT "id", "email", "full_name", "phone", "createdAt", "clientId" FROM "temporary_contacts"`);
        await queryRunner.query(`DROP TABLE "temporary_contacts"`);
        await queryRunner.query(`ALTER TABLE "contacts" RENAME TO "temporary_contacts"`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(127) NOT NULL, "full_name" varchar(255) NOT NULL, "phone" bigint NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "contacts"("id", "email", "full_name", "phone", "createdAt") SELECT "id", "email", "full_name", "phone", "createdAt" FROM "temporary_contacts"`);
        await queryRunner.query(`DROP TABLE "temporary_contacts"`);
    }

}
