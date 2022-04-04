import { createContext } from "react";

export const AppContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  showModal: "",
  setShowModal: () => {},
  isAdmin: "",
  setIsAdmin: () => {},
  token: "",
  setToken: () => {},
});
