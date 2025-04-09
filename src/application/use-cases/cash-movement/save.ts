import { randomUUID } from "crypto";
import { CashMovement } from "../../../domain/entities/cash-movement";
import { CashMovementRepository } from "../../../domain/repositories/cash-movement-repository";

export class SaveCashMovement {
  constructor(private cashMovementRepository: CashMovementRepository) {}

  async execute(cashMovement: CashMovement): Promise<CashMovement> {
    const id = randomUUID();

    const cashMovementSaved = await this.cashMovementRepository.save({
      ...cashMovement,
      id,
    });
    return cashMovementSaved;
  }
}
