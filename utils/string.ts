// Очистка спец символов
export const normalazeString = (string: string): string => {
  const enscapeMap: Record<string, string> = {
    "(": "%28",
    ")": "%29",
  };

  return encodeURI(string).replaceAll(
    new RegExp(/[()]/, "g"),
    (queryToReplace: string): string => enscapeMap[queryToReplace]
  );
};
