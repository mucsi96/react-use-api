import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { JobAutocomplete, useDataAtWork } from "./api/useDataAtWork";
import "./styles.css";

export default function App() {
  const [searchString, setSearchString] = useState("");
  const [jobs, setJobs] = useState<JobAutocomplete[] | undefined>();
  const { getJobsAutocomplete } = useDataAtWork();

  useEffect(() => {
    getJobsAutocomplete("react").then(setJobs);
  }, [getJobsAutocomplete]);

  const handleSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchString(event.target.value),
    []
  );

  return (
    <div className="App">
      <input
        type="input"
        value={searchString}
        onChange={handleSearchInputChange}
      ></input>
      <button type="button">Search</button>
      {jobs?.map((job) => (
        <h2>{job.suggestion}</h2>
      ))}
    </div>
  );
}
