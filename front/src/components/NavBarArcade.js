import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Modal from "react-bootstrap/Modal";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../styles/NavBarArcade.css";
import webLogo from "../build/images/itcPackMan.png";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import login45 from "../build/images/login45.png";
import { Avatar } from "@chakra-ui/react";

function NavBarArcade() {
  let navigate = useNavigate();

  const { showModal, setShowModal } = useContext(AppContext);
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const { isAdmin, setIsAdmin } = useContext(AppContext);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleLogOut = () => {
    setIsAdmin(false);
    setCurrentUser("");
    localStorage.removeItem("TOKEN");
    navigate(`/`);
  };

  return (
    <div className="navBarDiv">
      <div className="shadow p-1 mb-3 bg-white rounded">
        <Navbar className="navBar" pill bg="light" variant="light">
          <Container className="container">
            <Link className="logoImageDiv" to="/">
              <img className="ImageDiv" src={webLogo} alt="logo" />
            </Link>
            <Nav className="me-auto">
              <nav>
                <ul>
                  <li className="button-one">
                    <a href="http://localhost:3000/Snake">🐍 Snake</a>
                  </li>
                  <li className="button-two">
                    <a href="http://localhost:3000/Minesweeper">💣 Minesweeper</a>
                  </li>
                  {/* <li className="button-three">
                    <a href="#l">Blog</a>
                  </li>
                  <li className="button-four">
                    <a href="#l">Contact</a>
                  </li> */}
                </ul>
              </nav>
              <Modal
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="my-modal"
                contentClassName="custom-modal-style"
                centered
                show={showModal}
                onHide={handleCloseModal}
              >
                <LoginModal />
              </Modal>
            </Nav>
          </Container>
          <div className="d-flex">
            {!currentUser && <img className="loginIcon" alt="login-logout" src={login45} onClick={handleShowModal} />}
            {currentUser && (
              <>
                <Link to="/myProfile" className="nav-link btn px-4">
                  <Avatar size="md" name={currentUser.name} src={currentUser.avatar} className="m-auto" />
                </Link>
                {(isAdmin ? true : "") && (
                  <Link to="/admin/" className="nav-link btn px-4">
                    Admin
                  </Link>
                )}
                <button onClick={handleLogOut} className="nav-link btn px-4">
                  Log Out
                </button>
              </>
            )}
          </div>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBarArcade;
