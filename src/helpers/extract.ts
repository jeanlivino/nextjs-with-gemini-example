export const extractArrayFromJSONString = <T>(string: string): T => {
  const firstArrayIndex = string.indexOf('[');
  const lastArrayIndex = string.lastIndexOf(']');

  if (firstArrayIndex === -1 || lastArrayIndex === -1) {
    throw new Error('Invalid JSON string');
  }

  const json = string.slice(firstArrayIndex, lastArrayIndex + 1);

  return JSON.parse(json);
};
