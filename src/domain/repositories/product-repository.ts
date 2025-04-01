import { Product } from "../entities/product";

export type ProductRepository = {
  save: (product: Product) => Promise<Product>;
  update: (product: Product) => Promise<Product>;
  findOne: (id: string) => Promise<Product | undefined>;
  findAll: () => Promise<Product[]>;
};
