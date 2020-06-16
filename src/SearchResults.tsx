import React, { FC } from "react";

export const SearchResults: FC<{
  names?: string[];
  loading: boolean;
  error?: { error: string };
}> = ({ names, loading, error }) => {
  console.log({ names, loading, error });

  if (loading) {
    return <h2>{"Loading..."}</h2>;
  }

  if (error) {
    return (
      <h2>
        {"Error: "}
        {error.error}
      </h2>
    );
  }

  if (names) {
    return (
      <>
        {names.map((name) => (
          <h2 key={name}>{name}</h2>
        ))}
      </>
    );
  }

  return null;
};
