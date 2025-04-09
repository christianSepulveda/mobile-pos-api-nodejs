import { Request, Response } from "express";
import { FindAllCashRegister } from "../../application/use-cases/cash-register/find-all";
import { FindOneCashRegister } from "../../application/use-cases/cash-register/find-one";
import { SaveCashRegister } from "../../application/use-cases/cash-register/save";
import { UpdateCashRegister } from "../../application/use-cases/cash-register/update";
import { CashRegister } from "../../domain/entities/cash-register";
import { CashRegisterService } from "../../infrastructure/services/cash-register-service";

const cashRegisterService = new CashRegisterService();
const saveCashRegister = new SaveCashRegister(cashRegisterService);
const updateCashRegister = new UpdateCashRegister(cashRegisterService);
const findCashRegister = new FindOneCashRegister(cashRegisterService);
const findAllCashRegisters = new FindAllCashRegister(cashRegisterService);

export class CashRegisterController {
  constructor() {
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.findOne = this.findOne.bind(this);
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
      const cashRegister = req.body;
      const newCashRegister = await saveCashRegister.execute(cashRegister);

      res.status(200).json(newCashRegister);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const cashRegister = req.body as CashRegister;
      const updatedCashRegister = await updateCashRegister.execute(
        cashRegister
      );
      res.status(200).json(updatedCashRegister);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const foundCashRegister = await findCashRegister.execute(id);

      if (!foundCashRegister) {
        const { status, json } = this.handleError(
          new Error("Cash register not found")
        );

        res.status(status).json(json);
      }

      res.status(200).json(foundCashRegister);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { companyid } = req.body;
      const cashRegisters = await findAllCashRegisters.execute(companyid);
      res.status(200).json(cashRegisters);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }
}
