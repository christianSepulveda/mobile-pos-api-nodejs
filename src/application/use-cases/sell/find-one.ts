import { Sell } from "../../../domain/entities/sell";
import { SellRepository } from "../../../domain/repositories/sell-repostitory";

export class FindOneSell {
  private sellRepository: SellRepository;

  constructor(sellRepository: SellRepository) {
    this.sellRepository = sellRepository;
  }

  async execute(date: string, companyid: string): Promise<Sell[] | undefined> {
    const findSell = await this.sellRepository.findOne(date, companyid);
    return findSell ?? undefined;
  }
}
