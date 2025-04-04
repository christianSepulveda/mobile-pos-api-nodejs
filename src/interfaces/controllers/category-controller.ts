import { Request, Response } from "express";
import { FindAllCategories } from "../../application/use-cases/category/find-all";
import { FindCategory } from "../../application/use-cases/category/find-one";
import { SaveCategory } from "../../application/use-cases/category/save";
import { UpdateCategory } from "../../application/use-cases/category/update";
import { Category } from "../../domain/entities/category";
import { CategoryService } from "../../infrastructure/services/category-service";

const categoryService = new CategoryService();
const saveCategory = new SaveCategory(categoryService);
const updateCategory = new UpdateCategory(categoryService);
const findCategory = new FindCategory(categoryService);
const findAllCategories = new FindAllCategories(categoryService);

export class CategoryController {
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
      const { category, companyid } = req.body;
      const newCategory = await saveCategory.execute(category);

      res.status(200).json(newCategory);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const category = req.body as Category;
      const updatedCategory = await updateCategory.execute(category);
      res.status(200).json(updatedCategory);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const findedCategory = await findCategory.execute(id);

      if (!findedCategory) {
        const { status, json } = this.handleError(
          new Error("Categoría no encontrada")
        );

        res.status(status).json(json);
      }

      res.status(200).json(findedCategory);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { companyid } = req.body;

      const categories = await findAllCategories.execute(companyid);
      res.status(200).json(categories);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }
}
