import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Importar íconos
import Input from '../../../../Components/Input';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './Table.css';
import axios from 'axios';
import { FaPrint, FaFilePdf } from 'react-icons/fa'; // Importar íconos
import jsPDF from 'jspdf'; // Importar jsPDF
import 'jspdf-autotable'; // Extensión para tablas

const Table = ({ ventas, setVentas, token }) => {
  const [search, setSearch] = useState('');
  const formatoMoneda = new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  console.log(ventas)
  const filteredUsers = ventas.filter((venta) =>
    venta.nombre.toLowerCase().includes(search.toLowerCase())
  );

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
  

  

  const handleDelete = (venta) => {
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${venta.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`http://localhost:8000/facturas/${venta._id}`, {headers: {Authorization: `Bearer ${token}`}})
        .then((res)=>{
          setVentas(ventas.filter((v) => v._id !== res.data.data._id));
          Swal.fire(
            'Eliminado!',
            `El Pedido del ${venta.nombre} ha sido eliminado.`,
            'success'
          );
        })
        .catch((error) => {
          console.log("Respuesta fallida: " + error);
        })
        
      }
    });
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
          <p className="no-ventas">No hay ventas registrados.</p>
        ) : (
          <table className="tabla_users">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Factura</th>
                <th>Valor</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((venta, index) => (
                <tr key={index}>
                  <td>{venta.nombre}</td>
                  <td>{venta.nroFactura}</td>
                  <td>{formatoMoneda.format(venta.total) }</td>
                  <td>{new Date(venta.fecha).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
              })}</td>
                  <td>
                    <FaPrint
                      className="icon print-icon"
                      onClick={() => handlePrint(venta)}
                    />
                    <FaFilePdf
                      className="icon pdf-icon"
                      onClick={() => handleDownloadPDF(venta)}
                      />
                    <FaTrash
                      className="icon_delete-icon"
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

