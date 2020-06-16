import { useApi } from "./useApi";

export function useSearchByName(name: string) {
  return useApi<string[], { error: string }>({
    method: "GET",
    url: `/api/search/${name}`,
  });
}
