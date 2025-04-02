import { SellDetail } from "../../../domain/entities/sell-detail";
import { SellDetailRepository } from "../../../domain/repositories/sell-detail-repository";

export class UpdateSellDetail {
  private sellDetailRepository: SellDetailRepository;

  constructor(sellDetailRepository: SellDetailRepository) {
    this.sellDetailRepository = sellDetailRepository;
  }

  async execute(sellDetail: SellDetail): Promise<SellDetail> {
    const updatedSell = await this.sellDetailRepository.update(sellDetail);
    return updatedSell;
  }
}
