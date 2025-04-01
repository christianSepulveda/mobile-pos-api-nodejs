import { Request, Response } from "express";
import { Company } from "../../domain/entities/company";

import { SaveCompany } from "../../application/use-cases/company/save";
import { UpdateCompany } from "../../application/use-cases/company/update";
import { FindCompany } from "../../application/use-cases/company/find";
import { CompanyService } from "../../infrastructure/services/company-service";

const companyService = new CompanyService();
const saveCompany = new SaveCompany(companyService);
const updateCompany = new UpdateCompany(companyService);
const findCompany = new FindCompany(companyService);

export class CompanyController {
  constructor() {
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.find = this.find.bind(this);
  }

  handleError(error: Error) {
    const status = 500;
    const errorMessage = (error as Error).message;
    const json = { error: true, message: errorMessage, code: status };

    return { status, json };
  }

  async save(req: Request, res: Response): Promise<void> {
    try {
      const company = req.body as Company;
      const newCompany = await saveCompany.execute(company);

      res.status(200).json(newCompany);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const company = req.body as Company;
      const updatedCompany = await updateCompany.execute(company);
      res.status(200).json(updatedCompany);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }
  async find(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const findedCompany = await findCompany.execute(id);

      if (!findedCompany) {
        const { status, json } = this.handleError(
          new Error("Company not found")
        );

        res.status(status).json(json);
      }

      res.status(200).json(findedCompany);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }
}
