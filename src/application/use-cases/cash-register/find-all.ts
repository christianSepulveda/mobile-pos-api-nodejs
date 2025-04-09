import { CashRegister } from "../../../domain/entities/cash-register";
import { CashRegisterRepository } from "../../../domain/repositories/cash-register-repository";

export class FindAllCashRegister {
  private cashRegisterRepository: CashRegisterRepository;

  constructor(cashRegisterRepository: CashRegisterRepository) {
    this.cashRegisterRepository = cashRegisterRepository;
  }

  async execute(categoryid: string): Promise<CashRegister[]> {
    const findedCashRegister = await this.cashRegisterRepository.findAll(
      categoryid
    );
    return findedCashRegister ?? undefined;
  }
}
