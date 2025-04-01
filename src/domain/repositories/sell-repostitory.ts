import { Sell } from "../entities/sell";

export type SellRepository = {
  save: (sell: Sell) => Promise<Sell>;
  update: (sell: Sell) => Promise<Sell>;
  findOne: (id: string) => Promise<Sell | undefined>;
  findAll: () => Promise<Sell[]>;
};
