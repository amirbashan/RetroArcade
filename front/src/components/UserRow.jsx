import React from "react";

export default function UserRow(props) {
  const { id, email, name, lastGame, isAdmin, created_date } = props.user;
  const handleAdmin = () => {
    // do later
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
