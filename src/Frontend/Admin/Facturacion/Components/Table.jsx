import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar íconos
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Buton';
import CrearVenta from './CrearVenta';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './Table.css';

const Table = ({ ventas, setVentas }) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null); // Para editar un usuario

  const filteredUsers = ventas.filter((venta) =>
    venta.cliente.toLowerCase().includes(search.toLowerCase())
  );

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setUserToEdit(null); // Resetear usuario al abrir el modal
  };

  const handleEdit = (venta) => {
    setUserToEdit(venta); // Asignar el usuario a editar
    setIsModalOpen(true); // Abrir modal
  };

  const handleDelete = (venta) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${venta.cliente}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar usuario por email
        setVentas(ventas.filter((u) => u.cliente !== venta.cliente));
        Swal.fire(
          'Eliminado!',
          `El usuario ${venta.cliente} ha sido eliminado.`,
          'success'
        );
      }
    });
  };

  const handleSaveUser = (newUser) => {
    if (userToEdit) {
      // Si estamos editando un usuario, lo actualizamos
      setVentas(ventas.map((venta) =>
        venta.email === userToEdit.email ? newUser : venta
      ));
    } else {
      // Si no estamos editando, agregamos uno nuevo
      setVentas([...ventas, newUser]);
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
        <Button texto={'Crear Venta'} estilo={'aceptar'} type onClick={toggleModal} />
      </div>

      {isModalOpen && (
        <div className="modal-factura">
          <div className="modal-contentf">
            <CrearVenta
              onCancel={toggleModal}
              userToEdit={userToEdit}
              onSave={handleSaveUser}
            />
          </div>
        </div>
      )}

      <div className="Contendor-tabla">
        {filteredUsers.length === 0 ? (
          <p className="no-ventas">No hay ventas registrados.</p>
        ) : (
          <table className="tabla_users">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Factura</th>
                <th>Valor</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((venta, index) => (
                <tr key={index}>
                  <td>{venta.cliente}</td>
                  <td>{venta.factura}</td>
                  <td>{venta.valor}</td>
                  <td>{venta.estado}</td>
                  <td>
                    <FaEdit
                      className="icon edit-icon"
                      onClick={() => handleEdit(venta)}
                    />
                    <FaTrash
                      className="icon delete-icon"
                      onClick={() => handleDelete(venta)}
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

