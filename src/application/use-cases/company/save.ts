import { randomUUID } from "crypto";
import { Company } from "../../../domain/entities/company";
import { CompanyRepository } from "../../../domain/repositories/company-repository";

export class SaveCompany {
  private companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(company: Company): Promise<Company> {
    const id = randomUUID();
    const newCompany = await this.companyRepository.save({ id, ...company });
    return newCompany;
  }
}
