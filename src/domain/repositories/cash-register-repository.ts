import { CashRegister } from "../entities/cash-register";

export type CashRegisterRepository = {
  save: (cashRegister: CashRegister) => Promise<CashRegister>;
  update: (cashRegister: CashRegister) => Promise<CashRegister>;
  findOne: (id: string) => Promise<CashRegister | undefined>;
  findAll: (companyid: string) => Promise<CashRegister[]>;
};
