import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import MiniNav from "./MiniNav";

export default function Modal() {
  let location = useLocation();
  let state = location.state;
  return (
    <>
      <MiniNav />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Login />} />
        <Route path="SignUp" element={<SignUp />} />
      </Routes>
    </>
  );
}
