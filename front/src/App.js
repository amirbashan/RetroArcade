import React, { useState, useEffect } from "react";
import { AppContext } from "./Context/AppContext";
import NavBarArcade from "../src/components/NavBarArcade";
import Login from "../src/scripts/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Snake from "./games/Snake/Snake";
import Minesweeper from "./games/Minesweeper/Minesweeper";
import { getBasicUserInfo } from "./lib/UsersDB";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem("TOKEN");
    if (localToken) {
      setToken(localToken);
      getBasicUserInfo(localToken).then((response) => {
        if (!response) {
          localStorage.clear();
        } else {
          setCurrentUser(response.data);
          setIsAdmin(response.data.isAdmin);
        }
      });
    }
  }, [showModal]);

  return (
    <AppContext.Provider
      value={{
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        showModal: showModal,
        setShowModal: setShowModal,
        isAdmin: isAdmin,
        setIsAdmin: setIsAdmin,
        token: token,
        setToken: setToken,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <NavBarArcade />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Snake" element={<Snake />} />
            <Route path="/Minesweeper" element={<Minesweeper />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
