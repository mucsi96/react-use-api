import React from "react";
import { MockSettings } from "./MockSettings";
import { SearchForm } from "./SearchForm";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <MockSettings />
      <SearchForm />
    </div>
  );
}
