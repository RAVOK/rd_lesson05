import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStockToProduct1770558606117 implements MigrationInterface {

public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE site.s_product
      ADD COLUMN stock integer DEFAULT 0 NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE site.s_product
      DROP COLUMN stock
    `);
  }


}
