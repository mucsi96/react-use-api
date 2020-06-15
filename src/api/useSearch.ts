import { useMemo } from "react";
import { useApi } from "./useApi";

export function useSearch() {
  const fetch = useApi();
  return useMemo(
    () => ({
      searchByName(name: string) {
        return fetch({
          method: "GET",
          url: `/api/search/${name}`,
        }) as Promise<string[]>;
      },
    }),
    [fetch]
  );
}
