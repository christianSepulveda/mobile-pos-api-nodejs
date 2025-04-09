import { CashRegister } from "../../../domain/entities/cash-register";
import { CashRegisterRepository } from "../../../domain/repositories/cash-register-repository";

export class UpdateCashRegister {
  private cashRegisterRepository: CashRegisterRepository;

  constructor(cashRegisterRepository: CashRegisterRepository) {
    this.cashRegisterRepository = cashRegisterRepository;
  }

  async execute(cashRegister: CashRegister): Promise<CashRegister> {
    const savedCashRegister = await this.cashRegisterRepository.update(
      cashRegister
    );
    return savedCashRegister;
  }
}
