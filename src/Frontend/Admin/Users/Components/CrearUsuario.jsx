import React, { useState, useEffect } from 'react';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Buton';
import './CrearUsuario.css'; 
import Swal from 'sweetalert2';

const CrearUsuario = ({ onCancel, userToEdit, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setRol] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [RUC, setRUC] = useState('');

  useEffect(() => {
    if (userToEdit) {
      setNombre(userToEdit.nombre || '');
      setEmail(userToEdit.email || '');
      setRol(userToEdit.profile || '');
      setDireccion(userToEdit.direccion || '');
      setTelefono(userToEdit.telefono || '');
      setRUC(userToEdit.RUC || '');
    }
  }, [userToEdit]);

  const handleSubmit = () => {
    const newUser = { nombre, email, direccion, telefono, RUC, profile };
    
    // Validación de campos vacíos
    const hasEmptyFields = Object.values(newUser).some(
      (value) => !value || value.trim() === ''
    );

    if (hasEmptyFields) {
      Swal.fire({
        title: 'Error',
        text: 'Debe completar todos los campos.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
      });
      return;
    }

    // Guardar el usuario si todo es correcto
    onSave(newUser);
  };

  return (
    <div className="crear-usuario">
      <h2>{userToEdit ? 'Editar Usuario' : 'Crear Usuario'}</h2>
      <div className="formulario">
        <div className="form-group">
          <label htmlFor="rol">Rol</label>
          <select
            id="rol"
            value={profile}
            onChange={(e) => setRol(e.target.value)}
            className="input-field"
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">Administrador</option>
            <option value="tecnico">Técnico</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <Input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fondo="Ingresa el nombre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fondo="Ingresa el email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <Input
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            fondo="Ingresa la dirección"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <Input
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            fondo="Ingresa el teléfono"
          />
        </div>

        <div className="form-group">
          <label htmlFor="RUC">RUC</label>
          <Input
            id="RUC"
            value={RUC}
            onChange={(e) => setRUC(e.target.value)}
            fondo="Ingresa el RUC o cédula"
          />
        </div>
      </div>

      <div className="botones">
        <Button texto="Guardar" onClick={() => handleSubmit()} estilo="boton-crear" />
        <Button texto="Cancelar" onClick={onCancel} estilo="boton-cancelar" />
      </div>
    </div>
  );
};

export default CrearUsuario;

