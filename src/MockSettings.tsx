import React, { FC } from "react";
import { useCookie } from "./api/useCookie";

export const MockSettings: FC = () => {
  const [delay, setDelay] = useCookie("X-Delay", "");
  const [fail, setFail] = useCookie("X-Fail", "");

  return (
    <>
      <p>
        {"Delay:  "}
        <button
          type="button"
          onClick={() => setDelay("")}
          className={delay === "" ? "active" : ""}
        >
          Off
        </button>{" "}
        <button
          type="button"
          onClick={() => setDelay("10000")}
          className={delay === "10000" ? "active" : ""}
        >
          10s
        </button>
      </p>
      <p>
        {"Fail:  "}
        <button
          type="button"
          onClick={() => setFail("")}
          className={fail === "" ? "active" : ""}
        >
          No
        </button>{" "}
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
