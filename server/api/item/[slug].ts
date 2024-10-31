import { getItems } from "~/utils/api";

export default defineEventHandler(async event => {
  const slug = getRouterParam(event, "slug");

  if (!slug)
    throw createError({
      statusCode: 400,
      fatal: true,
      message: "not slug!",
    });

  const responseGetItems = await getItems();

  if (responseGetItems.status !== 200)
    throw createError({
      statusCode: responseGetItems.status,
      fatal: true,
      message: await responseGetItems.json(),
    });

  const items = await responseGetItems.json();

  const currentItemBySlug = items.find(item => item.slug === slug);

  if (!currentItemBySlug) {
    throw createError({
      statusCode: 404,
      fatal: true,
      message: `not have slug ${slug}`,
    });
  }

  return currentItemBySlug;
});
