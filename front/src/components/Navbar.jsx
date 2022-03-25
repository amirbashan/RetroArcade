import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";
import Modal from "react-bootstrap/Modal";
import LoginModal from "./LoginModal";
import CoolButton from "./CoolButton.jsx";
import webLogo from "../build/images/itcPackMan.png";
import Admin from "../build/images/Admin.png";
import Enter from "../build/images/Enter2.png";
import Exit from "../build/images/Exit2.png";

function Navbar() {
  let navigate = useNavigate();

  const { showModal, setShowModal } = useContext(AppContext);
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const { isAdmin, setIsAdmin } = useContext(AppContext);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    navigate(`/`);
    setShowModal(true);
  };
  const handleLogOut = () => {
    setIsAdmin(false);
    setCurrentUser("");
    localStorage.removeItem("TOKEN");
    navigate(`/`);
  };

  return (
    <div className="mb-3">
      <nav className=" nav shadow d-flex align-items-center justify-content-start py-1 mainNav">
        <div className="mx-3">
          <Link to="/">
            <img className="logo" src={webLogo} alt="logo" />
          </Link>
        </div>
        <div className=" d-flex">
          <CoolButton linkColor={"#3bb273"} shadowColor={"#339963"} destination={"/Snake"} linkText={"🐍 Snake"} />
          <CoolButton linkColor={"#4d9de0"} shadowColor={"#2f8dda"} destination={"/Minesweeper"} linkText={"💣 Minesweeper"} />
          {/* <CoolButton linkColor={"#e15554"} shadowColor={"#da2f2f"} destination={"/"} linkText={""} /> */}
          {/* <CoolButton linkColor={"#e1bc29"} shadowColor={"#"} destination={"/"} linkText={"c4a31c"} /> */}
        </div>
        <div className="d-flex ms-auto">
          {!currentUser && <img className="exit mx-3 justify-self-end" alt="login-logout" src={Enter} onClick={handleShowModal} />}
          {currentUser && (
            <>
              <Link to="/myProfile" className="nav-link btn px-4">
                <Avatar size="lg" name={currentUser.name} src={currentUser.avatar} />
              </Link>
              {(isAdmin ? true : "") && (
                <Link to="/admin/usersList" className="nav-link btn px-4">
                  <img className="admin" src={Admin} alt="Admin" />
                </Link>
              )}
              <button onClick={handleLogOut} className="nav-link btn px-4">
                <img className="exit" src={Exit} alt="Logout" />
              </button>
            </>
          )}
        </div>
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
    </div>
  );
}

export default Navbar;
