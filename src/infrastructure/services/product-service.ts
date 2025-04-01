import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/product-repository";
import ProductModel from "../database/models/product";

export class ProductService implements ProductRepository {
  async save(product: Product): Promise<Product> {
    const condition = {
      where: { name: product.name, category_id: product.category_id },
    };

    const productExists = await ProductModel.findOne(condition);
    if (productExists) throw new Error("El producto ya existe");

    const newProduct = await ProductModel.create({ ...product });
    if (!newProduct) throw new Error("Error creando el producto");

    return newProduct;
  }

  async update(product: any): Promise<Product> {
    const condition = { where: { id: product.id } };

    const productExists = await ProductModel.findOne(condition);
    if (!productExists) throw new Error("El producto no existe");

    const updatedProduct = await ProductModel.update(product, condition);
    if (!updatedProduct) throw new Error("Error actualizando el producto");

    return product;
  }

  async findOne(id: string): Promise<any | undefined> {
    const productExists = await ProductModel.findOne({ where: { id } });
    return productExists ?? undefined;
  }
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products;
  }
}
