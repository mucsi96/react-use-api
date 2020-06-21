import React, { createContext, FC, useContext, useMemo } from "react";

const Context = createContext({});

export type ApiContext = {
  enhanceRequest?: (request: Request) => Promise<Request>;
  postFetch?: (response: Response | null, err: Error | null) => Promise<void>;
};
export const ApiContextProvider: FC<ApiContext> = ({
  enhanceRequest,
  postFetch,
  children,
}) => (
  <Context.Provider
    value={useMemo(() => ({ enhanceRequest, postFetch }), [
      enhanceRequest,
      postFetch,
    ])}
  >
    {children}
  </Context.Provider>
);

export const useApiContext = (): ApiContext => useContext(Context);
