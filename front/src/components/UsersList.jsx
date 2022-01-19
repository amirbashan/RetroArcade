import React, { useState, useEffect, useContext } from "react";
import { getUsersTableInfo } from "../lib/UsersDB";
import { AppContext } from "../Context/AppContext";
import UserRow from "./UserRow";

export default function UsersList() {
  const [myTable, setMyTable] = useState([]);
  const { token } = useContext(AppContext);

  useEffect(() => {
    getUsersTableInfo(token).then((res) => {
      console.log(res);
      setMyTable(res);
    });
  }, [token]);

  return (
    <div className="d-flex flex-column px-5 mt-2">
      <h1 className="m-auto mb-2">PetsList</h1>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col" colSpan="1" className="text-center">
              userId
            </th>
            <th scope="col" colSpan="1" className="text-center">
              email
            </th>
            <th scope="col" colSpan="1" className="text-center">
              name
            </th>
            <th scope="col" colSpan="1" className="text-center">
              Joined date
            </th>
            <th scope="col" colSpan="1" className="text-center">
              Role
            </th>
            <th scope="col" colSpan="1" className="text-center">
              make admin
            </th>
          </tr>
        </thead>
        <tbody>
          {myTable.map((user) => {
            return <UserRow key={user.email} user={user} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
