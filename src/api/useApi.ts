import { useCallback, useState } from "react";
import { ApiError } from "./ApiError";

export type FetchSettings = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  noErrorPropagationBoundary?: boolean;
};

export function useApi<R>({
  url,
  method,
  body,
  noErrorPropagationBoundary,
}: FetchSettings): [
  R | undefined,
  () => Promise<void>,
  boolean,
  ApiError | Error | undefined
] {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setData(undefined);
      setError(undefined);
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: [["Content-Type", "application/json"]],
      });
      if (response.ok) {
        setData(await response.json());
      } else {
        const err = new ApiError((await response.json()).error);
        err.setStatus(response.status);
        setError(err);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, method, body]);

  if (error && !noErrorPropagationBoundary) {
    throw error;
  }

  return [data, load, loading, error];
}
