import { Request, Response } from "express";
import { FindAllProducts } from "../../application/use-cases/product/find-all";
import { FindOneProduct } from "../../application/use-cases/product/find-one";
import { SaveProduct } from "../../application/use-cases/product/save";
import { UpdateProduct } from "../../application/use-cases/product/update";
import { ProductService } from "../../infrastructure/services/product-service";

const productService = new ProductService();
const saveProduct = new SaveProduct(productService);
const updateProduct = new UpdateProduct(productService);
const findProduct = new FindOneProduct(productService);
const findAllProducts = new FindAllProducts(productService);

export class ProductController {
  constructor() {
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.findOne = this.findOne.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  handleError(error: Error) {
    const status = 500;
    const errorMessage = (error as Error).message;
    const json = { error: true, message: errorMessage, code: status };

    return { status, json };
  }

  async save(req: Request, res: Response): Promise<void> {
    try {
      const { product, companyid } = req.body;
      const newProduct = await saveProduct.execute(product, companyid);

      res.status(200).json(newProduct);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { product, companyid } = req.body;
      const updatedProduct = await updateProduct.execute(product, companyid);
      res.status(200).json(updatedProduct);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const findedProduct = await findProduct.execute(id);

      if (!findedProduct) {
        const { status, json } = this.handleError(
          new Error("Producto no encontrado")
        );

        res.status(status).json(json);
      }

      res.status(200).json(findedProduct);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { companyid } = req.body;
      const products = await findAllProducts.execute(companyid);

      if (!products) {
        const { status, json } = this.handleError(
          new Error("No hay productos")
        );

        res.status(status).json(json);
      }

      res.status(200).json(products);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }
}
