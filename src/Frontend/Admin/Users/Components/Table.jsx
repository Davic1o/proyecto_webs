import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar íconos
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Buton';
import CrearUsuario from './CrearUsuario';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './Table.css';
import axios from 'axios';

const Table = ({ usuarios, setUsuarios }) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null); // Para editar un usuario
  const token = localStorage.getItem('token');
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
    console.log(user._id);
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
            // Eliminar usuario por ID
            axios
                .delete(`http://localhost:8000/users/${user._id}`, {headers: {Authorization: `Bearer ${token}`}})
                .then((res) => {
                  console.log("esta es la respuesta al eliminar:" +res)
                  setUsuarios((prevUsuarios) => prevUsuarios.filter((u) => u._id !== user._id));
                    Swal.fire(
                        'Eliminado!',
                        `El usuario ${user.nombre} ha sido eliminado.`,
                        'success'
                    );
                })
                .catch((error) => {
                    console.log("Respuesta fallida: " + error);
                    Swal.fire(
                        'Error!',
                        'No se pudo eliminar el usuario. Intenta de nuevo.',
                        'error'
                    );
                });
        }
    });
};

  const handleSaveUser = (newUser) => {
    console.log(userToEdit)
    if (userToEdit) {
      // Si estamos editando un usuario, lo actualizamos
      axios
        .put(`http://localhost:8000/users/${userToEdit._id}`, newUser, {headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
          // Actualizamos el array de usuarios con la respuesta del servidor
          setUsuarios((prevUsuarios) =>
            prevUsuarios.map((user) =>
              user._id === userToEdit._id ? res.data.data : user
            )
          );
        })
        .catch((error) => {
          console.log("Respuesta fallida: " + error);
        });
    } else {
      // Si no estamos editando, agregamos uno nuevo
      console.log("este es el usuario que se esta mandando",newUser)
      axios
        .post("http://localhost:8000/users", newUser, {headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
          setUsuarios((prevUsuarios) => [...prevUsuarios, res.data.data]);
        })
        .catch((error) => {
          console.log("Respuesta fallida: " + error.message);
        });
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
          <div className="modal-content-users">
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
                  <td>{user.profile}</td>
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

