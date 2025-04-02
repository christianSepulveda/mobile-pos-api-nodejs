import { SellSummary } from "../../../domain/entities/sell-summary";
import { SellSummaryRepository } from "../../../domain/repositories/sell-summary";

export class FindSellSummaryByDate {
  private sellSummaryRepository: SellSummaryRepository;

  constructor(sellSummaryRepository: SellSummaryRepository) {
    this.sellSummaryRepository = sellSummaryRepository;
  }

  async execute(date: string): Promise<SellSummary | undefined> {
    const findedUser = await this.sellSummaryRepository.findSellSumaryByDate(
      date
    );
    return findedUser;
  }
}
