import { Sell } from "../../../domain/entities/sell";
import { SellRepository } from "../../../domain/repositories/sell-repostitory";

export class SaveSell {
  private sellRepository: SellRepository;

  constructor(sellRepository: SellRepository) {
    this.sellRepository = sellRepository;
  }

  async execute(sell: Sell): Promise<Sell> {
    const saveSell = await this.sellRepository.save(sell);
    return saveSell;
  }
}
