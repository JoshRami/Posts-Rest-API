import { MigrationInterface, QueryRunner } from 'typeorm';

export class sd1606757941759 implements MigrationInterface {
  name = 'tables';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "comment" text NOT NULL, "blogId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "tag" character varying(50) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "blog" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "blog_tags" ("blogId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_83816e216ddaa66ef2c6dd14abc" PRIMARY KEY ("blogId", "tagId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2d6166f46f1651ffbe308d362b" ON "blog_tags" ("blogId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2b74b3df87cf64e95418c60d4a" ON "blog_tags" ("tagId") `
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_5dec255234c5b7418f3d1e88ce4" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "blog_tags" ADD CONSTRAINT "FK_2d6166f46f1651ffbe308d362b7" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "blog_tags" ADD CONSTRAINT "FK_2b74b3df87cf64e95418c60d4a9" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog_tags" DROP CONSTRAINT "FK_2b74b3df87cf64e95418c60d4a9"`
    );
    await queryRunner.query(
      `ALTER TABLE "blog_tags" DROP CONSTRAINT "FK_2d6166f46f1651ffbe308d362b7"`
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_5dec255234c5b7418f3d1e88ce4"`
    );
    await queryRunner.query(`DROP INDEX "IDX_2b74b3df87cf64e95418c60d4a"`);
    await queryRunner.query(`DROP INDEX "IDX_2d6166f46f1651ffbe308d362b"`);
    await queryRunner.query(`DROP TABLE "blog_tags"`);
    await queryRunner.query(`DROP TABLE "blog"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
