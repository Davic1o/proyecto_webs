import React, { useState, useEffect } from 'react';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Buton';
import './CrearPedido.css'; // Asegúrate de importar los estilos

const CrearPedido = ({ onCancel, pedidoToEdit, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [tecnico, setTecnico] = useState('');
  const [trabajo, setTrabajo] = useState('');

  // Si hay un pedido a editar, cargamos los valores en los campos
  useEffect(() => {
    if (pedidoToEdit) {
      setNombre(pedidoToEdit.cliente);
      setTecnico(pedidoToEdit.tecnico);
      setTrabajo(pedidoToEdit.trabajo);
    }
  }, [pedidoToEdit]);

  const handleSubmit = () => {
    const newPedido = { cliente: nombre, tecnico, trabajo };
    onSave(newPedido); // Guardar el pedido (nuevo o editado)
  };

  return (
    <div className="crear-pedido">
      <h2>{pedidoToEdit ? 'Editar Pedido' : 'Crear Pedido'}</h2>
      <div className="formulario">
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Cliente</label>
          <Input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre del cliente"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tecnico">Técnico</label>
          <select
            id="tecnico"
            value={tecnico}
            onChange={(e) => setTecnico(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Selecciona un técnico</option>
            <option value="David Vega">David Vega</option>
            <option value="Dennis Pérez">Dennis Pérez</option>
            <option value="Bryan Lugmaia">Bryan Lugmaia</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="trabajo">Estado del Trabajo</label>
          <select
            id="trabajo"
            value={trabajo}
            onChange={(e) => setTrabajo(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Selecciona el estado</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Rechazado">Rechazado</option>
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

export default CrearPedido;


