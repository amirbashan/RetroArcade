import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../styles/NavBarArcade.css";
import webLogo from "../build/images/itcPackMan.png";
import { Link } from "react-router-dom";

function NavBarArcade() {
  return (
    <div className="navBar">
      <div className="shadow p-3 mb-5 bg-white rounded">
        <Navbar bg="light" variant="light">
          <Container>
            <Link to="/">
              <img className="logoImageDiv" src={webLogo} alt="logo" />
            </Link>
            <Nav className="me-auto">
              <Nav.Link href="http://localhost:3000/Snake">Snake</Nav.Link>
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBarArcade;
