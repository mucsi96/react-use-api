import React, { FC } from "react";
import { ApiError } from "./api/ApiError";

export const SearchResults: FC<{
  names?: string[];
  loading: boolean;
  error?: ApiError | Error;
}> = ({ names, loading, error }) => {
  if (loading) {
    return <h2>{"Loading..."}</h2>;
  }

  if (error) {
    return (
      <h2>
        {"Error: "}
        {error.message}
        {error instanceof ApiError && ` (${error.status})`}
      </h2>
    );
  }

  if (names) {
    return (
      <>
        {names.length ? (
          names.map((name) => <h2 key={name}>{name}</h2>)
        ) : (
          <h2>{"No matching name"}</h2>
        )}
      </>
    );
  }

  return null;
};
