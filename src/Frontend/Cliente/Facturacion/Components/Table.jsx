import React, { useState } from 'react';
import { FaPrint, FaFilePdf } from 'react-icons/fa'; // Importar íconos
import Input from '../../../../Components/Input';
import CrearUsuario from './CrearUsuario';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import jsPDF from 'jspdf'; // Importar jsPDF
import 'jspdf-autotable'; // Extensión para tablas
import './Table.css';

const Table = ({ ventas, SetVentas }) => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null); // Para editar un usuario

  const filteredUsers = ventas.filter((pedido) =>
    pedido.factura.toLowerCase().includes(search.toLowerCase())
  );

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setUserToEdit(null); // Resetear usuario al abrir el modal
  };

  const handleSaveUser = (newUser) => {
    if (userToEdit) {
      SetVentas(ventas.map((pedido) =>
        pedido.pedido === userToEdit.pedido ? newUser : pedido
      ));
    } else {
      SetVentas([...ventas, newUser]);
    }
    setIsModalOpen(false);
  };

  const handlePrint = (pedido) => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
<html>
  <head>
    <title>Imprimir Pedido</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        color: #333;
      }
      .container {
        border: 1px solid #ddd;
        padding: 20px;
        border-radius: 8px;
        max-width: 600px;
        margin: auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      h1 {
        text-align: center;
        color: #007bff;
      }
      .detail {
        margin: 10px 0;
        padding: 10px;
        background-color: #f9f9f9;
        border-left: 4px solid #007bff;
        border-radius: 4px;
      }
      .detail strong {
        color: #555;
      }
      footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Detalle del Pedido</h1>
      <div class="detail">
        <p><strong>Cliente:</strong> ${pedido.cliente}</p>
        <p><strong>Factura:</strong> ${pedido.factura}</p>
        <p><strong>Valor:</strong> ${pedido.valor}</p>
        <p><strong>Estado:</strong> ${pedido.estado}</p>
      </div>
      <footer>
        Este documento fue generado automáticamente.
      </footer>
    </div>
  </body>
</html>

    `);
    newWindow.document.close();
    newWindow.print();
  };

  const handleDownloadPDF = (pedido) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Detalle del Pedido', 20, 20);
    doc.setFontSize(12);
    doc.text(`Cliente: ${pedido.cliente}`, 20, 40);
    doc.text(`Factura: ${pedido.factura}`, 20, 50);
    doc.text(`Valor: ${pedido.valor}`, 20, 60);
    doc.text(`Estado: ${pedido.estado}`, 20, 70);

    // Guardar como archivo PDF
    doc.save(`Pedido_${pedido.factura}.pdf`);
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
          <p className="no-ventas">No hay ventas registradas.</p>
        ) : (
          <table className="tabla_users">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Nro de factura</th>
                <th>Valor</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((pedido, index) => (
                <tr key={index}>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.factura}</td>
                  <td>{pedido.valor}</td>
                  <td>{pedido.estado}</td>
                  <td>
                    <FaPrint
                      className="icon print-icon"
                      onClick={() => handlePrint(pedido)}
                    />
                    <FaFilePdf
                      className="icon pdf-icon"
                      onClick={() => handleDownloadPDF(pedido)}
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
