import { useCallback, useEffect, useRef, useState } from "react";
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
  const abortController = useRef<AbortController>();

  const load = useCallback(async () => {
    try {
      if (abortController.current) {
        abortController.current.abort();
      }

      abortController.current = new AbortController();

      setLoading(true);
      setData(undefined);
      setError(undefined);
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: [["Content-Type", "application/json"]],
        signal: abortController.current.signal,
      });
      setLoading(false);
      if (response.ok) {
        setData(await response.json());
      } else {
        const err = new ApiError((await response.json()).error);
        err.setStatus(response.status);
        setError(err);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setLoading(false);
        setError(err);
      }
    }
  }, [url, method, body]);

  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [abortController]);

  if (error && !noErrorPropagationBoundary) {
    throw error;
  }

  return [data, load, loading, error];
}
