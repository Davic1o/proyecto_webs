import React, { useState, useEffect } from 'react';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Buton';
import './CrearUsuario.css'; // Asegúrate de importar los estilos

const CrearUsuario = ({ onCancel, userToEdit, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    if (userToEdit) {
      setNombre(userToEdit.nombre);
      setEmail(userToEdit.email);
      setRol(userToEdit.rol);
    }
  }, [userToEdit]);

  const handleSubmit = () => {
    const newUser = { nombre, email, rol };
    onSave(newUser); // Guardar el usuario (nuevo o editado)
  };

  return (
    <div className="crear-usuario">
      <h2>{userToEdit ? 'Editar Usuario' : 'Crear Usuario'}</h2>
      <div className="formulario">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <Input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa el email"
          />
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
            <option value="">Selecciona un rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Técnico">Técnico</option>
            <option value="Cliente">Cliente</option>
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

