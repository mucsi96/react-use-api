import { useApi } from "./useApi";

export function useSearchByName(name: string) {
  return useApi<string[]>({
    method: "GET",
    url: `/api/search/${name}`,
    noErrorPropagationBoundary: true,
  });
}
