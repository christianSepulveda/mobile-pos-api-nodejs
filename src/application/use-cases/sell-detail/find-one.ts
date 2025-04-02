import { SellDetail } from "../../../domain/entities/sell-detail";
import { SellDetailRepository } from "../../../domain/repositories/sell-detail-repository";

export class FindOneSellDetail {
  private sellDetailRepository: SellDetailRepository;

  constructor(sellDetailRepository: SellDetailRepository) {
    this.sellDetailRepository = sellDetailRepository;
  }

  async execute(id: string): Promise<SellDetail | undefined> {
    const sellDetailExists = await this.sellDetailRepository.findOne(id);
    return sellDetailExists ?? undefined;
  }
}
