import { useCallback, useEffect, useRef, useState } from "react";
import { useApiContext } from "./ApiContext";
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
  const [data, setData] = useState<R>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const abortController = useRef<AbortController>();
  const { enhanceRequest, postFetch } = useApiContext();

  const load = useCallback(async () => {
    try {
      if (abortController.current) {
        abortController.current.abort();
      }

      abortController.current = new AbortController();

      setLoading(true);
      setData(undefined);
      setError(undefined);
      let request = new Request(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortController.current.signal,
      });
      if (typeof enhanceRequest === "function") {
        request = await enhanceRequest(request);
      }
      const response = await fetch(request);
      setLoading(false);
      if (response.ok) {
        setData(await response.json());
      } else {
        const err = new ApiError((await response.json()).error);
        err.setStatus(response.status);
        setError(err);
      }
      if (typeof postFetch === "function") {
        await postFetch(response, null);
      }
    } catch (err) {
      if (typeof postFetch === "function") {
        await postFetch(null, err);
      }
      if (err.name !== "AbortError") {
        setLoading(false);
        setError(err);
      }
    }
  }, [url, method, body, enhanceRequest, postFetch]);

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
