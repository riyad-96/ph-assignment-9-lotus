import { createContext, useContext, useState } from 'react';

const globalContext = createContext();

function GlobalContext({ children }) {
  const [appLoading, setAppLoading] = useState(true);

  return <globalContext.Provider value={{ appLoading, setAppLoading }}>{children}</globalContext.Provider>;
}

export default GlobalContext;

export function useGlobalContext() {
  return useContext(globalContext);
}
