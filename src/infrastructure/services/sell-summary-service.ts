import { defaultResponse } from "../../domain/constants/data";
import { SellSummary } from "../../domain/entities/sell-summary";
import { SellSummaryRepository } from "../../domain/repositories/sell-summary";

import SellModel from "../database/models/sell";
import ProductModel from "../database/models/product";
import CategoryModel from "../database/models/category";
import SellDetailModel from "../database/models/sell-detail";

export class SellSummaryService implements SellSummaryRepository {
  async findSummaryBySell(sellid: string): Promise<SellSummary | undefined> {
    let response: SellSummary = defaultResponse;
    const sellCondition = { where: { id: sellid } };

    const findSell = await SellModel.findOne(sellCondition);
    if (!findSell) return undefined;

    response = { ...findSell.dataValues, details: [] } as SellSummary;

    const sellDetailCondition = { where: { sellid: findSell.dataValues.id } };

    const findSellDetails = await SellDetailModel.findAll(sellDetailCondition);
    if (!findSellDetails) return undefined;

    for (let sellDetail of findSellDetails) {
      const productCondition = {
        where: { id: sellDetail.dataValues.productid },
      };

      const findProduct = await ProductModel.findOne(productCondition);
      if (!findProduct) return undefined;

      const categoryCondition = {
        where: { id: findProduct.dataValues.category_id },
      };

      const findCategory = await CategoryModel.findOne(categoryCondition);
      if (!findCategory) return undefined;

      const product = {
        name: findProduct.dataValues.name,
        unit_price: findProduct.dataValues.price,
        code: findProduct.dataValues.code,
        category: findCategory.dataValues.name,
      };

      response = {
        ...response,
        details: [
          ...response.details,
          { ...sellDetail.dataValues, ...product },
        ],
      };
    }

    return response;
  }
}
