export const buildReqestUrl = (baseUrl: string, endpoint: string, params: Record<string, string | number | boolean>): string => {
  const url = new URL(`${baseUrl}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  return url.toString();
};
