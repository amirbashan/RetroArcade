import React, { useState } from "react";
import { signUpUser } from "../lib/UsersDB";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, InputRightElement, Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPassword(e.target.value);
  const handlePassConfirmChange = (e) => setPassConfirm(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleClick = () => setShow(!show);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: email,
        password: password,
        name: name,
      };
      const response = await signUpUser(newUser);
      setEmail("");
      setPassword("");
      setPassConfirm("");
      setName("");
      if (response) {
        navigate(`/`);
        alert(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center p-3">
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
            <Input id="password" pr="4.5rem" type="password" placeholder="Enter password" onChange={(e) => handlePassChange(e)} autoComplete="true" />
          </InputGroup>
          <InputGroup className="mb-2">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Please confirm your password"
              id="confirm"
              isInvalid={password !== passConfirm ? true : false}
              errorBorderColor="red.300"
              onChange={(e) => handlePassConfirmChange(e)}
              autoComplete="true"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Name </FormLabel>
          <InputGroup className="mb-2">
            <Input id="name" type="text" placeholder="Will be visible to other users" onChange={(e) => handleNameChange(e)} maxLength="100" />
          </InputGroup>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit" disabled={password !== passConfirm} className="align-self-end">
          Sign up
        </Button>
      </form>
    </div>
  );
}
