import { Request, Response } from "express";
import { FinAllCashMovement } from "../../application/use-cases/cash-movement/find-all";
import { SaveCashMovement } from "../../application/use-cases/cash-movement/save";
import { UpdateCashMovement } from "../../application/use-cases/cash-movement/update";
import { CashMovementService } from "../../infrastructure/services/cash-movement-service";

const cashMovementService = new CashMovementService();
const saveCashMovement = new SaveCashMovement(cashMovementService);
const updateCashMovement = new UpdateCashMovement(cashMovementService);
const findCashMovement = new FinAllCashMovement(cashMovementService);

export class CashMovementController {
  constructor() {
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  handleError(error: Error) {
    const status = 500;
    const errorMessage = (error as Error).message;
    const json = { error: true, message: errorMessage, code: status };

    return { status, json };
  }

  async save(req: Request, res: Response): Promise<void> {
    try {
      const cashMovement = req.body;
      const newCashMovement = await saveCashMovement.execute(cashMovement);

      res.status(200).json(newCashMovement);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const cashRegister = req.body;
      const updatedCashMovement = await updateCashMovement.execute(
        cashRegister
      );
      res.status(200).json(updatedCashMovement);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { cashRegisterId } = req.body;
      const cashRegisters = await findCashMovement.execute(cashRegisterId);
      res.status(200).json(cashRegisters);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }
}
