import { SellDetail } from "../entities/sell-detail";

export type SellDetailRepository = {
  save: (sell: SellDetail) => Promise<SellDetail>;
  update: (sell: SellDetail) => Promise<SellDetail>;
  findOne: (id: string) => Promise<SellDetail | undefined>;
  findAllBySellId: (sellId: string) => Promise<SellDetail[]>;
};
