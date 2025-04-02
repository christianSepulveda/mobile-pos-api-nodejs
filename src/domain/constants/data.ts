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
      product: {
        id: "",
        name: "",
        code: "",
        price: 0,
        category_id: "",
        active: true,
      },
    },
  ],
  active: true,
};
