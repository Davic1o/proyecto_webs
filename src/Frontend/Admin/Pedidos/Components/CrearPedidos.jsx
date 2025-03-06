import React, { useState, useEffect } from "react";
import Input from "../../../../Components/Input";
import Button from "../../../../Components/Buton";
import Swal from "sweetalert2";
import "./CrearPedido.css"

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

const CrearPedidos = ({ onCancel, pedidoToEdit, onSave,tecnicos,clientes }) => {
  const [pedido, setPedido] = useState("");
  const [requerimiento, SetRequerimiento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tecnico,setTecnico]= useState("")
  const [cliente,setCliente]= useState("")
  

  useEffect(() => {
    if (pedidoToEdit) {
      setPedido(pedidoToEdit.nroPedido || "");
      SetRequerimiento(pedidoToEdit.descripcion || "");
      setProvincia(pedidoToEdit.provincia || "");
      setCiudad(pedidoToEdit.ciudad || "");
      setDireccion(pedidoToEdit.direccion || "");
      setTecnico({nombre: pedidoToEdit.tecnico, id: pedidoToEdit.tecnico_id} || "")
      setCliente({nombre: pedidoToEdit.cliente, id: pedidoToEdit.cliente_id} || "")
    }
  }, [pedidoToEdit]);

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
    console.log("este es el nombre y tecnico", cliente.nombre, tecnico.nombre)
    if (!requerimiento.trim() || !provincia.trim() || !ciudad.trim() || !direccion.trim() || tecnico.nombre==null || cliente.nombre==null){
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }
    console.log(pedidoToEdit)
    
    let newPedido={}
    if(pedidoToEdit!=null){
      newPedido = {_id: pedidoToEdit._id, nroPedido: pedido, descripcion: requerimiento, provincia, ciudad, direccion, estado:pedidoToEdit.estado, cliente_id:cliente.id, tecnico_id:tecnico.id, fecha: pedidoToEdit.fecha };
      onSave(newPedido);
      return
    }
    newPedido = {nroPedido: pedido, descripcion: requerimiento, provincia, ciudad, direccion, estado:"Solicitado", cliente_id:cliente.id, tecnico_id:tecnico.id, fecha: new Date() };
    onSave(newPedido);
    console.log("Este es el nuevo pedido", newPedido)
    
    
  };

  return (
    <div className="crear-pedido">
      <h2>{pedidoToEdit ? `Editar Pedido ${pedido}` : "Crear Pedido"}</h2>
      <div className="formulario-pedido">
        {/* Nro de Pedido */}
        <div className="form-group-pedido">
          <label htmlFor="pedido">Nro de Pedido</label>
          <Input
            id="pedido"
            value={pedido}
            estado={'readonly'}
            placeholder="El número de pedido se generará automáticamente"
          />
        </div>

        {/* requerimiento del Pedido */}
        <div className="form-group-pedido">
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
        <div className="form-group-pedido">
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
        <div className="form-group-pedido">
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
        <div className="form-group-pedido">
          <label htmlFor="direccion">Dirección</label>
          <Input
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Ingresa la dirección"
            required
          />
        </div>
        <div className="form-group-pedido">
          <label htmlFor="rol">Técnico</label>
          <select
            id="rol"
            value={tecnico.id || ""}
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedTecnico = tecnicos.find((tec) => tec._id === selectedId);
              setTecnico({
                id: selectedId,
                nombre: selectedTecnico?.nombre || ""
              });
            }}
            className="input-field"
            required
          >
            <option value="">{tecnico.nombre ? tecnico.nombre : "Selecciona un técnico"}</option>
            {tecnicos.map((tec) => (
              <option key={tec._id} value={tec._id}>
                {tec.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group-pedido">
          <label htmlFor="rol">Cliente</label>
          <select
             id="cliente"
             value={cliente.id || ""}
             onChange={(e) => {
               const selectedId = e.target.value;
               const selectedCliente = clientes.find((cli) => cli._id === selectedId);
               setCliente({
                 id: selectedId,
                 nombre: selectedCliente?.nombre || ""
               });
             }}
             className="input-field"
             required
           >
             <option value="">{cliente.nombre ? cliente.nombre : "Selecciona un cliente"}</option>
             {clientes.map((cli) => (
               <option key={cli._id} value={cli._id}>
                 {cli.nombre}
               </option>
             ))}
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

export default CrearPedidos;
