import React, { useState} from 'react';
import { FaEdit, FaTrash, } from 'react-icons/fa'; // Importar íconos
import { FaFileInvoiceDollar } from "react-icons/fa6";
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Buton';
import CrearVenta from './CrearVenta'
import CrearPedidos from './CrearPedidos';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './Table.css';
import axios from 'axios';

const Table = ({ pedidos, setPedidos,clientes, tecnicos }) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFacturarOpen, setIsFacturarOpen]=useState(false)
  const [pedidoToEdit, setPedidoToEdit] = useState(null); // Para editar un pedido
  const token =localStorage.getItem('token');
 
  
  
  // Filtrar por el nombre del cliente
  const filteredPedidos = pedidos.filter((pedido) =>
    pedido.cliente.toLowerCase().includes(search.toLowerCase())
  );

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setPedidoToEdit(null); // Resetear pedido al abrir el modal
  };
  const toggleFacturar = (pedido) => {
    setIsFacturarOpen((prev) => !prev);
    setPedidoToEdit(pedido); 
  };

  const handleEdit = (pedido) => {
    setPedidoToEdit(pedido); // Asignar el pedido a editar
    setIsModalOpen(true); // Abrir modal
  };

  const handleEditState = (pedido,nuevoEstado) => {
    const pedidoActualizado = { ...pedido, estado: nuevoEstado }; // Crear una copia con el nuevo estado
    handleSavePedido(pedidoActualizado); // Guardar el pedido actualizado
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
        axios
        .delete(`http://localhost:8000/pedidos/${pedido._id}`,{headers: {Authorization: `Bearer ${token}`}})
        .then((res)=>{
          setPedidos(pedidos.filter((p) => p._id !== res.data.data._id));
        })
        .catch((error) => {
          console.log("Respuesta fallida: " + error);
        })
        Swal.fire(
          'Eliminado!',
          `El Pedido del ${pedido.cliente} ha sido eliminado.`,
          'success'
        );
      }
    });
  };

  const handleSavePedido = (newPedido) => {
    console.log("Este es el pedido que queremis esitar: ", newPedido)
    const url = `http://localhost:8000/pedidos/${newPedido._id || ""}`;
  const request = newPedido._id
    ? axios.put(url, newPedido,{headers: {Authorization:`Bearer ${token}`}}) // Actualizar pedido existente
    : axios.post(url, newPedido,{headers: {Authorization:`Bearer ${token}`}}); // Crear nuevo pedido

  request
    .then((res) => {
      setPedidos((prevPedidos) => {
        if (newPedido._id) {
          // Actualizar el pedido editado
          return prevPedidos.map((pedido) =>
            pedido._id === newPedido._id ? res.data.data : pedido
          );
        }
        // Añadir nuevo pedido
        return [...prevPedidos, res.data.data];
      });
    })
    .catch((error) => {
      console.log("Error al guardar el pedido:", error);
    });
  
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
        <div className="modal-pedido">
          <div className="modal-content-pedidos">
            <CrearPedidos
              onCancel={toggleModal}
              pedidoToEdit={pedidoToEdit}
              tecnicos={tecnicos}
              clientes={clientes}
              onSave={handleSavePedido}
            />
          </div>
        </div>
      )}
      {isFacturarOpen && (
        <div className="modal-factura">
          <div className="modal-contentf">
            <CrearVenta
              onCancel={toggleFacturar}
              pedido={pedidoToEdit}
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
                <th>Requerimiento</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredPedidos.map((pedido, index) => (
                <tr key={index}>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.tecnico}</td>
                  <td>{pedido.descripcion}</td>
                  <td>{new Date(pedido.fecha).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
              })}</td>
                  <td>
                    <select value={pedido.estado} name="" id=""  onChange={(e) => handleEditState(pedido, e.target.value)}>
                      
                      <option value="Solicitado">Solicitado</option>
                      <option value="Rechazado">Rechazado</option>
                      <option value="En desarrollo">En desarrollo</option>
                      <option value="Terminado">Terminado</option>
                      <option value="Realizado">Realizado</option>
                    </select>
                    
                    </td>
                  <td>
                    <FaFileInvoiceDollar onClick={()=>toggleFacturar(pedido)} />
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

