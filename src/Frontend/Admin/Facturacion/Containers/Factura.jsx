import React, { Component } from "react";
import "./Factura.css";

class Factura extends Component {
  state = {
    cliente: "",
    email: "",
    direccion: "",
    ciRuc: "",
    telefono: "",
    productos: [
      { id: 1, descripcion: "Instalación puente", cantidad: 1, precioUnitario: 20.35, grabaIva: false },
      { id: 2, descripcion: "Cable calibre 12 (metros)", cantidad: 20, precioUnitario: 0.24, grabaIva: true },
    ],
  };

  calcularTotales = () => {
    const subtotal15 = this.state.productos.reduce(
      (sum, p) => sum + (p.grabaIva ? p.cantidad * p.precioUnitario : 0),
      0
    );
    const subtotal0 = this.state.productos.reduce(
      (sum, p) => sum + (!p.grabaIva ? p.cantidad * p.precioUnitario : 0),
      0
    );
    const iva = subtotal15 * 0.15;
    const total = subtotal15 + subtotal0 + iva;
    return { subtotal15, subtotal0, iva, total };
  };

  render() {
    const { subtotal15, subtotal0, iva, total } = this.calcularTotales();

    return (
      <div className="factura-container">
        <h2>Facturar</h2>
        
        <div className="form-group">
          <input type="text" placeholder="Cliente" />
          <input type="text" placeholder="Ci o RUC" />
        </div>
        
        <div className="form-group">
          <input type="email" placeholder="Email" />
          <input type="tel" placeholder="Teléfono" />
        </div>
        
        <div className="form-group">
          <input type="text" placeholder="Dirección" style={{ flex: 2 }} />
        </div>

        <div className="product-form">
          <input type="text" placeholder="Producto o Servicio" />
          <input type="number" placeholder="Cantidad" />
          <input type="text" placeholder="Precio Unitario" />
          <input type="text" placeholder="Precio Total" disabled />
          <input type="checkbox" /> Graba IVA
          <button className="add-button">+</button>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Producto o Servicio</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Precio Total</th>
              <th>Graba IVA</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.descripcion}</td>
                <td>{producto.cantidad}</td>
                <td>${producto.precioUnitario.toFixed(2)}</td>
                <td>${(producto.cantidad * producto.precioUnitario).toFixed(2)}</td>
                <td>{producto.grabaIva ? "Sí" : "No"}</td>
                <td>
                  <button className="delete-button">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="totals">
          <p>Subtotal 15%: ${subtotal15.toFixed(2)}</p>
          <p>Subtotal 0%: ${subtotal0.toFixed(2)}</p>
          <p>IVA 15%: ${iva.toFixed(2)}</p>
          <p>TOTAL: ${total.toFixed(2)}</p>
        </div>

        <div className="buttons">
          <button className="save-button">Guardar Venta</button>
          <button className="facturar-button">Facturar SRI</button>
        </div>
      </div>
    );
  }
}

export default Factura;
