import React, { useState, useEffect } from "react";
import Input from "../../../../Components/Input";
import Button from "../../../../Components/Buton";
import Swal from "sweetalert2";
import "./CrearUsuario.css";

// Datos de provincias y ciudades
const provinciasConCiudades = {
  Azuay: { ciudades: ["Cuenca", "Gualaceo", "Paute", "Sigsig"] },
  Bolívar: { ciudades: ["Guaranda", "San Miguel", "Echeandía", "Caluma"] },
  Cañar: { ciudades: ["Azogues", "Biblián", "La Troncal"] },
  // ... demás provincias
  Pichincha: { ciudades: ["Quito", "Cayambe", "Sangolquí", "San Antonio de Pichincha"] },
};

// Simula la obtención del número de pedido actual por ciudad (reemplaza con llamada real al servidor)
const getNextPedidoNumber = (ciudad) => {
  const pedidosPorCiudad = {
    Quito: 2,
    Cuenca: 1,
    // ... otras ciudades
  };
  return (pedidosPorCiudad[ciudad] || 0) + 1;
};

const CrearUsuario = ({ onCancel, userToEdit, onSave }) => {
  const [pedido, setPedido] = useState("");
  const [requerimiento, SetRequerimiento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setPedido(userToEdit.pedido || "");
      SetRequerimiento(userToEdit.requerimiento || "");
      setProvincia(userToEdit.provincia || "");
      setCiudad(userToEdit.ciudad || "");
      setDireccion(userToEdit.direccion || "");
    }
  }, [userToEdit]);

  useEffect(() => {
    if (ciudad) {
      generatePedido(ciudad);
    }
  }, [ciudad]);

  const generatePedido = (ciudad) => {
    const initials = ciudad
      .split(" ")
      .map((word) => word.charAt(0).toLowerCase())
      .join("");
    const numeroPedido = getNextPedidoNumber(ciudad).toString().padStart(8, "0");
    setPedido(`Pe-${initials}-${numeroPedido}`);
  };

  const handleSubmit = () => {
    if (!requerimiento.trim() || !provincia.trim() || !ciudad.trim() || !direccion.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }

    const newPedido = { pedido, requerimiento, provincia, ciudad, direccion, rol:"Solicitado" };
    onSave(newPedido);

    Swal.fire({
      icon: "success",
      title: userToEdit ? "Pedido actualizado" : "Pedido creado",
      text: "Los cambios se han guardado exitosamente.",
    });
  };

  return (
    <div className="crear-usuario">
      <h2>{userToEdit ? `Editar Pedido ${pedido}` : "Crear Pedido"}</h2>
      <div className="formulario">
        {/* Nro de Pedido */}
        <div className="form-group">
          <label htmlFor="pedido">Nro de Pedido</label>
          <Input
            id="pedido"
            value={pedido}
            estado={'readonly'}
            placeholder="El número de pedido se generará automáticamente"
          />
        </div>

        {/* requerimiento del Pedido */}
        <div className="form-group">
          <label htmlFor="requerimiento">requerimiento del Pedido</label>
          <textarea
            id="requerimiento"
            value={requerimiento}
            onChange={(e) => SetRequerimiento(e.target.value)}
            placeholder="Ingresa el requerimiento del pedido"
            required
            style={{
              width: "100%",
              height: "150px",
              border: "2px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              fontSize: "16px",
              resize: "vertical",
            }}
          ></textarea>
        </div>

        {/* Provincia */}
        <div className="form-group">
          <label htmlFor="provincia">Provincia</label>
          <select
            id="provincia"
            value={provincia}
            onChange={(e) => {
              setProvincia(e.target.value);
              setCiudad(""); // Reinicia ciudad cuando se selecciona otra provincia
            }}
            className="input-field"
            required
          >
            <option value="">Selecciona una Provincia</option>
            {Object.keys(provinciasConCiudades).map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        {/* Ciudad */}
        <div className="form-group">
          <label htmlFor="ciudad">Ciudad</label>
          <select
            id="ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            className="input-field"
            required
            disabled={!provincia}
          >
            <option value="">Selecciona una Ciudad</option>
            {provincia &&
              provinciasConCiudades[provincia].ciudades.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>

        {/* Dirección */}
        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <Input
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Ingresa la dirección"
            required
          />
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
