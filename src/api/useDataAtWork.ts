import { useMemo } from "react";
import { useApi } from "./useApi";

export function useDataAtWork() {
  const fetch = useApi();
  return useMemo(
    () => ({
      getJobsAutocomplete() {
        return fetch({
          method: "GET",
          url: "http://api.dataatwork.org/v1/jobs/autocomplete?contains=react"
        });
      }
    }),
    [fetch]
  );
}
