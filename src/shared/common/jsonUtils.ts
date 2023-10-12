export const parseJson = (string: string | null) => {
  try {
    return string && string.length ? JSON.parse(string) : [];
  } catch (e) {
    return [];
  }
};

export const stringifyJson = (json: object | null) => {
  if (!json) return null;
  try {
    return JSON.stringify(json);
  } catch (e) {
    return null;
  }
};
