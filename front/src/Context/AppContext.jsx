import { createContext } from "react";

export const AppContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  isAdmin: "",
  setIsAdmin: () => {},
  token: "",
  setToken: () => {},
});
