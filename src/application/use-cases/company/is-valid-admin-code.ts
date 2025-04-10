import { Company } from "../../../domain/entities/company";
import { CompanyRepository } from "../../../domain/repositories/company-repository";

export class IsValidAdminCode {
  private companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(companyid: string, adminCode: string): Promise<boolean> {
    const isValid = await this.companyRepository.isValidAdminCode(
      companyid,
      adminCode
    );

    return isValid;
  }
}
