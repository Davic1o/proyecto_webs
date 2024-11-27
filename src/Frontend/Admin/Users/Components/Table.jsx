import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar íconos
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Buton';
import CrearUsuario from './CrearUsuario';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './Table.css';

const Table = ({ usuarios, setUsuarios }) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null); // Para editar un usuario

  const filteredUsers = usuarios.filter((user) =>
    user.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setUserToEdit(null); // Resetear usuario al abrir el modal
  };

  const handleEdit = (user) => {
    setUserToEdit(user); // Asignar el usuario a editar
    setIsModalOpen(true); // Abrir modal
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${user.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar usuario por email
        setUsuarios(usuarios.filter((u) => u.email !== user.email));
        Swal.fire(
          'Eliminado!',
          `El usuario ${user.nombre} ha sido eliminado.`,
          'success'
        );
      }
    });
  };

  const handleSaveUser = (newUser) => {
    if (userToEdit) {
      // Si estamos editando un usuario, lo actualizamos
      setUsuarios(usuarios.map((user) =>
        user.email === userToEdit.email ? newUser : user
      ));
    } else {
      // Si no estamos editando, agregamos uno nuevo
      setUsuarios([...usuarios, newUser]);
    }
    setIsModalOpen(false); // Cerrar el modal
  };

  return (
    <div className="Contendor-generaltabla">
      <div className="filter-container">
        <Input
          fondo="nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <Button texto={'Crear Usuario'} estilo={'aceptar'} type onClick={toggleModal} />
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <CrearUsuario
              onCancel={toggleModal}
              userToEdit={userToEdit}
              onSave={handleSaveUser}
            />
          </div>
        </div>
      )}

      <div className="Contendor-tabla">
        {filteredUsers.length === 0 ? (
          <p className="no-usuarios">No hay usuarios registrados.</p>
        ) : (
          <table className="tabla_users">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>{user.rol}</td>
                  <td>
                    <FaEdit
                      className="icon edit-icon"
                      onClick={() => handleEdit(user)}
                    />
                    <FaTrash
                      className="icon delete-icon"
                      onClick={() => handleDelete(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Table;

