import { Request, Response } from "express";
import { FindSellSummaryByDate } from "../../application/use-cases/sell-summary/find-summary-by-date";
import { SellSummaryService } from "../../infrastructure/services/sell-summary-service";
import { BuildResponse } from "../helpers/build-response";

const sellSummaryService = new SellSummaryService();
const findSellSummaryByDate = new FindSellSummaryByDate(sellSummaryService);

export class SellSummaryController {
  async findSellSumaryByDate(req: Request, res: Response): Promise<void> {
    try {
      const { sellid } = req.body;
      const sellSummary = await findSellSummaryByDate.execute(sellid);

      if (!sellSummary) {
        BuildResponse.error(res, new Error("Resumen de venta no encontrado"));
      }

      BuildResponse.success(res, sellSummary);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }
}
