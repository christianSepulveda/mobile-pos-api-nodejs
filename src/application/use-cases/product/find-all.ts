import { ProductRepository } from "../../../domain/repositories/product-repository";
import { Product } from "../../../domain/entities/product";

export class FindAllProducts {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(companyid: string): Promise<Product[]> {
    const newCompany = await this.productRepository.findAll(companyid);
    return newCompany;
  }
}
