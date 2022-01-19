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
    <div className="mb-1">
      <div>
        <Navbar className="navBarDiv">
          <Container className="container">
            <Link to="/">
              <img className="ImageDiv" src={webLogo} alt="logo" />
            </Link>
            <Nav className="me-auto">
              <nav>
                <ul>
                  <li className="button-one">
                    <Link to="/Snake">🐍 Snake</Link>
                  </li>
                  <li className="button-two">
                    <Link to="/Minesweeper">💣 Minesweeper</Link>
                  </li>
                  {/* <li className="button-three">bla bla</li>
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
          <Container className="container">
            <Nav className="me-auto">
              <div className="d-flex">
                {!currentUser && <img className="loginIcon" alt="login-logout" src={login45} onClick={handleShowModal} />}
                {currentUser && (
                  <>
                    <Link to="/myProfile" className="nav-link btn px-4">
                      <Avatar size="md" name={currentUser.name} src={currentUser.avatar} className="m-auto" />
                    </Link>
                    {(isAdmin ? true : "") && (
                      <li className="button-three">
                        <Link to="/admin/usersList" className="">
                          ADMIN
                        </Link>
                      </li>
                    )}
                    <button onClick={handleLogOut} className="nav-link btn px-4">
                      Log Out
                    </button>
                  </>
                )}
              </div>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBarArcade;
