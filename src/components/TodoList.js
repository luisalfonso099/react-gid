import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import Notas from "./Notas";
import NuevaNota from "./NuevaNota";
import "../style.css";

const TodoList = ({ user }) => {
  const [titulo, setTitulo] = useState("");
  const [lista, setLista] = useState([]);
  const [nota, setNota] = useState("");
  const [id, setId] = useState("");
  const [crearNueva, setCrearNueva] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(false);
  const opciones = {
    weekday: "long",
    mont: "numeric",
    day: "numeric",
    year: "numeric",
  };
  const hoy = new Date();
  const fecha = hoy.toLocaleDateString("es-AR", opciones);
  const hora = hoy.getHours() + " : " + hoy.getMinutes();

  const editarTarea = (item) => {
    setModoEdicion(true);
    setNota(item.nota);
    setTitulo(item.titulo);
    setId(item.id);
    setCrearNueva(false);
  };
  const editarTareaDb = async (e) => {
    e.preventDefault();
    try {
      await db.collection(user.uid).doc(id).update({
        nota: nota,
        titulo: titulo,
      });
      const listaEditada = lista.map((item) =>
        item.id === id
          ? { id: item.id, dia: item.dia, nota: item.nota, titulo: item.titulo }
          : item
      );
      setLista(listaEditada);
      setNota("");
      setTitulo("");
      setId("");
      setModoEdicion(false);
      setCrearNueva(true);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id) => {
    await db.collection(user.uid).doc(id).delete();
    const listaFiltrada = lista.filter((i) => i.id !== id);
    setLista(listaFiltrada);
  };

  const recogerTexto = async (e) => {
    e.preventDefault();
    setLista([...lista, { titulo, nota }]);
    setTitulo("");
    setNota("");
    setModoEdicion(false);
    await db
      .collection(user.uid)
      .add({ titulo: titulo, nota, dia: fecha, hora });
  };
  useEffect(() => {
    const datos = async () => {
      try {
        const data = await db.collection(user.uid).get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLista(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    datos();
  }, [nota, user]);
  const nuevaNota = () => {
    setModoEdicion(true);
    setCrearNueva(true);
  };
  return (
    <div>
      {modoEdicion === false ? (
        <button
          className="btn-nueva animate__animated animate__flipInX"
          onClick={nuevaNota}
        >
          Nueva nota _<i className="fas fa-pencil-alt"></i>
        </button>
      ) : null}
      <div className="text-center center">
        {modoEdicion ? (
          <NuevaNota
            setTitulo={setTitulo}
            titulo={titulo}
            setNota={setNota}
            nota={nota}
            recogerTexto={recogerTexto}
            modoEdicion={modoEdicion}
            editarTareaDb={editarTareaDb}
            setModoEdicion={setModoEdicion}
            setCrearNueva={setCrearNueva}
            crearNueva={crearNueva}
          />
        ) : (
          <Notas
            lista={lista}
            eliminar={eliminar}
            recogerTexto={recogerTexto}
            editarTarea={editarTarea}
          />
        )}
      </div>
    </div>
  );
};

export default TodoList;
