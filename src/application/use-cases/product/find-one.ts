import { ProductRepository } from "../../../domain/repositories/product-repository";
import { Product } from "../../../domain/entities/product";

export class FindOneProduct {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string): Promise<Product | undefined> {
    const newCompany = await this.productRepository.findOne(id);
    return newCompany ?? undefined;
  }
}
