import { CashMovement } from "../../domain/entities/cash-movement";
import { CashMovementRepository } from "../../domain/repositories/cash-movement-repository";
import CashMovementModel from "../database/models/cash-movement";

export class CashMovementService implements CashMovementRepository {
  async save(cashMovement: CashMovement): Promise<CashMovement> {
    console.log("movement", cashMovement);

    try {
      const newCashMovement = await CashMovementModel.create({
        ...cashMovement,
      });
      return newCashMovement;
    } catch (error) {
      console.log("error", error);
      throw new Error("Error al guardar el movimiento de caja");
    }
  }

  async update(cashMovement: CashMovement): Promise<CashMovement> {
    const condition = { where: { id: cashMovement.id } };

    const findedCashMovement = await CashMovementModel.findOne(condition);
    if (!findedCashMovement) throw new Error("El movimiento de caja no existe");

    const updatedCashMovement = await CashMovementModel.update(
      cashMovement,
      condition
    );

    if (!updatedCashMovement)
      throw new Error("Error al actualizar el movimiento de caja");

    return cashMovement;
  }

  async findAll(cashRegisterId: string): Promise<CashMovement[]> {
    const condition = { where: { cashRegisterId } };
    const cashMovements = await CashMovementModel.findAll(condition);
    return cashMovements;
  }
}
