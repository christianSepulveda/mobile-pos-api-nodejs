import { ProductRepository } from "../../../domain/repositories/product-repository";
import { Product } from "../../../domain/entities/product";

export class FindAllProducts {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<Product[]> {
    const newCompany = await this.productRepository.findAll();
    return newCompany;
  }
}
