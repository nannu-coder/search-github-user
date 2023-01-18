import { createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  return <AppContext.Provider vlaue="hello">{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
