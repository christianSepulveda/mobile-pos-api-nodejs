import { ProductRepository } from "../../../domain/repositories/product-repository";
import { Product } from "../../../domain/entities/product";

export class UpdateProduct {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(product: Product): Promise<Product> {
    const newCompany = await this.productRepository.update(product);
    return newCompany;
  }
}
