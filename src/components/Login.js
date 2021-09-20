import React, { useCallback, useState } from "react";
import { withRouter } from "react-router-dom";
import { auth, db } from "../firebase";
import "./Login.css";
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [esRegistro, setEsRegistro] = useState(true);
  const procesarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Ingrese email");
      return;
    }
    if (!pass.trim()) {
      setError("Ingrese password");
      return;
    }
    if (pass.length < 6) {
      setError("Ingrese password debe ser mayor a 6 caracteres");
    }
    setError(null);
    if (esRegistro) {
      regitrar();
    } else {
      login();
    }
  };
  const login = useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, pass);
      console.log(res.user);
      setError(null);
      setPass("");
      setEmail("");
      history.push("/admin");
    } catch (error) {
      if (error.code === "auth/user-not-found") setError("Email no existe...");
      if (error.code === "auth/wrong-password") {
        setError("Contraseña inavlida");
      }
    }
  }, [email, pass, history]);
  const regitrar = useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      await db.collection("usuarios").doc(res.user.uid).set({
        email: res.user.email,
        uid: res.user.uid,
      });
      await db.collection(res.user.uid).add();
      setError(null);
      setPass("");
      setEmail("");
      history.push("/admin");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") setError("Email no valido");
      if (error.code === "auth/email-already-in-use") {
        setError("Email ya usado");
      }
    }
  }, [email, pass, history]);
  return (
    <div className="formulario-contenedor">
      <form onSubmit={procesarDatos} className="formulario">
        <h3 className="tiulo-formulario">
          {esRegistro ? "Registro de usuario" : "Login deacceso"}
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}
        <input
          type="email"
          className="inputs-formulario"
          placeholder="Ingrese un email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="inputs-formulario"
          placeholder="Ingrese un password "
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button className="registro" type="submit">
          {esRegistro ? "Registrarse" : "Acceder"}
        </button>
        <button
          onClick={() => setEsRegistro(!esRegistro)}
          className="registrado"
          type="button"
        >
          {esRegistro ? "Ya estas registrado" : "No tienes cuenta"}
        </button>
      </form>
    </div>
  );
};

export default withRouter(Login);
