import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import TodoList from "./TodoList";
import "./Admin.css";

const Admin = ({ history }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
      } else {
        history.push("/login");
      }
    }, 500);
  }, [history]);
  console.log(auth.currentUser);
  return (
    <div>
      <TodoList user={user} />
    </div>
  );
};

export default withRouter(Admin);
