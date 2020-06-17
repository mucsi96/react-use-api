import { useApi } from "./useApi";

export function useSearchByName({
  name,
  noErrorPropagationBoundary,
}: {
  name: string;
  noErrorPropagationBoundary?: boolean;
}) {
  return useApi<string[]>({
    method: "GET",
    url: `/api/search/${name}`,
    noErrorPropagationBoundary,
  });
}
