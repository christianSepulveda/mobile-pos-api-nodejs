import { randomUUID } from "crypto";
import { Category } from "../../domain/entities/category";
import { CategoryRepository } from "../../domain/repositories/category-repository";
import CategoryModel from "../database/models/category";

export class CategoryService implements CategoryRepository {
  async save(category: Category): Promise<Category> {
    const condition = { where: { name: category.name } };

    const categoryExists = await CategoryModel.findOne(condition);
    if (categoryExists) throw new Error("La categoría ya existe");

    const categoryId = randomUUID();
    const formattedCategory = { id: categoryId, ...category };

    const newCategory = await CategoryModel.create({ ...formattedCategory });
    if (!newCategory) throw new Error("Error al crear la categoría");

    return newCategory;
  }

  async update(category: Category): Promise<Category> {
    const condition = { where: { id: category.id } };

    const categoryExists = await CategoryModel.findOne(condition);
    if (!categoryExists) throw new Error("La categoría no existe");

    const updatedCategory = await CategoryModel.update(category, condition);
    if (!updatedCategory) throw new Error("Error al actualizar la categoría");

    return category;
  }

  async findOne(id: string): Promise<Category | undefined> {
    const categoryExists = await CategoryModel.findOne({ where: { id } });
    return categoryExists ?? undefined;
  }

  async findAll(): Promise<Category[]> {
    const categories = await CategoryModel.findAll();
    return categories;
  }
}
