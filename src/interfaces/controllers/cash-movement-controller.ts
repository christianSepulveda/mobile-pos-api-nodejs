import { Request, Response } from "express";
import { FinAllCashMovement } from "../../application/use-cases/cash-movement/find-all";
import { SaveCashMovement } from "../../application/use-cases/cash-movement/save";
import { UpdateCashMovement } from "../../application/use-cases/cash-movement/update";
import { CashMovementService } from "../../infrastructure/services/cash-movement-service";
import { BuildResponse } from "../helpers/build-response";

const cashMovementService = new CashMovementService();
const saveCashMovement = new SaveCashMovement(cashMovementService);
const updateCashMovement = new UpdateCashMovement(cashMovementService);
const findCashMovement = new FinAllCashMovement(cashMovementService);

export class CashMovementController {
  async save(req: Request, res: Response): Promise<void> {
    try {
      const cashMovement = req.body;
      const newCashMovement = await saveCashMovement.execute(cashMovement);

      BuildResponse.success(res, newCashMovement);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const cashRegister = req.body;
      const updatedCashMovement = await updateCashMovement.execute(
        cashRegister
      );
      BuildResponse.success(res, updatedCashMovement);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { cashRegisterId } = req.body;
      const cashRegisters = await findCashMovement.execute(cashRegisterId);
      BuildResponse.success(res, cashRegisters);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }
}
