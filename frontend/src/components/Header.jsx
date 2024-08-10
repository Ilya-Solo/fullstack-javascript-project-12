import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import { selectIsAuthenticated } from "../slices/authSlice";

const Navbar = () => {
  const isAuth = useSelector(selectIsAuthenticated);

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        {isAuth && <LogoutButton />}
      </div>
    </nav>
  );
};

export default Navbar;
