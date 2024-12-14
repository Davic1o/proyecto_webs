import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar íconos
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Buton';
import CrearPedido from './CrearPedido';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './Table.css';

const Table = ({ pedidos, setPedidos }) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pedidoToEdit, setPedidoToEdit] = useState(null); // Para editar un pedido

  // Filtrar por el nombre del cliente
  const filteredPedidos = pedidos.filter((pedido) =>
    pedido.cliente.toLowerCase().includes(search.toLowerCase())
  );

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setPedidoToEdit(null); // Resetear pedido al abrir el modal
  };

  const handleEdit = (pedido) => {
    setPedidoToEdit(pedido); // Asignar el pedido a editar
    setIsModalOpen(true); // Abrir modal
  };

  const handleDelete = (pedido) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el pedido de: ${pedido.cliente}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar pedido por id
        setPedidos(pedidos.filter((p) => p.id !== pedido.id));
        Swal.fire(
          'Eliminado!',
          `El Pedido del ${pedido.cliente} ha sido eliminado.`,
          'success'
        );
      }
    });
  };

  const handleSavePedido = (newPedido) => {
    if (pedidoToEdit) {
      // Si estamos editando un pedido, lo actualizamos
      setPedidos(pedidos.map((pedido) =>
        pedido.id === pedidoToEdit.id ? newPedido : pedido
      ));
    } else {
      // Si no estamos editando, agregamos uno nuevo
      setPedidos([...pedidos, newPedido]);
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
        <div className="modal">
          <div className="modal-content">
            <CrearPedido
              onCancel={toggleModal}
              pedidoToEdit={pedidoToEdit}
              onSave={handleSavePedido}
            />
          </div>
        </div>
      )}

      <div className="Contendor-tabla">
        {filteredPedidos.length === 0 ? (
          <p className="no-pedidos">No hay pedidos registrados.</p>
        ) : (
          <table className="tabla_users">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Técnico</th>
                <th>Trabajo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPedidos.map((pedido, index) => (
                <tr key={index}>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.tecnico}</td>
                  <td>{pedido.trabajo}</td>
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

