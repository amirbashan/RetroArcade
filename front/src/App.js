import React from "react";
import NavBarArcade from "../src/components/NavBarArcade";
import Login from "../src/scripts/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Snake from "./games/Snake/Snake";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBarArcade />
        <br />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Snake" element={<Snake />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
