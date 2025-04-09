import { CashRegister } from "../../../domain/entities/cash-register";
import { CashRegisterRepository } from "../../../domain/repositories/cash-register-repository";

export class FindOneCashRegister {
  private cashRegisterRepository: CashRegisterRepository;

  constructor(cashRegisterRepository: CashRegisterRepository) {
    this.cashRegisterRepository = cashRegisterRepository;
  }

  async execute(id: string): Promise<CashRegister | undefined> {
    const findedCashRegister = await this.cashRegisterRepository.findOne(id);
    return findedCashRegister ?? undefined;
  }
}
