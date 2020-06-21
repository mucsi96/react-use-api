import React, { createContext, FC, useContext, useMemo } from "react";

const Context = createContext({});

export type ApiContext = {
  beforeFetch?: (request: Request) => Promise<Request>;
  afterFetch?: (response: Response | null, err: Error | null) => Promise<void>;
};
export const ApiContextProvider: FC<ApiContext> = ({
  beforeFetch,
  afterFetch,
  children,
}) => (
  <Context.Provider
    value={useMemo(() => ({ beforeFetch, afterFetch }), [
      beforeFetch,
      afterFetch,
    ])}
  >
    {children}
  </Context.Provider>
);

export const useApiContext = (): ApiContext => useContext(Context);
