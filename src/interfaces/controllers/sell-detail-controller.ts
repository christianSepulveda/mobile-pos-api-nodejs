import { Request, Response } from "express";
import { SellDetailService } from "../../infrastructure/services/sell-detail-service";
import { SaveSellDetail } from "../../application/use-cases/sell-detail/save";
import { UpdateSellDetail } from "../../application/use-cases/sell-detail/update";
import { FindOneSellDetail } from "../../application/use-cases/sell-detail/find-one";
import { FindAllSellDetailBySellId } from "../../application/use-cases/sell-detail/find-all-by-sell-id";
import { BuildResponse } from "../helpers/build-response";

const sellDetailService = new SellDetailService();
const saveSellDetail = new SaveSellDetail(sellDetailService);
const updateSellDetail = new UpdateSellDetail(sellDetailService);
const findSellDetail = new FindOneSellDetail(sellDetailService);
const findAllBySellId = new FindAllSellDetailBySellId(sellDetailService);

export class SellDetailController {
  async save(req: Request, res: Response): Promise<void> {
    try {
      const sellDetail = req.body;
      const newSellDetail = await saveSellDetail.execute(sellDetail);

      BuildResponse.success(res, newSellDetail);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const sellDetail = req.body;
      const updatedSellDetail = await updateSellDetail.execute(sellDetail);
      BuildResponse.success(res, updatedSellDetail);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const findedSellDetail = await findSellDetail.execute(id);

      if (!findedSellDetail) {
        BuildResponse.error(
          res,
          new Error("Detalle de la venta no encontrado")
        );
        return;
      }

      BuildResponse.success(res, findedSellDetail);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }

  async findAllBySellId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const findedSellDetails = await findAllBySellId.execute(id);

      if (!findedSellDetails) {
        BuildResponse.error(
          res,
          new Error("Detalles de la venta no encontrado")
        );
        return;
      }

      BuildResponse.success(res, findedSellDetails);
    } catch (error) {
      BuildResponse.error(res, error as Error);
    }
  }
}
