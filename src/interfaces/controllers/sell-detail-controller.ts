import { Request, Response } from "express";
import { SellDetailService } from "../../infrastructure/services/sell-detail-service";
import { SaveSellDetail } from "../../application/use-cases/sell-detail/save";
import { UpdateSellDetail } from "../../application/use-cases/sell-detail/update";
import { FindOneSellDetail } from "../../application/use-cases/sell-detail/find-one";
import { FindAllSellDetailBySellId } from "../../application/use-cases/sell-detail/find-all-by-sell-id";

const sellDetailService = new SellDetailService();
const saveSellDetail = new SaveSellDetail(sellDetailService);
const updateSellDetail = new UpdateSellDetail(sellDetailService);
const findSellDetail = new FindOneSellDetail(sellDetailService);
const findAllBySellId = new FindAllSellDetailBySellId(sellDetailService);

export class SellDetailController {
  constructor() {
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.findOne = this.findOne.bind(this);
    this.findAllBySellId = this.findAllBySellId.bind(this);
  }

  handleError(error: Error) {
    const status = 500;
    const errorMessage = (error as Error).message;
    const json = { error: true, message: errorMessage, code: status };

    return { status, json };
  }
  async save(req: Request, res: Response): Promise<void> {
    try {
      const sellDetail = req.body;
      const newSellDetail = await saveSellDetail.execute(sellDetail);

      res.status(200).json(newSellDetail);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const sellDetail = req.body;
      const updatedSellDetail = await updateSellDetail.execute(sellDetail);
      res.status(200).json(updatedSellDetail);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }
  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const findedSellDetail = await findSellDetail.execute(id);

      if (!findedSellDetail) {
        const { status, json } = this.handleError(
          new Error("Detalle de la venta no encontrado")
        );

        res.status(status).json(json);
      }

      res.status(200).json(findedSellDetail);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }
  async findAllBySellId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const findedSellDetails = await findAllBySellId.execute(id);

      if (!findedSellDetails) {
        const { status, json } = this.handleError(
          new Error("Detalles de la venta no encontrado")
        );

        res.status(status).json(json);
      }

      res.status(200).json(findedSellDetails);
    } catch (error) {
      const { status, json } = this.handleError(error as Error);
      res.status(status).json(json);
    }
  }
}
