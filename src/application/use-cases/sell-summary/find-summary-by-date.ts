import { SellSummary } from "../../../domain/entities/sell-summary";
import { SellSummaryRepository } from "../../../domain/repositories/sell-summary";

export class FindSellSummaryByDate {
  private sellSummaryRepository: SellSummaryRepository;

  constructor(sellSummaryRepository: SellSummaryRepository) {
    this.sellSummaryRepository = sellSummaryRepository;
  }

  async execute(sellid: string): Promise<SellSummary | undefined> {
    const findSummary = await this.sellSummaryRepository.findSummaryBySell(
      sellid
    );
    return findSummary;
  }
}
