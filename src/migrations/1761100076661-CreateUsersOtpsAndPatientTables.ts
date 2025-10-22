import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersOtpsAndPatientTables1761100076661 implements MigrationInterface {
    name = 'CreateUsersOtpsAndPatientTables1761100076661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "otp" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "expiresAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_91fef5ed60605b854a2115d2410" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_82b0deb105275568cdcef2823e" ON "otps" ("userId") `);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('super_admin', 'admin', 'hospital', 'patient', 'doctor', 'user')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" text NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb" UNIQUE ("email"), CONSTRAINT "UQ_b0a6674ba522877c04e98ff9e33" UNIQUE ("phoneNumber"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "otps" ADD CONSTRAINT "FK_82b0deb105275568cdcef2823eb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otps" DROP CONSTRAINT "FK_82b0deb105275568cdcef2823eb"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_82b0deb105275568cdcef2823e"`);
        await queryRunner.query(`DROP TABLE "otps"`);
    }

}
