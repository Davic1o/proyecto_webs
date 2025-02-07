import React, { useState } from 'react';
import { FaPrint, FaFilePdf } from 'react-icons/fa'; // Importar íconos
import Input from '../../../../Components/Input';
import jsPDF from 'jspdf'; // Importar jsPDF
import 'jspdf-autotable'; // Extensión para tablas
import './Table.css';

const Table = ({ ventas, SetVentas, user }) => {
  const [search, setSearch] = useState('');
  
  const filteredUsers = ventas.filter((pedido) =>
    pedido.nombre.toLowerCase().includes(search.toLowerCase())
  );
  const formatoMoneda = new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  

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
        <p><strong>Cliente:</strong> ${pedido.nombre}</p>
        <p><strong>Factura:</strong> ${pedido.nroFactura}</p>
        <p><strong>Valor:</strong> ${formatoMoneda.format(pedido.total)}</p>
        
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
    doc.text(`Cliente: ${pedido.nombre}`, 20, 40);
    doc.text(`Factura: ${pedido.nroFactura}`, 20, 50);
    doc.text(`Valor: ${formatoMoneda.format(pedido.total)}`, 20, 60);
   

    // Guardar como archivo PDF
    doc.save(`Pedido_${pedido.nroFactura}.pdf`);
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
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((pedido, index) => (
                <tr key={index}>
                  <td>{pedido.nombre}</td>
                  <td>{pedido.nroFactura}</td>
                  <td>{formatoMoneda.format(pedido.total)}</td>
                  <td>{new Date(pedido.fecha).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
              })}</td>
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
