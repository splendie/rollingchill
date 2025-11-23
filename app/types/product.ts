export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: 'apparel' | 'accessories' | 'safety' | 'skates';
  inStock: boolean;
  isNew?: boolean;
  colors?: string[]; // Available colors for this product
  sizes?: string[]; // Available sizes (S, M, L, XL, etc.)
  materials?: string[]; // Available materials (Cotton combed, Drifit, etc.)
}

export interface ProductFilters {
  category: string;
  selectedColors: string[];
  selectedSize: string;
  selectedMaterial: string;
  showNewOnly: boolean;
}
