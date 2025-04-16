import { Sell } from "../entities/sell";

export type SellRepository = {
  save: (sell: Sell) => Promise<Sell>;
  update: (sell: Sell) => Promise<Sell>;
  findOne: (date: string, companyid: string) => Promise<Sell[] | undefined>;
  findAll: (cashRegisterId: string) => Promise<Sell[]>;
};
