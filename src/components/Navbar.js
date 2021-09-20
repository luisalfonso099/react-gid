import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ firebaseUser, history }) => {
  const cerrarSesion = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };
  return (
    <div className="nav">
      <h2 className="usuario">
        {firebaseUser !== null ? firebaseUser.email : "Todo List"}
      </h2>
      <div className="links">
        {firebaseUser !== null ? (
          <NavLink className="link" to="/admin">
            Admin
          </NavLink>
        ) : null}

        {firebaseUser !== null ? (
          <button onClick={() => cerrarSesion()} className="cerrar-sesion">
            Cerrar Sesion
          </button>
        ) : (
          <NavLink className="link" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navbar);
