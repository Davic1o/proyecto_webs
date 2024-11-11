import React, { Component } from "react";
import './Table.css';

class Table extends Component {
  render() {
    const { ventas } = this.props; // Recibir los datos de usuarios como prop

    return (
      <div>
        <table className="tabla_users">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Factura</th>
              <th>Valor</th>
              <th>Estado</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta, index) => (
              <tr key={index}>
                <td>{venta.cliente}</td>
                <td>{venta.factura}</td>
                <td>{venta.valor}</td>
                <td>{venta.estado}</td>
                <td>
                  <span className="edit">✏️</span>
                  <span className="delete">🗑️</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
