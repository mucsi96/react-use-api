import { useCallback, useState } from "react";

export type FetchSettings = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
};

export function useApi<R, E>({
  url,
  method,
  body,
}: FetchSettings): [
  R | undefined,
  () => Promise<void>,
  boolean,
  E | undefined
] {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<E>();
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setData(undefined);
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: [["Content-Type", "application/json"]],
      });
      if (response.ok) {
        setData(await response.json());
      } else {
        setError(await response.json());
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, method, body]);
  return [data, load, loading, error];
}
