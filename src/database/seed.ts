import { MigrationDataSource } from './migration-data-source';
import { User } from '../users/user.entity';
import { Product } from '../products/products.entity';
import { Order } from '../orders/orders.entity';
import { OrderItem } from '../order-items/order-items.entity';

async function seed() {
    await MigrationDataSource.initialize();

    // Очистка всіх таблиць (каскадно)
    const queryRunner = MigrationDataSource.createQueryRunner();
    await queryRunner.query(`
    TRUNCATE TABLE 
      "site"."s_order_item", 
      "site"."s_order", 
      "site"."s_product", 
      "site"."s_user"
    RESTART IDENTITY CASCADE
  `);
    await queryRunner.release();

    // Користувачі
    const users = await MigrationDataSource.getRepository(User).save([
        { name: 'Admin', email: 'admin@example.com', password: '12345' },
        { name: 'Test User', email: 'user@example.com', password: '12345' },
        { name: 'Alice', email: 'alice@example.com', password: '12345' },
        { name: 'Bob', email: 'bob@example.com', password: '12345' },
        { name: 'Charlie', email: 'charlie@example.com', password: '12345' },
    ]);

    // Продукти
    const products = await MigrationDataSource.getRepository(Product).save([
        { name: 'Laptop Lenovo', price: 1200 },
        { name: 'Smartphone Samsung', price: 800 },
        { name: 'Tablet Apple iPad', price: 1000 },
        { name: 'Monitor LG 27"', price: 400 },
        { name: 'Keyboard Logitech', price: 100 },
        { name: 'Mouse Razer', price: 80 },
        { name: 'Headphones Sony', price: 150 },
        { name: 'Smartwatch Garmin', price: 250 },
    ]);

    // Замовлення для кожного користувача
    for (const user of users) {
        const order = await MigrationDataSource.getRepository(Order).save({
            userId: user.id,
            total: 0, // перерахуємо нижче
        });

        // Додаємо випадкові товари у замовлення
        const items: Partial<OrderItem>[] = [];
        let total = 0;

        for (let i = 0; i < 3; i++) {
            const product = products[Math.floor(Math.random() * products.length)];
            const quantity = Math.floor(Math.random() * 3) + 1;
            const price = product.price * quantity;
            total += price;

            items.push({
                order: order,       // зв’язок ManyToOne
                product: product,   // зв’язок ManyToOne
                quantity,
                price,
            });
        }

        await MigrationDataSource.getRepository(OrderItem).save(items);

        await MigrationDataSource.getRepository(OrderItem).save(items);

        await MigrationDataSource.getRepository(OrderItem).save(items);

        // Оновлюємо total замовлення
        order.total = total;
        await MigrationDataSource.getRepository(Order).save(order);
    }

    await MigrationDataSource.destroy();
}

seed();