import { Company } from "../entities/company";

export type CompanyRepository = {
  save: (company: Company) => Promise<Company>;
  update: (company: Company) => Promise<Company>;
  find: (id: string) => Promise<Company | undefined>;
  isValidAdminCode: (companyid: string, adminCode: string) => Promise<boolean>;
};
