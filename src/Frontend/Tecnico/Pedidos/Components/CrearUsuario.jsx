import React, { useState, useEffect } from "react";
import Input from "../../../../Components/Input";
import Button from "../../../../Components/Buton";
import Swal from "sweetalert2";
import "./CrearUsuario.css";

const CrearUsuario = ({ onCancel, userToEdit, onSave }) => {
  const [pedido, SetPedido] = useState("");
  const [requerimiento, setRequerimiento] = useState("");
  const [rol, setRol] = useState("");

  useEffect(() => {
    if (userToEdit) {
      SetPedido(userToEdit.pedido);
      setRequerimiento(userToEdit.requerimiento);
      setRol(userToEdit.estado);
    }
  }, [userToEdit]);

  const handleSubmit = () => {
    // Validar campos requeridos
    if (!pedido.trim() || !requerimiento.trim() || !rol) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }

    // Si todo está bien, guardar los datos
    const newUser = { pedido, requerimiento, rol };
    onSave(newUser);

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: "success",
      title: userToEdit ? "Pedido actualizado" : "Pedido creado",
      text: "Los cambios se han guardado exitosamente.",
    });
  };

  return (
    <div className="crear-usuario">
      <h2>{userToEdit ? `Editar Pedido ${pedido}` : "Crear Usuario"}</h2>
      <div className="formulario">
        <div className="form-group">
          <label htmlFor="pedido">Pedido</label>
          <Input
            id="pedido"
            value={pedido}
            onChange={(e) => SetPedido(e.target.value)}
            placeholder="Ingresa el pedido"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="requerimiento">Cambios Realizados</label>
          <textarea
            id="requerimiento"
            style={{
              width: "1000px",
              height: "150px",
              border: "2px solid #ccc",
              borderRadius: "5px",
              padding: "20px",
              fontSize: "16px",
              resize: "vertical",
            }}
            value={requerimiento}
            onChange={(e) => setRequerimiento(e.target.value)}
            placeholder="Ingresa el requerimiento"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="rol">Rol</label>
          <select
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Selecciona un Estado</option>
            <option value="En Desarrollo">En Desarrollo</option>
            <option value="Terminado">Terminado</option>
          </select>
        </div>
      </div>

      <div className="botones">
        <Button texto="Guardar" onClick={handleSubmit} estilo="boton-crear" />
        <Button texto="Cancelar" onClick={onCancel} estilo="boton-cancelar" />
      </div>
    </div>
  );
};

export default CrearUsuario;

