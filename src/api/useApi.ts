import { useCallback, useState } from "react";

export type FetchSettings = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
};

export function useApi<R>({
  url,
  method,
  body,
}: FetchSettings): [
  R | undefined,
  () => Promise<void>,
  boolean,
  Error | undefined
] {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const load = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: [["Content-Type", "application/json"]],
      });
      setData(await result.json());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, method, body]);
  return [data, load, loading, error];
}
