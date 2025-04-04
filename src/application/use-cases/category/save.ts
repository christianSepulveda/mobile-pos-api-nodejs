import { randomUUID } from "crypto";
import { Category } from "../../../domain/entities/category";
import { CategoryRepository } from "../../../domain/repositories/category-repository";

export class SaveCategory {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(category: Category): Promise<Category> {
    const id = randomUUID();

    const savedCategory = await this.categoryRepository.save({
      ...category,
      id,
    });
    return savedCategory;
  }
}
