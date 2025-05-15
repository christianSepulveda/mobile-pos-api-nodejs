import { Request, Response } from "express";
import { FindAllCashRegister } from "../../application/use-cases/cash-register/find-all";
import { FindOneCashRegister } from "../../application/use-cases/cash-register/find-one";
import { SaveCashRegister } from "../../application/use-cases/cash-register/save";
import { UpdateCashRegister } from "../../application/use-cases/cash-register/update";
import { CashRegister } from "../../domain/entities/cash-register";
import { CashRegisterService } from "../../infrastructure/services/cash-register-service";
import { BuildResponse } from "../helpers/build-response";

const cashRegisterService = new CashRegisterService();
const saveCashRegister = new SaveCashRegister(cashRegisterService);
const updateCashRegister = new UpdateCashRegister(cashRegisterService);
const findCashRegister = new FindOneCashRegister(cashRegisterService);
const findAllCashRegisters = new FindAllCashRegister(cashRegisterService);

export class CashRegisterController {
  async save(req: Request, res: Response): Promise<void> {
    try {
      const cashRegister = req.body;
      const newCashRegister = await saveCashRegister.execute(cashRegister);

      BuildResponse.success(res, newCashRegister);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const cashRegister = req.body as CashRegister;
      const updatedCashRegister = await updateCashRegister.execute(
        cashRegister
      );
      BuildResponse.success(res, updatedCashRegister);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const foundCashRegister = await findCashRegister.execute(id);

      if (!foundCashRegister) {
        BuildResponse.error(res, new Error("Cash register not found"));
        return;
      }

      BuildResponse.success(res, foundCashRegister);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { companyid } = req.body;
      const cashRegisters = await findAllCashRegisters.execute(companyid);
      BuildResponse.success(res, cashRegisters);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }
}
