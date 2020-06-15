import { useCallback, useState } from "react";

export type FetchSettings = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
};

export function useApi() {
  const [, setError] = useState();
  return useCallback(async (fetchSettings: FetchSettings) => {
    try {
      const result = await fetch(fetchSettings.url, {
        method: fetchSettings.method,
        body: JSON.stringify(fetchSettings.body),
        headers: [["Content-Type", "application/json"]],
      });
      return await result.json();
    } catch (err) {
      setError(() => {
        throw err;
      });
      throw err;
    }
  }, []);
}
