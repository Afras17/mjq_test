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
    price: 54.0,
    category: 'Grooming',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/ProrasoLuxury_Assets-02.png?v=1743577812',
    created_at: new Date().toISOString(),
  },
  {
    id: 7,
    name: 'Cinnamon Mint Mouthwash 120ml',
    brand: 'MARVIS',
    price: 70.0,
    category: 'Oral Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/411059_MARVIS_MOUTHWASH_CINNAMONMINT_120ML_F_RGB_1.jpg?v=1708412050',
    created_at: new Date().toISOString(),
  },
  {
    id: 8,
    name: 'Cinnamon Mint Toothpaste 75ml',
    brand: 'MARVIS',
    price: 47.0,
    category: 'Oral Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/411176_MARVIS_CINNAMON_85ML_F_T_ZENITALE.png?v=1708406675',
    created_at: new Date().toISOString(),
  },
  {
    id: 9,
    name: 'Sensitive Gum Mint Toothpaste 75ml',
    brand: 'MARVIS',
    price: 57.0,
    category: 'Oral Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/411242_MARVIS_SENSITIVE_GUMS_GENTLE_MINT_75ML_F_T_ZENITALE.png?v=1708410501',
    created_at: new Date().toISOString(),
  },
  {
    id: 10,
    name: 'Ginger Mint Toothpaste 75ml',
    brand: 'MARVIS',
    price: 47.0,
    category: 'Oral Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/411173_MARVIS_GINGER_85ML_F_T_ZENITALE2.png?v=1708377688',
    created_at: new Date().toISOString(),
  },
  {
    id: 11,
    name: 'Amarelli Licorice Mint Toothpaste 25ml',
    brand: 'MARVIS',
    price: 31.0,
    category: 'Oral Care',
    image_url:
      'https://cdn.shopify.com/s/files/1/0861/7954/5363/files/comp411134_MARVIS_LICORICE_25ML_F_T_1.png?v=1708376191',
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
