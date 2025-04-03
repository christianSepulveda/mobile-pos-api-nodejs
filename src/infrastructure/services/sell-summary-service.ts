import { defaultResponse } from "../../domain/constants/data";
import { SellSummary } from "../../domain/entities/sell-summary";
import { SellSummaryRepository } from "../../domain/repositories/sell-summary";
import CategoryModel from "../database/models/category";
import ProductModel from "../database/models/product";
import SellModel from "../database/models/sell";
import SellDetailModel from "../database/models/sell-detail";

export class SellSummaryService implements SellSummaryRepository {
  async findSummaryBySell(sellid: string): Promise<SellSummary | undefined> {
    let response: SellSummary = defaultResponse;
    const sellCondition = { where: { id: sellid } };

    const findSell = await SellModel.findOne(sellCondition);
    if (!findSell) return undefined;

    response = { ...findSell.dataValues, details: [] } as SellSummary;
    const sellDetailCondition = { where: { sellid: findSell.id } };

    const findSellDetails = await SellDetailModel.findAll(sellDetailCondition);
    if (!findSellDetails) return undefined;

    for (let sellDetail of findSellDetails) {
      const productCondition = { where: { id: sellDetail.productid } };

      const findProduct = await ProductModel.findOne(productCondition);
      if (!findProduct) return undefined;

      const categoryCondition = { where: { id: findProduct.category_id } };

      const findCategory = await CategoryModel.findOne(categoryCondition);
      if (!findCategory) return undefined;

      const product = {
        name: findProduct.name,
        unit_price: findProduct.price,
        code: findProduct.code,
        category: findCategory.name,
      };

      response = {
        ...response,
        details: [{ ...sellDetail.dataValues, ...product }],
      };
    }

    return response;
  }
}
