import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { MockSettings } from "./MockSettings";
import { SearchForm } from "./SearchForm";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <MockSettings />
        <SearchForm />
      </ErrorBoundary>
    </div>
  );
}
