import React, { useState, useEffect } from "react";
import { useDataAtWork } from "./api/useDataAtWork";
import "./styles.css";

export default function App() {
  const [jobs, setJobs] = useState();
  const { getJobsAutocomplete } = useDataAtWork();

  useEffect(() => {
    getJobsAutocomplete().then(setJobs);
  }, [getJobsAutocomplete]);

  return <div className="App">{JSON.stringify(jobs)}</div>;
}
