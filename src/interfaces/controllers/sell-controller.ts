import { Request, Response } from "express";
import { SellService } from "../../infrastructure/services/sell-service";
import { SaveSell } from "../../application/use-cases/sell/save";
import { UpdateSell } from "../../application/use-cases/sell/update";
import { FindOneSell } from "../../application/use-cases/sell/find-one";
import { FindAllSells } from "../../application/use-cases/sell/find-all";
import { BuildResponse } from "../helpers/build-response";

const sellService = new SellService();
const saveSell = new SaveSell(sellService);
const updateSell = new UpdateSell(sellService);
const findSell = new FindOneSell(sellService);
const findAllSells = new FindAllSells(sellService);

export class SellController {
  async save(req: Request, res: Response): Promise<void> {
    try {
      const sell = req.body;
      const newSell = await saveSell.execute(sell);

      BuildResponse.success(res, newSell);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const sell = req.body;
      const updatedSell = await updateSell.execute(sell);
      BuildResponse.success(res, updatedSell);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const { date, companyid } = req.body;
      const findedSell = await findSell.execute(date, companyid);

      if (!findedSell) {
        BuildResponse.error(res, new Error("Venta no encontrada"));
        return;
      }

      BuildResponse.success(res, findedSell);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { cashRegisterId } = req.body;
      const sells = await findAllSells.execute(cashRegisterId);
      BuildResponse.success(res, sells);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }
}
