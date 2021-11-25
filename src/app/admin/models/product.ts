export interface Product {
  id?: string;
  name: string;
  image?: string;
  category: string;
  sizes: Array<{ id?: string, name: string, price: number }>;
  description: string;
}
