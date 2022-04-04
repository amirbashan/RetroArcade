import React, { useState, useContext } from "react";
import { loginUser } from "../lib/UsersDB";
import { AppContext } from "../Context/AppContext";
import { FormControl, FormLabel, InputRightElement, Input, Heading, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setShowModal } = useContext(AppContext);
  const [show, setShow] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPassword(e.target.value);
  const handleClick = () => setShow(!show);

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
    <div className="d-flex flex-column justify-content-center px-3">
      {currentUser && <h2>Logged in</h2>}
      {!currentUser && (
        <div className="d-flex flex-column justify-content-center p-3">
          <Heading className="m-auto mb-2">Log-in</Heading>
          <form className="mx-3" onSubmit={(e) => handleOnSubmit(e)}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email </FormLabel>
              <InputGroup className="mb-2">
                <InputLeftElement pointerEvents="none" children={<EmailIcon color="gray.300" />}></InputLeftElement>
                <Input id="email" type="email" onChange={(e) => handleEmailChange(e)} maxLength="100" />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password">Password </FormLabel>
              <InputGroup className="mb-2">
                <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="Enter password" onChange={(e) => handlePassChange(e)} autoComplete="true" />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit" className="align-self-end">
              Log In
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
