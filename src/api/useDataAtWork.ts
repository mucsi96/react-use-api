import { useMemo } from "react";
import { useApi } from "./useApi";

export type JobAutocomplete = {
  uuid: string;
  suggestion: string;
  normalized_job_title: string;
  parent_uuid: string;
};

export function useDataAtWork() {
  const fetch = useApi();
  return useMemo(
    () => ({
      getJobsAutocomplete(searchString: string) {
        return fetch({
          method: "GET",
          url: `http://api.dataatwork.org/v1/jobs/autocomplete?contains=${searchString}`,
        }) as Promise<JobAutocomplete[]>;
      },
    }),
    [fetch]
  );
}
