import { SellSummary } from "../entities/sell-summary";

export const defaultResponse: SellSummary = {
  id: "",
  date: "",
  time: "",
  total: 0,
  userid: "",
  companyid: "",
  details: [
    {
      id: "",
      productid: "",
      quantity: 0,
      sellid: "",
      total: 0,
      name: "",
      code: "",
      unit_price: 0,
      category: "",
    },
  ],
  active: true,
};
