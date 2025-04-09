import { CashMovement } from "../entities/cash-movement";

export interface CashMovementRepository {
  save(cashMovement: CashMovement): Promise<CashMovement>;
  update(cashMovement: CashMovement): Promise<CashMovement>;
  findAll(cashRegisterId: string): Promise<CashMovement[]>;
}
