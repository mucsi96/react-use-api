import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useSearch } from "./api/useSearch";
import "./styles.css";

export default function App() {
  const [searchString, setSearchString] = useState("");
  const [names, setNames] = useState<string[] | undefined>();
  const { searchByName } = useSearch();

  const handleSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchString(event.target.value),
    []
  );

  const handleSearchClick = useCallback(() => {
    searchByName(searchString).then(setNames);
  }, [searchByName, searchString]);

  return (
    <form
      className="App"
      onSubmit={(event: FormEvent) => event.preventDefault()}
    >
      <input
        type="input"
        value={searchString}
        onChange={handleSearchInputChange}
      ></input>
      <button type="submit" onClick={handleSearchClick}>
        Search
      </button>
      {names?.map((name) => (
        <h2>{name}</h2>
      ))}
    </form>
  );
}
