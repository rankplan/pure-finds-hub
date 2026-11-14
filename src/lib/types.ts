export type Category = "all" | "soap" | "tallow-cream" | "toothpaste" | "textile";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  pricePerLb?: number;
  shippingCost?: number;
  country: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  weight?: string;
  rating?: number;
}

export type SortField = "price" | "pricePerLb" | "priceInclShipping" | "name";
export type SortDirection = "asc" | "desc";
