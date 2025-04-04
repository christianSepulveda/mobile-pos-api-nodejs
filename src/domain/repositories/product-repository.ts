import { Product } from "../entities/product";

export type ProductRepository = {
  save: (product: Product, companyid: string) => Promise<Product>;
  update: (product: Product, companyid: string) => Promise<Product>;
  findOne: (id: string) => Promise<Product | undefined>;
  findAll: (companyid: string) => Promise<Product[]>;
};
