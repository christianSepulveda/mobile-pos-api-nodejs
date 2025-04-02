import { SellDetail } from "../../../domain/entities/sell-detail";
import { SellDetailRepository } from "../../../domain/repositories/sell-repository";

export class FindAllSellDetailBySellId {
  private sellDetailRepository: SellDetailRepository;

  constructor(sellDetailRepository: SellDetailRepository) {
    this.sellDetailRepository = sellDetailRepository;
  }

  async execute(id: string): Promise<SellDetail[] | undefined> {
    const sellDetailsExists = await this.sellDetailRepository.findAllBySellId(
      id
    );
    return sellDetailsExists ?? undefined;
  }
}
