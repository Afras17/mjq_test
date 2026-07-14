import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Real products from luxuryuae.ae — used as fallback when no DB is configured
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Touch Conditioner 550ml',
    brand: 'FINO',
    price: 89.0,
    category: 'Hair Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/Fino_Premium_Touch_Conditioner_550ml_56a9ad74-ef7d-4797-83c2-6a4059477e58.avif?v=1782450845',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Premium Touch Moisturizing Hair Shampoo 550ml',
    brand: 'FINO',
    price: 89.0,
    category: 'Hair Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/Shiseido_Fino_Premium_Touch_Shampoo_550ml.webp?v=1782450460',
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Premium Touch Hair Oil',
    brand: 'FINO',
    price: 99.0,
    category: 'Hair Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/Shiseido_Fino_Premium_Touch_Hair_Oil_70ml.webp?v=1782450522',
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Premium Touch Hair Mask 230g',
    brand: 'FINO',
    price: 82.0,
    category: 'Hair Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/Fino_Premium_Touch_Hair_Mask.webp?v=1782450494',
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Beard Wash 200ml — Wood and Spice',
    brand: 'PRORASO',
    price: 54.0,
    category: 'Grooming',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/ProrasoLuxury_Assets-01.png?v=1743577812',
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: 'Beard Balm 100ml — Wood and Spice',
    brand: 'PRORASO',
    price: 48.0,
    category: 'Grooming',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/ProrasoLuxury_Assets-01.png?v=1743577812',
    created_at: new Date().toISOString(),
  },
  {
    id: 7,
    name: 'Cinnamon Mint Concentrated Mouthwash',
    brand: 'MARVIS',
    price: 72.0,
    category: 'Oral Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/marvis-cinnamon-mint-mouthwash.jpg?v=1743577812',
    created_at: new Date().toISOString(),
  },
  {
    id: 8,
    name: 'Cinnamon Mint Toothpaste 85ml',
    brand: 'MARVIS',
    price: 52.0,
    category: 'Oral Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/marvis-cinnamon-mint-toothpaste.jpg?v=1743577812',
    created_at: new Date().toISOString(),
  },
  {
    id: 9,
    name: 'Amarelli Licorice Toothpaste 25ml',
    brand: 'MARVIS',
    price: 28.0,
    category: 'Oral Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/marvis-amarelli-licorice-25ml.jpg?v=1743577812',
    created_at: new Date().toISOString(),
  },
  {
    id: 10,
    name: 'Ginger Mint Toothpaste 25ml',
    brand: 'MARVIS',
    price: 28.0,
    category: 'Oral Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/marvis-ginger-mint-25ml.jpg?v=1743577812',
    created_at: new Date().toISOString(),
  },
  {
    id: 11,
    name: 'Jasmin Mint Toothpaste 25ml',
    brand: 'MARVIS',
    price: 28.0,
    category: 'Oral Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/marvis-jasmin-mint-25ml.jpg?v=1743577812',
    created_at: new Date().toISOString(),
  },
];

export async function GET() {
  // If no DATABASE_URL is configured, return sample products
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ products: SAMPLE_PRODUCTS }, { status: 200 });
  }

  try {
    const { getDb } = await import('@/lib/db');
    const sql = getDb();

    const products = await sql`
      SELECT id, name, brand, price, category, image_url, created_at
      FROM products
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ products }, { status: 200 });
  } catch (error: unknown) {
    console.error('Failed to fetch products:', error);

    // For any DB error, fall back to sample products so the UI works
    return NextResponse.json({ products: SAMPLE_PRODUCTS }, { status: 200 });
  }
}
