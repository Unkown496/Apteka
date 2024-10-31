import { chunk } from "~/utils/array";
import { getItems } from "~/utils/api";
import { Item } from "~/types";

export default defineEventHandler(async event => {
  const queryParams = getQuery(event);

  if (!queryParams?.page)
    throw createError({
      statusCode: 400,
      fatal: true,
      message: "request without page query imposibly!",
    });

  const { page } = queryParams;

  if (page === "0")
    throw createError({
      statusCode: 404,
      fatal: true,
      message: "page not can be zero",
    });

  const responseGetItems = await getItems();

  if (responseGetItems.status !== 200)
    throw createError({
      statusCode: responseGetItems.status,
      fatal: true,
      message: "some error with request to data!",
    });

  const items = (await responseGetItems.json()) as Item[];

  const totalPages = Math.round(items.length / 25);

  const pageNum = +page;

  if (!pageNum && !isNaN(pageNum))
    throw createError({
      statusCode: 404,
      fatal: true,
      message: `not have ${page}!`,
    });

  if (pageNum >= totalPages)
    throw createError({
      statusCode: 404,
      fatal: true,
      message: "Not have page!",
    });

  const currentPage = chunk<Item>(items, 25)[pageNum - 1];

  if (currentPage.length === 0)
    throw createError({
      statusCode: 404,
      fatal: true,
      message: `not have ${page}`,
    });

  return {
    items: currentPage,
    totalPages,
  };
});
