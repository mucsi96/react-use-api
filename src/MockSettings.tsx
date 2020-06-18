import React, { FC } from "react";
import { useCookie } from "./api/useCookie";

const delays = [
  { name: "Off", ms: "0" },
  { name: "1s", ms: "1000" },
  { name: "2s", ms: "2000" },
  { name: "3s", ms: "3000" },
  { name: "4s", ms: "4000" },
  { name: "5s", ms: "5000" },
];

export const MockSettings: FC = () => {
  const [delay, setDelay] = useCookie("X-Delay", "");
  const [fail, setFail] = useCookie("X-Fail", "");

  return (
    <>
      <p>
        {"Delay:  "}
        {delays.map(({ name, ms }) => (
          <button
            key={ms}
            type="button"
            onClick={() => setDelay(ms)}
            className={delay === ms ? "active" : ""}
          >
            {name}
          </button>
        ))}
      </p>
      <p>
        {"Fail:  "}
        <button
          type="button"
          onClick={() => setFail("")}
          className={fail === "" ? "active" : ""}
        >
          Off
        </button>
        <button
          type="button"
          onClick={() => setFail("true")}
          className={fail === "true" ? "active" : ""}
        >
          Yes
        </button>
      </p>
    </>
  );
};
