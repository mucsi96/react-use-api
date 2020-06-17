import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useState,
} from "react";
import { useSearchByName } from "./api/useSearchByName";
import { SearchResults } from "./SearchResults";

export const SearchForm: FC = () => {
  const [errorBoundary, toggleErrorBoundary] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [names, search, loading, error] = useSearchByName({
    name: searchString,
    noErrorPropagationBoundary: !errorBoundary,
  });

  const handleSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchString(event.target.value),
    []
  );

  return (
    <>
      <form onSubmit={(event: FormEvent) => event.preventDefault()}>
        <p>
          {"ErrorBoundary:  "}
          <button
            type="button"
            onClick={() => toggleErrorBoundary(false)}
            className={!errorBoundary ? "active" : ""}
          >
            Off
          </button>{" "}
          <button
            type="button"
            onClick={() => toggleErrorBoundary(true)}
            className={errorBoundary ? "active" : ""}
          >
            On
          </button>
        </p>
        <input
          type="input"
          value={searchString}
          onChange={handleSearchInputChange}
        ></input>{" "}
        <button type="submit" onClick={search}>
          Search
        </button>
      </form>
      <SearchResults names={names} loading={loading} error={error} />
    </>
  );
};
