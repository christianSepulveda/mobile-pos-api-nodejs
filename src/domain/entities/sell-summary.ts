import { Product } from "./product";
import { Sell } from "./sell";
import { SellDetail } from "./sell-detail";

type detail = SellDetail & {
  name: string;
  unit_price: number;
  code: string;
  category: string;
};

export type SellSummary = Sell & { details: detail[] };
