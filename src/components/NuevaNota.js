import React from "react";
import "./NuevaNota.css";

const NuevaNota = ({
  setTitulo,
  titulo,
  setNota,
  nota,
  recogerTexto,
  editarTareaDb,
  setModoEdicion,
  crearNueva,
}) => {
  return (
    <div className="nueva  animate__animated animate__zoomIn">
      <div className="targeta">
        <input
          type="text"
          name="titulo"
          placeholder="Titulo"
          onChange={(e) => setTitulo(e.target.value)}
          value={titulo}
          autoComplete="off"
          className="inputs"
        />
        <textarea
          onChange={(e) => setNota(e.target.value)}
          type="text"
          name="nota"
          placeholder="Nota"
          rows="12"
          value={nota}
          className="inputs"
        ></textarea>
        <div>
          {crearNueva ? (
            <button className="btn-guardar" onClick={recogerTexto}>
              <i className="fas fa-check"></i>
            </button>
          ) : (
            <button className="btn-guardar" onClick={editarTareaDb}>
              <i className="fas fa-check"></i>
            </button>
          )}
          <button
            className="btn-eliminar"
            onClick={() => setModoEdicion(false)}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NuevaNota;
