import { Category } from "../../../domain/entities/category";
import { CategoryRepository } from "../../../domain/repositories/category-repository";

export class FindCategory {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(id: string): Promise<Category | undefined> {
    const findedCategory = await this.categoryRepository.findOne(id);
    return findedCategory;
  }
}
