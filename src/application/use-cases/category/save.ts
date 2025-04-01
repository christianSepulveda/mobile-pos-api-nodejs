import { Category } from "../../../domain/entities/category";
import { CategoryRepository } from "../../../domain/repositories/category-repository";

export class SaveCategory {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(category: Category): Promise<Category> {
    const savedCategory = await this.categoryRepository.save(category);
    return savedCategory;
  }
}
