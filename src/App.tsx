import React, { useMemo, useState } from "react";
import { ApiContext, ApiContextProvider } from "./api/ApiContext";
import { ErrorBoundary } from "./ErrorBoundary";
import { MockSettings } from "./MockSettings";
import { SearchForm } from "./SearchForm";
import "./styles.css";

export default function App() {
  const [renderForm, setRenderForm] = useState(true);
  const apiContext = useMemo<ApiContext>(
    () => ({
      beforeFetch(request) {
        console.log("beforeFetch", { request });
        return Promise.resolve(request);
      },
      afterFetch(response, error) {
        console.log("afterFetch", { response, error });
        return Promise.resolve();
      },
    }),
    []
  );
  return (
    <ApiContextProvider {...apiContext}>
      <div className="App">
        <p>
          <button
            type="button"
            onClick={() => setRenderForm((renderForm) => !renderForm)}
          >
            {renderForm ? "Unmount" : "Mount"}
          </button>
        </p>
        {renderForm && (
          <ErrorBoundary>
            <MockSettings />
            <SearchForm />
          </ErrorBoundary>
        )}
      </div>
    </ApiContextProvider>
  );
}
