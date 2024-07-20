import { gtmEvent } from "..";

export const addFreeSamples = ({ items }) => {
  gtmEvent({
    params: {
      ecommerce: null,
    },
  });
  gtmEvent({
    action: "add_free_samples",
    params: {
      ecommerce: {
        items: items.map((item) => ({
          item_id: item._id,
          item_name: item.productTitle,
          item_category: item.category,
          price: item.perUnitPrice,
          currency: "INR",
          quantity: 1,
        })),
      },
    },
  });
};
