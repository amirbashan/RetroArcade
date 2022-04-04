import React from "react";
import { Link } from "react-router-dom";

export default function AdminNav() {
  return (
    <nav className="d-flex justify-content-center ">
      <Link to="/admin/traffic" className="px-5 nav-link display-6">
        Game statistics
      </Link>
      <Link to="/admin/usersList" className="px-5 nav-link display-6">
        Users List
      </Link>
    </nav>
  );
}
