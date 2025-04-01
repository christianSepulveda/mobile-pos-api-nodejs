import { Sell } from "../../../domain/entities/sell";
import { SellRepository } from "../../../domain/repositories/sell-repostitory";

export class UpdateSell {
  private sellRepository: SellRepository;

  constructor(sellRepository: SellRepository) {
    this.sellRepository = sellRepository;
  }

  async execute(sell: Sell): Promise<Sell> {
    const updateSell = await this.sellRepository.update(sell);
    return updateSell;
  }
}
