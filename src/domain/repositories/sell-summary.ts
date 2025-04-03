import { SellSummary } from "../entities/sell-summary";

export type SellSummaryRepository = {
  findSummaryBySell: (sellid: string) => Promise<SellSummary | undefined>;
};
