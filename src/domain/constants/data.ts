import { SellSummary } from "../entities/sell-summary";

export const defaultResponse: SellSummary = {
  id: "",
  date: "",
  time: "",
  cash: 0,
  change: 0,
  total: 0,
  userid: "",
  cash_register_id: "",
  payment_method: "",
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
