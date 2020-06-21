import React, { useMemo } from "react";
import { ApiContext, ApiContextProvider } from "./api/ApiContext";
import { ErrorBoundary } from "./ErrorBoundary";
import { SearchForm } from "./SearchForm";
import "./styles.css";

export default function App() {
  const apiContext = useMemo<ApiContext>(
    () => ({
      enhanceRequest(request) {
        request.headers.append(
          "x-this-header",
          "was-added-on-application-level"
        );
        return Promise.resolve(request);
      },
      postFetch(response, error) {
        console.log("this log was made on application level", {
          response,
          error,
        });
        return Promise.resolve();
      },
    }),
    []
  );
  return (
    <ApiContextProvider {...apiContext}>
      <ErrorBoundary>
        <SearchForm />
      </ErrorBoundary>
    </ApiContextProvider>
  );
}
