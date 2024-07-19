import { gtmEvent } from "..";

export const viewItemList = ({ items, itemListId, itemListName }) => {
  gtmEvent({
    params: {
      ecommerce: null,
    },
  });
  gtmEvent({
    action: "view_item_list",
    params: {
      ecommerce: {
        items,
        itemListId,
        itemListName,
      },
    },
  });
};
