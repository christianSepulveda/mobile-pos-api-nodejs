import bcrypt from "bcrypt";
import { Company } from "../../domain/entities/company";
import { CompanyRepository } from "../../domain/repositories/company-repository";

import CompanyModel from "../database/models/company";

export class CompanyService implements CompanyRepository {
  async save(company: Company): Promise<Company> {
    const condition = { where: { id: company.id } };

    const companyExists = await CompanyModel.findOne(condition);
    if (companyExists) throw new Error("Company already exists");

    const newCompany = await CompanyModel.create({ ...company });
    if (!newCompany) throw new Error("Error creating company");

    return newCompany;
  }

  async update(company: Company): Promise<Company> {
    const condition = { where: { id: company.id } };

    const companyExists = await CompanyModel.findOne(condition);
    if (!companyExists) throw new Error("Company not found");

    const updatedCompany = await CompanyModel.update(company, condition);
    if (!updatedCompany) throw new Error("Error updating company");

    return company;
  }

  async find(id: string): Promise<Company | undefined> {
    const companyExists = await CompanyModel.findOne({ where: { id } });
    return companyExists ?? undefined;
  }

  async isValidAdminCode(
    companyid: string,
    adminCode: string
  ): Promise<boolean> {
    const company = await CompanyModel.findOne({ where: { id: companyid } });
    if (!company) return false;

    const isValid = await bcrypt.compare(adminCode, company.adminCode);
    return isValid;
  }
}
