import { Category } from "../../../domain/entities/category";
import { CategoryRepository } from "../../../domain/repositories/category-repository";

export class FindAllCategories {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }
}
