import { Request, Response } from "express";
import { FindAllCategories } from "../../application/use-cases/category/find-all";
import { FindCategory } from "../../application/use-cases/category/find-one";
import { SaveCategory } from "../../application/use-cases/category/save";
import { UpdateCategory } from "../../application/use-cases/category/update";
import { Category } from "../../domain/entities/category";
import { CategoryService } from "../../infrastructure/services/category-service";
import { BuildResponse } from "../helpers/build-response";

const categoryService = new CategoryService();
const saveCategory = new SaveCategory(categoryService);
const updateCategory = new UpdateCategory(categoryService);
const findCategory = new FindCategory(categoryService);
const findAllCategories = new FindAllCategories(categoryService);

export class CategoryController {
  async save(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.body;
      const newCategory = await saveCategory.execute(category);

      BuildResponse.success(res, newCategory);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const category = req.body as Category;
      const updatedCategory = await updateCategory.execute(category);
      BuildResponse.success(res, updatedCategory);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const findedCategory = await findCategory.execute(id);

      if (!findedCategory) {
        BuildResponse.error(res, new Error("Categoría no encontrada"));
        return;
      }

      BuildResponse.success(res, findedCategory);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { companyid } = req.body;

      const categories = await findAllCategories.execute(companyid);
      BuildResponse.success(res, categories);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }
}
