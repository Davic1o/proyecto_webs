import React, { useState } from 'react';
import { FaTrash, FaEdit} from 'react-icons/fa'; // Importar íconos
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Buton';
import CrearPedido from './CrearPedido';
import './Table.css';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert2


const Table = ({ pedidos, setPedidos, token, user,tecnicos}) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pedidoToEdit, setPedidoToEdit] = useState(null); // Para editar un pedido
  
  // Filtrar por el nombre del cliente
  console.log("estos son los pedidos recibidos:", pedidos)
  const filteredPedidos = pedidos.filter((pedido) =>
    pedido.cliente.toLowerCase().includes(search.toLowerCase())
  );
  const handleDelete = (pedido) => {
    if(pedido.estado!=="Solicitado"){
      Swal.fire({
        title: 'Acción no permitida',
        text: `No se puede eliminar un pedido que ya fue procesado`,
        icon: 'warning',
        confirmButtonColor: '##607493',
        confirmButtonText: 'Entendido',
        
      })
      return
    }
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
        console.log("user con su id", user._id)
        axios
        .delete(`http://localhost:8000/pedidos/cliente/${user._id}/${pedido._id}`,{headers: {Authorization: `Bearer ${token}`}})
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
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setPedidoToEdit(null); // Resetear pedido al abrir el modal
  };
  const handleEdit = (pedido) => {
    if(pedido.estado!=="Solicitado"){
      Swal.fire({
        title: 'Acción no permitida',
        text: `No se puede editar un pedido que ya fue procesado`,
        icon: 'warning',
        confirmButtonColor: '##607493',
        confirmButtonText: 'Entendido',
        
      })
      return
    }
    setPedidoToEdit(pedido); // Asignar el pedido a editar
    setIsModalOpen(true); // Abrir modal
  };
  const handleSavePedido = (newPedido) => {
    console.log("Este es el pedido que queremis esitar: ", newPedido)
    const urlEdi = `http://localhost:8000/pedidos/cliente/${user._id}/${newPedido._id}`;
    const urlCre= `http://localhost:8000/pedidos/`;
  const request = newPedido._id
    ? axios.put(urlEdi, newPedido,{headers: {Authorization:`Bearer ${token}`}}) // Actualizar pedido existente
    : axios.post(urlCre, newPedido,{headers: {Authorization:`Bearer ${token}`}}); // Crear nuevo pedido

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
            <CrearPedido
              onCancel={toggleModal}
              pedidoToEdit={pedidoToEdit}
              tecnicos={tecnicos}
              onSave={handleSavePedido}
              user={user}

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
                <th>Tecnico asignado</th>
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
                  <td>{pedido.estado}</td>
                  <td>
                    <FaTrash className="icon delete-icon"onClick={() => handleDelete(pedido)}/>
                    <FaEdit className="icon edit-icon" onClick={() => handleEdit(pedido)}/>
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

