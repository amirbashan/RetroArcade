import React, { useState, useContext } from "react";
import { loginUser } from "../lib/UsersDB";
import { AppContext } from "../Context/AppContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setShowModal } = useContext(AppContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPassword(e.target.value);

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = {
        email: email,
        password: password,
      };
      const res = await loginUser(user);
      if (res.token) {
        localStorage.setItem("TOKEN", res.token);
        setEmail("");
        setPassword("");
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center popUp">
      {currentUser && <h2>Logged in</h2>}
      {!currentUser && (
        <form onSubmit={(e) => handleOnSubmit(e)} className="d-flex flex-column forModal">
          <h4>Log In</h4>
          <input type="email" onChange={(e) => handleEmailChange(e)} placeholder="Email Address" value={email} required />
          <input
            type="password"
            name="password"
            autoComplete="on"
            onChange={(e) => handlePassChange(e)}
            value={password}
            className="my-1"
            placeholder="Password"
            required
          />
          <button type="submit" className="btn btn-sm btn-primary">
            Log In
          </button>
        </form>
      )}
    </div>
  );
}
