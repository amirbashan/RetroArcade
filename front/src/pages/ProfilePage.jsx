import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { getFullUserInfo, editUserInfo } from "../lib/UsersDB";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Avatar, WrapItem } from "@chakra-ui/react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, token } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [role, setRole] = useState("");
  const [joined, setJoined] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [pictureData, setPictureData] = useState("");

  if (!currentUser) navigate(`/`);

  useEffect(() => {
    let isMounted = true;
    setName(currentUser.name);
    setEmail(currentUser.email);
    setAvatar(currentUser.avatar);
    setRole(currentUser.isAdmin);
    setJoined(currentUser.created_date);
    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const fixData = (date) => {
    if (date) {
      const newDate = date.substr(8, 2) + "-" + date.substr(5, 2) + "-" + date.substr(0, 4);
      return newDate;
    } else {
      return date;
    }
  };

  const handleNameChange = (e) => (editMode ? setName(e.target.value) : "");
  const handleAvatarChange = (e) => setNewAvatar(e.target.files[0]);

  const handleUpload = () => {
    editMode ? uploadImage() : alert("please enable edit mode first");
  };

  const uploadImage = (e) => {
    const formData = new FormData();
    formData.append("file", newAvatar);
    formData.append("upload_preset", "arcade");
    axios
      .post("https://api.cloudinary.com/v1_1/amirbashan/image/upload", formData)
      .then((response) => {
        setPictureData(response.data.url);
        setAvatar(response.data.url);
        setAvatar("");
      })
      .catch((err) => console.log(err));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      let user;
      if (pictureData) {
        user = {
          name,
          email,
          avatar: pictureData,
        };
      } else {
        user = {
          name,
          email,
          avatar: avatar,
        };
      }
      if (window.confirm("Confirm changes")) {
        console.log(user);
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
      <Form className="d-flex m-auto my-3 w-75" onSubmit={(e) => handleOnSubmit(e)}>
        <Form.Group className="d-flex flex-column w-75 m-auto ">
          <WrapItem>
            <Avatar size="2xl" className="mx-auto" name={name} src={avatar} />
          </WrapItem>
          <div className="row mb-2">
            <div className="col d-flex flex-wrap align-items-end">
              <label>Email</label>
              <input type="text" readOnly value={email} className="form-control" />
            </div>
            <div className="col d-flex flex-wrap align-items-end">
              <label>Name</label>
              <input type="text" onChange={(e) => handleNameChange(e)} value={name} className="form-control" />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col d-flex flex-wrap align-items-end">
              <label>Role</label>
              <input type="text" readOnly value={role === 1 ? "Admin" : "User"} className="form-control" />
            </div>
            <div className="col d-flex flex-wrap align-items-end">
              <label>Joined date</label>
              <input type="text" readOnly value={fixData(joined)} className="form-control" />
            </div>
          </div>
          <div className="d-flex flex-column ">
            <label className="align-self-start">Change your Avatar</label>
            <div className="d-flex flex-row">
              <input type="file" onChange={handleAvatarChange} className="form-control mb-2" />
              <button type="button" onClick={handleUpload} className="form-control w-25 mb-2">
                Upload {pictureData && <>✔️</>}
              </button>
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
