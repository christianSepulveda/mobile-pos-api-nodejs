import { randomUUID } from "crypto";
import { SellDetailRepository } from "../../domain/repositories/sell-detail-repository";
import { SellDetail } from "../../domain/entities/sell-detail";
import SellDetailModel from "../database/models/sell-detail";

export class SellDetailService implements SellDetailRepository {
  async save(sellDetail: SellDetail): Promise<SellDetail> {
    const id = randomUUID();

    const newSellDetail = { id, ...sellDetail };
    const createdSellDetail = await SellDetailModel.create(newSellDetail);

    if (!createdSellDetail)
      throw new Error("Error creando el detalle de la venta");

    return createdSellDetail;
  }

  async update(sellDetail: SellDetail): Promise<SellDetail> {
    const condition = { where: { id: sellDetail.id } };

    const SellDetailExists = await SellDetailModel.findOne(condition);
    if (!SellDetailExists) throw new Error("La venta no existe");

    const updatedSellDetail = await SellDetailModel.update(
      sellDetail,
      condition
    );
    if (!updatedSellDetail) throw new Error("Error actualizando la venta");

    return sellDetail;
  }

  async findAllBySellId(sellId: string): Promise<SellDetail[]> {
    const condition = { where: { sellid: sellId } };
    const findedSellDetails = await SellDetailModel.findAll(condition);

    return findedSellDetails ?? [];
  }

  async findOne(id: string): Promise<SellDetail | undefined> {
    const SellDetail = await SellDetailModel.findByPk(id);
    return SellDetail ?? undefined;
  }
}
