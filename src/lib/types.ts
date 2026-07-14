export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  image_url: string;
  created_at: string;
}

export interface NewsletterEmail {
  id: number;
  email: string;
  created_at: string;
}

export type Category = {
  name: string;
  slug: string;
  image: string;
  description: string;
};
