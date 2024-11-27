import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar íconos
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Buton';
import CrearUsuario from './CrearUsuario';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './Table.css';

const Table = ({ pedidos, SetPedidos }) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null); // Para editar un usuario

  const filteredUsers = pedidos.filter((pedido) =>
    pedido.pedido.toLowerCase().includes(search.toLowerCase())
  );

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setUserToEdit(null); // Resetear usuario al abrir el modal
  };

  const handleEdit = (pedido) => {
    setUserToEdit(pedido); // Asignar el usuario a editar
    setIsModalOpen(true); // Abrir modal
  };

  const handleDelete = (pedido) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${pedido.pedido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar usuario por email
        SetPedidos(pedidos.filter((u) => u.pedido !== pedido.pedido));
        Swal.fire(
          'Eliminado!',
          `El pedido ${pedido.pedido} ha sido eliminado.`,
          'success'
        );
      }
    });
  };

  const handleSaveUser = (newUser) => {
    if (userToEdit) {
      // Si estamos editando un usuario, lo actualizamos
      SetPedidos(pedidos.map((pedido) =>
        pedido.pedido === userToEdit.pedido ? newUser : pedido
      ));
    } else {
      // Si no estamos editando, agregamos uno nuevo
      SetPedidos([...pedidos, newUser]);
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
         <Button texto={'Crear Pedido'} estilo={'aceptar'} type onClick={toggleModal} />
      </div>

      {isModalOpen && (
        <div className="modal-pedido ">
          <div className="modal-content-pedido">
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
          <p className="no-pedidos">No hay pedidos registrados.</p>
        ) : (
          <table className="tabla_users">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Reqwuerimiento</th>
                <th>estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((pedido, index) => (
                <tr key={index}>
                  <td>{pedido.pedido}</td>
                  <td>{pedido.requerimiento}</td>
                  <td>{pedido.rol}</td>
                  <td>
                    <FaEdit
                      className="icon edit-icon"
                      onClick={() => handleEdit(pedido)}
                    />
                                        <FaTrash
                      className="icon delete-icon"
                      onClick={() => handleDelete(pedido)}
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

