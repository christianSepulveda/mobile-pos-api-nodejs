import { Category } from "../../../domain/entities/category";
import { CategoryRepository } from "../../../domain/repositories/category-repository";

export class FindAllCategories {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(categoryid: string): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll(categoryid);
    return categories;
  }
}
