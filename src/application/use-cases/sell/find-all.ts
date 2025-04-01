import { Sell } from "../../../domain/entities/sell";
import { SellRepository } from "../../../domain/repositories/sell-repostitory";

export class FindAllSells {
  private sellRepository: SellRepository;

  constructor(sellRepository: SellRepository) {
    this.sellRepository = sellRepository;
  }

  async execute(): Promise<Sell[]> {
    const findSell = await this.sellRepository.findAll();
    return findSell ?? undefined;
  }
}
