import { Request, Response } from "express";
import { Company } from "../../domain/entities/company";

import { SaveCompany } from "../../application/use-cases/company/save";
import { UpdateCompany } from "../../application/use-cases/company/update";
import { FindCompany } from "../../application/use-cases/company/find";
import { CompanyService } from "../../infrastructure/services/company-service";
import passwordEncryption from "../helpers/password-encryption";
import { IsValidAdminCode } from "../../application/use-cases/company/is-valid-admin-code";
import { BuildResponse } from "../helpers/build-response";

const companyService = new CompanyService();
const saveCompany = new SaveCompany(companyService);
const updateCompany = new UpdateCompany(companyService);
const findCompany = new FindCompany(companyService);
const isValidAdminCode = new IsValidAdminCode(companyService);

export class CompanyController {
  async save(req: Request, res: Response): Promise<void> {
    try {
      const company = req.body as Company;
      const encriptedPassword = await passwordEncryption(company.adminCode);

      if (!encriptedPassword) {
        BuildResponse.error(res, new Error("Error al encriptar la contraseña"));
        return;
      }

      const newCompany = await saveCompany.execute({
        ...company,
        adminCode: encriptedPassword,
      });

      BuildResponse.success(res, newCompany);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const company = req.body as Company;
      const encriptedPassword = await passwordEncryption(company.adminCode);

      if (!encriptedPassword) {
        BuildResponse.error(res, new Error("Error al encriptar la contraseña"));
        return;
      }

      const updatedCompany = await updateCompany.execute({
        ...company,
        adminCode: encriptedPassword,
      });

      BuildResponse.success(res, updatedCompany);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async find(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const findedCompany = await findCompany.execute(id);

      if (!findedCompany) {
        BuildResponse.error(res, new Error("Company not found"));
        return;
      }

      BuildResponse.success(res, findedCompany);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async isValidAdminCode(req: Request, res: Response): Promise<void> {
    try {
      const { companyid, adminCode } = req.body;
      const isValid = await isValidAdminCode.execute(companyid, adminCode);

      BuildResponse.success(res, { isValid });
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }
}
