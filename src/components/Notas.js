import React from "react";
import "./Notas.css";

const Notas = ({ lista, eliminar, editarTarea }) => {
  return (
    <div className="notas_guardadas animate__animated animate__zoomIn">
      {lista.length === 0 ? (
        <img src="./images/entrada.png" alt="imagen-de-portada" />
      ) : (
        lista.map((item, index) => {
          return (
            <div
              className="nota animate__animated animate__slideInDown"
              key={index}
            >
              <div className="header_nota">
                #{index + 1}
                <p>{item.dia}</p>
              </div>
              <div className="">
                <h5 className="titulo" key={index}>
                  {item.titulo}
                </h5>
                <div className="parrafo">
                  <p>{item.nota}</p>
                </div>
                <p className="hora"> hr {item.hora}</p>
              </div>
              <div>
                <button
                  onClick={() => eliminar(item.id)}
                  className="btn-eliminar"
                >
                  <i className="far fa-trash-alt"></i>
                </button>
                <button
                  className="btn-editar"
                  onClick={() => editarTarea(item)}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Notas;
