import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useState,
} from "react";
import { useSearch } from "./api/useSearch";

export const SearchForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [names, setNames] = useState<string[] | undefined>();
  const { searchByName } = useSearch();

  const handleSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchString(event.target.value),
    []
  );

  const handleSearchClick = useCallback(() => {
    setLoading(true);
    searchByName(searchString).then((names) => {
      setNames(names);
      setLoading(false);
    });
  }, [searchByName, searchString]);

  return (
    <form onSubmit={(event: FormEvent) => event.preventDefault()}>
      <input
        type="input"
        value={searchString}
        onChange={handleSearchInputChange}
      ></input>{" "}
      <button type="submit" onClick={handleSearchClick}>
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
