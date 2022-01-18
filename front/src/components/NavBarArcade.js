import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Modal from "react-bootstrap/Modal";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../styles/NavBarArcade.css";
import webLogo from "../build/images/itcPackMan.png";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
// import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="navBar">
      <div className="shadow p-1 mb-3 bg-white rounded">
        <Navbar bg="light" variant="light">
          <Container>
            <Link to="/">
              <img className="logoImageDiv" src={webLogo} alt="logo" />
            </Link>
            <Nav className="me-auto">
              <Nav.Link href="http://localhost:3000/Snake">Snake</Nav.Link>
              <Nav.Link href="http://localhost:3000/Minesweeper">Minesweeper</Nav.Link>

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
            {!currentUser && (
              <button variant="primary" onClick={handleShowModal} className="nav-link btn px-4">
                Login
              </button>
            )}
            {currentUser && (
              <>
                <Link to="/myProfile" className="nav-link btn px-4">
                  My Profile
                </Link>
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
