import { randomUUID } from "crypto";
import { ProductRepository } from "../../../domain/repositories/product-repository";
import { Product } from "../../../domain/entities/product";

export class SaveProduct {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(product: Product): Promise<Product> {
    const id = randomUUID();
    const newCompany = await this.productRepository.save({ id, ...product });
    return newCompany;
  }
}
