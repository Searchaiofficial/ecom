import { gtmEvent } from "..";

export const removeFreeSample = ({ item }) => {
  gtmEvent({
    params: {
      ecommerce: null,
    },
  });
  gtmEvent({
    action: "remove_free_sample",
    params: {
      ecommerce: {
        items: [
          {
            item_id: item._id,
            item_name: item.productTitle,
            item_category: item.category,
            price: item.perUnitPrice,
            currency: "INR",
            quantity: 1,
          },
        ],
      },
    },
  });
};
