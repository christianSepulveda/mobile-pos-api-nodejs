import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/product-repository";
import ProductModel from "../database/models/product";

export class ProductService implements ProductRepository {
  async save(product: Product, companyid: string): Promise<Product> {
    const condition = {
      where: {
        name: product.name,
        category_id: product.category_id,
        companyid,
      },
    };

    const productExists = await ProductModel.findOne(condition);
    if (productExists) throw new Error("El producto ya existe");

    const newProduct = await ProductModel.create({ ...product, companyid });
    if (!newProduct) throw new Error("Error creando el producto");

    return newProduct;
  }

  async update(product: Product, companyid: string): Promise<Product> {
    const condition = { where: { id: product.id, companyid } };

    const productExists = await ProductModel.findOne(condition);
    if (!productExists) throw new Error("El producto no existe");

    const updatedProduct = await ProductModel.update(
      { ...product, companyid },
      condition
    );
    if (!updatedProduct) throw new Error("Error actualizando el producto");

    return product;
  }

  async findOne(id: string): Promise<any | undefined> {
    const productExists = await ProductModel.findOne({ where: { id } });
    return productExists ?? undefined;
  }
  async findAll(companyid: string): Promise<Product[]> {
    const products = await ProductModel.findAll({ where: { companyid } });
    return products;
  }
}
