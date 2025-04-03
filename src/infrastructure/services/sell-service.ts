import { randomUUID } from "crypto";
import { Sell } from "../../domain/entities/sell";
import { SellRepository } from "../../domain/repositories/sell-repostitory";
import SellModel from "../database/models/sell";

export class SellService implements SellRepository {
  async findAll(): Promise<Sell[]> {
    const findedSells = await SellModel.findAll();
    return findedSells ?? [];
  }

  async findOne(date: string, companyid: string): Promise<Sell[] | undefined> {
    const sell = await SellModel.findAll({ where: { date, companyid } });
    return sell ?? undefined;
  }

  async save(sell: Sell): Promise<Sell> {
    const id = randomUUID();

    const createdSell = await SellModel.create({ id, ...sell });
    if (!createdSell) throw new Error("Error creando la venta");

    return createdSell;
  }

  async update(sell: Sell): Promise<Sell> {
    const condition = { where: { id: sell.id } };

    const sellExists = await SellModel.findOne(condition);
    if (!sellExists) throw new Error("La venta no existe");

    const updatedSell = await SellModel.update(sell, condition);
    if (!updatedSell) throw new Error("Error actualizando la venta");

    return sell;
  }
}
