import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL is not set. Please add it to .env.local');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  console.log('🏗️  Creating tables...\n');

  // Create products table
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      brand VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      category VARCHAR(100) NOT NULL,
      image_url TEXT DEFAULT '',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  console.log('✅ products table created');

  // Create newsletter_emails table
  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_emails (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  console.log('✅ newsletter_emails table created');

  // Clear existing products
  await sql`DELETE FROM products`;
  console.log('\n🧹 Cleared existing products');

  // Real products from luxuryuae.ae Shopify store
  const products = [
    {
      name: 'Premium Touch Conditioner 550ml',
      brand: 'FINO',
      price: 89.00,
      category: 'Hair Care',
      image_url: 'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/Fino_Premium_Touch_Conditioner_550ml_56a9ad74-ef7d-4797-83c2-6a4059477e58.avif?v=1782450845',
    },
    {
      name: 'Premium Touch Moisturizing Hair Shampoo 550ml',
      brand: 'FINO',
      price: 89.00,
      category: 'Hair Care',
      image_url: 'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/Shiseido_Fino_Premium_Touch_Shampoo_550ml.webp?v=1782450460',
    },
    {
      name: 'Premium Touch Hair Oil',
      brand: 'FINO',
      price: 99.00,
      category: 'Hair Care',
      image_url: 'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/Shiseido_Fino_Premium_Touch_Hair_Oil_70ml.webp?v=1782450522',
    },
    {
      name: 'Premium Touch Hair Mask 230g',
      brand: 'FINO',
      price: 82.00,
      category: 'Hair Care',
      image_url: 'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/Fino_Premium_Touch_Hair_Mask.webp?v=1782450494',
    },
    {
      name: 'Beard Wash 200ml — Wood and Spice',
      brand: 'PRORASO',
      price: 54.00,
      category: 'Grooming',
      image_url: 'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/ProrasoLuxury_Assets-01.png?v=1743577812',
    },
    {
      name: 'Beard Balm 100ml — Wood and Spice',
      brand: 'PRORASO',
      price: 48.00,
      category: 'Grooming',
      image_url: 'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/ProrasoLuxury_Assets-01.png?v=1743577812',
    },
    {
      name: 'Cinnamon Mint Concentrated Mouthwash',
      brand: 'MARVIS',
      price: 72.00,
      category: 'Oral Care',
      image_url: 'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/marvis-cinnamon-mint-mouthwash.jpg?v=1743577812',
    },
    {
      name: 'Cinnamon Mint Toothpaste 85ml',
      brand: 'MARVIS',
      price: 52.00,
      category: 'Oral Care',
      image_url: 'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/marvis-cinnamon-mint-toothpaste.jpg?v=1743577812',
    },
    {
      name: 'Amarelli Licorice Toothpaste 25ml',
      brand: 'MARVIS',
      price: 28.00,
      category: 'Oral Care',
      image_url: 'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/marvis-amarelli-licorice-25ml.jpg?v=1743577812',
    },
    {
      name: 'Ginger Mint Toothpaste 25ml',
      brand: 'MARVIS',
      price: 28.00,
      category: 'Oral Care',
      image_url: 'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/marvis-ginger-mint-25ml.jpg?v=1743577812',
    },
    {
      name: 'Jasmin Mint Toothpaste 25ml',
      brand: 'MARVIS',
      price: 28.00,
      category: 'Oral Care',
      image_url: 'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/marvis-jasmin-mint-25ml.jpg?v=1743577812',
    },
  ];

  console.log('\n🌱 Seeding products...\n');

  for (const product of products) {
    await sql`
      INSERT INTO products (name, brand, price, category, image_url)
      VALUES (${product.name}, ${product.brand}, ${product.price}, ${product.category}, ${product.image_url})
    `;
    console.log(`  ✅ ${product.brand} — ${product.name}`);
  }

  console.log(`\n🎉 Successfully seeded ${products.length} products!`);
  console.log('🗃️  Database is ready.\n');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
