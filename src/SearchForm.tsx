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
  const [searchString, setSearchString] = useState("");
  const [names, search, loading, error] = useSearchByName(searchString);

  const handleSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchString(event.target.value),
    []
  );

  return (
    <>
      <form onSubmit={(event: FormEvent) => event.preventDefault()}>
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
