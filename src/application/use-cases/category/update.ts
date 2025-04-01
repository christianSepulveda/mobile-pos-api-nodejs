import { Category } from "../../../domain/entities/category";
import { CategoryRepository } from "../../../domain/repositories/category-repository";

export class UpdateCategory {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(category: Category): Promise<Category | undefined> {
    const updatedCategory = await this.categoryRepository.update(category);
    return updatedCategory;
  }
}
