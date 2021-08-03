import React, { createContext, memo, useState } from "react";

export interface IMainContextProps {
  role: string;
  setRole: (role: string) => void;
}

const initContextValue = {
  role: "",
  setRole: (role: string) => {},
};

export const MainContext = createContext<IMainContextProps>(initContextValue);

export const MainContextProvider = memo(({ children }: { children: any }) => {
  const setRole = (role: string) => {
    setState((prevState: IMainContextProps) => ({
      ...prevState,
      role,
    }));
  };

  const [state, setState] = useState({
    role: "",
    setRole,
  } as IMainContextProps);

  return <MainContext.Provider value={state}>{children}</MainContext.Provider>;
});
