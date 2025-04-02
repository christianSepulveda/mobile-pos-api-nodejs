import { SellSummary } from "../entities/sell-summary";

export type SellSummaryRepository = {
  findSellSumaryByDate: (date: string) => Promise<SellSummary | undefined>;
};
