import React, { useState } from "react";
import { signUpUser } from "../lib/UsersDB";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPassword(e.target.value);
  const handlePassConfirmChange = (e) => setPassConfirm(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: email,
        password: password,
        name: name,
      };
      const response = await signUpUser(newUser);
    //   setEmail("");
    //   setPassword("");
    //   setPassConfirm("");
    //   setName("");
      if (response) {
        navigate(`/`);
        alert(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center popUp">
      <form className="d-flex flex-column forModal" onSubmit={(e) => handleOnSubmit(e)}>
        <h4>SignUp</h4>
        <input type="email" onChange={(e) => handleEmailChange(e)} value={email} placeholder="Email Address" className="mb-1" maxLength="100" required />
        <input type="Password" onChange={(e) => handlePassChange(e)} value={password} placeholder="Password" className="mb-1" maxLength="250" required />
        <input
          type="Password"
          onChange={(e) => handlePassConfirmChange(e)}
          value={passConfirm}
          placeholder="Confirm Password"
          className="mb-1"
          maxLength="250"
          required
        />
        <input type="text" onChange={(e) => handleNameChange(e)} value={name} placeholder="Username / Name" className="mb-1" maxLength="100" required />
        <button type="submit" disabled={password !== passConfirm} className="btn btn-sm btn-primary ">
          Submit
        </button>
        {password !== passConfirm && <span className="text-danger font-size-sm">Those passwords don't match</span>}
      </form>
    </div>
  );
}
