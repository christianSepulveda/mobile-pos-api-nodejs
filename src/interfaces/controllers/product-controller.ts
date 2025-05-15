import { Request, Response } from "express";
import { FindAllProducts } from "../../application/use-cases/product/find-all";
import { FindOneProduct } from "../../application/use-cases/product/find-one";
import { SaveProduct } from "../../application/use-cases/product/save";
import { UpdateProduct } from "../../application/use-cases/product/update";
import { ProductService } from "../../infrastructure/services/product-service";
import { BuildResponse } from "../helpers/build-response";

const productService = new ProductService();
const saveProduct = new SaveProduct(productService);
const updateProduct = new UpdateProduct(productService);
const findProduct = new FindOneProduct(productService);
const findAllProducts = new FindAllProducts(productService);

export class ProductController {
  async save(req: Request, res: Response): Promise<void> {
    try {
      const { product, companyid } = req.body;
      const newProduct = await saveProduct.execute(product, companyid);

      BuildResponse.success(res, newProduct);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { product, companyid } = req.body;
      const updatedProduct = await updateProduct.execute(product, companyid);
      BuildResponse.success(res, updatedProduct);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const findedProduct = await findProduct.execute(id);

      if (!findedProduct) {
        BuildResponse.error(res, new Error("Producto no encontrado"));
        return;
      }

      BuildResponse.success(res, findedProduct);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { companyid } = req.body;
      const products = await findAllProducts.execute(companyid);

      if (!products) {
        BuildResponse.error(res, new Error("No hay productos"));
        return;
      }

      BuildResponse.success(res, products);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }
}
