import React, { useContext } from "react";
import { makeAdmin } from "../lib/UsersDB";
import { AppContext } from "../Context/AppContext";

export default function UserRow(props) {
  const { id, email, name, isAdmin, created_date } = props.user;
  const { token } = useContext(AppContext);
  const handleAdmin = async () => {
    if (!isAdmin) {
      if (window.confirm(`Are you sure you want to make ${name} an Admin?`)) {
        const response = await makeAdmin(token, id);
        if (response.affectedRows === 1) alert("Edit Successful\nPlease refresh to see the update");
      }
    } else alert(`${name} is already an Admin`);
  };

  const fixData = (date) => {
    const newDate = date.substr(8, 2) + "-" + date.substr(5, 2) + "-" + date.substr(0, 4);
    return newDate;
  };

  return (
    <tr>
      <td colSpan="1" className="text-center">
        {id}
      </td>
      <td colSpan="1" className="text-center">
        {email}
      </td>
      <td colSpan="1" className="text-center">
        {name}
      </td>
      <td colSpan="1" className="text-center">
        {fixData(created_date)}
      </td>
      <td colSpan="1" className="text-center">
        {isAdmin ? "Admin" : "User"}
      </td>
      <td colSpan="1" className="text-center">
        <button className="btn btn-sm btn-link" onClick={handleAdmin}>
          Make Admin
        </button>
      </td>
    </tr>
  );
}
