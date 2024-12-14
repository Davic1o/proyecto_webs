import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Importar íconos
import Input from '../../../../Components/Input';
import CrearUsuario from './CrearUsuario';
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

