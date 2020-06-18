import React, { useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { MockSettings } from "./MockSettings";
import { SearchForm } from "./SearchForm";
import "./styles.css";

export default function App() {
  const [renderForm, setRenderForm] = useState(true);
  return (
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
  );
}
