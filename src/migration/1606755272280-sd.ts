import {MigrationInterface, QueryRunner} from "typeorm";

export class sd1606755272280 implements MigrationInterface {
    name = 'sd1606755272280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blog_tags" ("blogId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_83816e216ddaa66ef2c6dd14abc" PRIMARY KEY ("blogId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2d6166f46f1651ffbe308d362b" ON "blog_tags" ("blogId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2b74b3df87cf64e95418c60d4a" ON "blog_tags" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "blog_tags" ADD CONSTRAINT "FK_2d6166f46f1651ffbe308d362b7" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_tags" ADD CONSTRAINT "FK_2b74b3df87cf64e95418c60d4a9" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_tags" DROP CONSTRAINT "FK_2b74b3df87cf64e95418c60d4a9"`);
        await queryRunner.query(`ALTER TABLE "blog_tags" DROP CONSTRAINT "FK_2d6166f46f1651ffbe308d362b7"`);
        await queryRunner.query(`DROP INDEX "IDX_2b74b3df87cf64e95418c60d4a"`);
        await queryRunner.query(`DROP INDEX "IDX_2d6166f46f1651ffbe308d362b"`);
        await queryRunner.query(`DROP TABLE "blog_tags"`);
    }

}
