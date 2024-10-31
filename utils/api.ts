import type { Item } from "~/types";

type ItemsData = Response & { json: Promise<Array<Item>> };

export const getItems: () => Promise<ItemsData> = async () => {
  const response = await fetch(
    "https://67216d7098bbb4d93ca8610d.mockapi.io/items"
  );

  return response as ItemsData;
};
