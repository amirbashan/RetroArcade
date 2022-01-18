import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { getFullUserInfo, editUserInfo } from "../lib/UsersDB";
import Form from "react-bootstrap/Form";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, token } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, SetAvatar] = useState("");
  const [role, SetRole] = useState("");
  const [joined, setJoined] = useState("");
  const [editMode, setEditMode] = useState(false);

  if (!currentUser) navigate(`/`);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    SetAvatar(currentUser.avatar);
    SetRole(currentUser.isAdmin);
    setJoined(currentUser.created_date);
  }, [currentUser]);

  const fixData = (date) => {
    const newDate = date.substr(8, 2) + "-" + date.substr(5, 2) + "-" + date.substr(0, 4);
    return newDate;
  };

  const handleFirstNameChange = (e) => (editMode ? setName(e.target.value) : "");
  //   const handleAvatarChange = (e) => (editMode ? SetAvatar(e.target.value) : "");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        name,
        email,
        avatar,
      };
      if (window.confirm("Confirm changes")) {
        const response = await editUserInfo(token, user, currentUser.email);
        if (response.affectedRows === 1) alert("Edit Successful");
        setEditMode(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <h1 className="m-auto">Profile page</h1>
      <Form className="d-flex m-auto my-3 w-75" onSubmit={(e) => handleOnSubmit(e)}>
        <Form.Group className="d-flex flex-column w-75 m-auto">
          <div className="row mb-2">
            <div className="col d-flex flex-wrap align-items-end">
              <label>Email</label>
              <input type="text" readOnly value={currentUser.email} className="form-control" />
            </div>
          </div>

          <div className="row my-2">
            <div className="col d-flex">
              {!editMode && (
                <button type="button" onClick={() => setEditMode(true)} className="btn btn-sm btn-warning border ">
                  Enable Edit Mode
                </button>
              )}

              {editMode && (
                <button type="submit" className="btn btn-sm btn-success border ">
                  Save changes
                </button>
              )}
            </div>
          </div>
        </Form.Group>
      </Form>

      {editMode === false && <div></div>}
    </div>
  );
}
