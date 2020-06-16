import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useState,
} from "react";
import { useSearchByName } from "./api/useSearchByName";

export const SearchForm: FC = () => {
  const [searchString, setSearchString] = useState("");
  const [names, search, loading] = useSearchByName(searchString);

  const handleSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchString(event.target.value),
    []
  );

  return (
    <form onSubmit={(event: FormEvent) => event.preventDefault()}>
      <input
        type="input"
        value={searchString}
        onChange={handleSearchInputChange}
      ></input>{" "}
      <button type="submit" onClick={search}>
        Search
      </button>
      {loading ? (
        <h2>{"Loading..."}</h2>
      ) : (
        names?.map((name) => <h2 key={name}>{name}</h2>)
      )}
    </form>
  );
};
