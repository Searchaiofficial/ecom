import { gtmEvent } from "..";

export const removeFromCart = ({ item }) => {
  gtmEvent({
    params: {
      ecommerce: null,
    },
  });
  gtmEvent({
    action: "remove_from_cart",
    params: {
      ecommerce: {
        currency: "INR",
        value: item.perUnitPrice,
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
