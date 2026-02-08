import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1770554179243 implements MigrationInterface {
    name = 'InitSchema1770554179243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "site"."s_order_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "price" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "order_id" integer, "product_id" integer, CONSTRAINT "PK_56b42fde106acc4efe561e4ef15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "site"."s_order_item" ADD CONSTRAINT "FK_92ebda743c20ab7a29f8da1b64e" FOREIGN KEY ("order_id") REFERENCES "site"."s_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "site"."s_order_item" ADD CONSTRAINT "FK_24597a80c8003213934a0a5ff52" FOREIGN KEY ("product_id") REFERENCES "site"."s_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "site"."s_order_item" DROP CONSTRAINT "FK_24597a80c8003213934a0a5ff52"`);
        await queryRunner.query(`ALTER TABLE "site"."s_order_item" DROP CONSTRAINT "FK_92ebda743c20ab7a29f8da1b64e"`);
        await queryRunner.query(`DROP TABLE "site"."s_order_item"`);
    }

}
