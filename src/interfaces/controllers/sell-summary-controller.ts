import { Request, Response } from "express";
import { FindSellSummaryByDate } from "../../application/use-cases/sell-summary/find-summary-by-date";
import { SellSummaryService } from "../../infrastructure/services/sell-summary-service";

const sellSummaryService = new SellSummaryService();
const findSellSummaryByDate = new FindSellSummaryByDate(sellSummaryService);

export class SellSummaryController {
  constructor() {
    this.findSellSumaryByDate = this.findSellSumaryByDate.bind(this);
  }

  handleError(error: Error) {
    const status = 500;
    const errorMessage = (error as Error).message;
    const json = { error: true, message: errorMessage, code: status };

    return { status, json };
  }

  async findSellSumaryByDate(req: Request, res: Response): Promise<void> {
    try {
      const { sellid } = req.body;
      const sellSummary = await findSellSummaryByDate.execute(sellid);

      const { status, json } = this.handleError(
        new Error("Resumen de venta no encontrado")
      );

      if (!sellSummary) res.status(status).json(json);

      res.status(200).json(sellSummary);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }
}
