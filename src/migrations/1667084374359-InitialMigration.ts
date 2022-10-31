import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1667084374359 implements MigrationInterface {
  name = 'InitialMigration1667084374359';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "group" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isArchived" boolean NOT NULL, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" character varying NOT NULL, "groupId" character varying, "applicationId" character varying, "name" character varying NOT NULL, "extension" character varying NOT NULL, "data" character varying NOT NULL, "size" integer NOT NULL, "mime" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "group_id" character varying, "application_id" character varying, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "meeting" ("id" character varying NOT NULL, "title" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "attendees" jsonb NOT NULL, "notes" character varying, "link" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "applicationId" character varying NOT NULL, "application_id" character varying, CONSTRAINT "PK_dccaf9e4c0e39067d82ccc7bb83" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" character varying NOT NULL, "state" character varying NOT NULL, "date" TIMESTAMP, "applicationId" character varying, CONSTRAINT "UQ_6bdc2c60ce4c5cfd3900e9576fc" UNIQUE ("state", "applicationId"), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "application" ("id" character varying NOT NULL, "groupId" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "company" character varying NOT NULL, "contact" json, "jobUrl" character varying NOT NULL, "notes" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isArchived" boolean NOT NULL, "group_id" character varying, CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_2030d6281b52466186c2a8350db" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_92c0c944a813be64be8d64f40fb" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "meeting" ADD CONSTRAINT "FK_8a23f6dfed99a034968ecb397da" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD CONSTRAINT "FK_33461f0ab61cd809a7d912d0fd1" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "application" ADD CONSTRAINT "FK_6898c4ae79225be5023a8da3989" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "application" DROP CONSTRAINT "FK_6898c4ae79225be5023a8da3989"`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" DROP CONSTRAINT "FK_33461f0ab61cd809a7d912d0fd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "meeting" DROP CONSTRAINT "FK_8a23f6dfed99a034968ecb397da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_92c0c944a813be64be8d64f40fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_2030d6281b52466186c2a8350db"`,
    );
    await queryRunner.query(`DROP TABLE "application"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "meeting"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "group"`);
  }
}
