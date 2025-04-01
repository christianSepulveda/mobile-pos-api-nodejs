import { Category } from "../entities/category";

export type CategoryRepository = {
  save: (category: Category) => Promise<Category>;
  update: (category: Category) => Promise<Category>;
  findOne: (id: string) => Promise<Category | undefined>;
  findAll: () => Promise<Category[]>;
};
