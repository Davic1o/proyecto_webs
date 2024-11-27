import React, { useState } from "react";
import Swal from "sweetalert2";
import "./CrearVenta.css";

const CrearVenta = ({onCancel}) => {
  const [cliente, setCliente] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciRuc, setCiRuc] = useState("");
  const [telefono, setTelefono] = useState("");
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    descripcion: "",
    cantidad: 1,
    precioUnitario: 0,
    grabaIva: false,
  });

  const calcularTotales = () => {
    const subtotal15 = productos.reduce(
      (sum, p) => sum + (p.grabaIva ? p.cantidad * p.precioUnitario : 0),
      0
    );
    const subtotal0 = productos.reduce(
      (sum, p) => sum + (!p.grabaIva ? p.cantidad * p.precioUnitario : 0),
      0
    );
    const iva = subtotal15 * 0.15;
    const total = subtotal15 + subtotal0 + iva;
    return { subtotal15, subtotal0, iva, total };
  };

  const agregarProducto = () => {
    if (
      nuevoProducto.descripcion.trim() === "" ||
      nuevoProducto.cantidad <= 0 ||
      nuevoProducto.precioUnitario <= 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Completa todos los campos del producto correctamente.",
      });
      return;
    }
    setProductos([
      ...productos,
      { ...nuevoProducto, id: productos.length + 1 },
    ]);
    setNuevoProducto({ descripcion: "", cantidad: 1, precioUnitario: 0, grabaIva: false });
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const guardarVenta = (facturar = false) => {
    if (!cliente || !ciRuc || !email || !telefono || !direccion) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los datos del cliente antes de guardar la venta.",
      });
      return;
    }

    if (productos.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Agrega al menos un producto o servicio para generar la venta.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Venta registrada",
      text: facturar
        ? "La venta se ha facturado correctamente al SRI."
        : "La venta se ha guardado correctamente.",
    });

    // Reinicia los datos después de guardar
    setCliente("");
    setEmail("");
    setDireccion("");
    setCiRuc("");
    setTelefono("");
    setProductos([]);
  };

  const { subtotal15, subtotal0, iva, total } = calcularTotales();

  return (
    <div className="CrearVenta-container">
      <h2>Facturar</h2>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ci o RUC"
          value={ciRuc}
          onChange={(e) => setCiRuc(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Dirección"
          style={{ flex: 2 }}
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>

      <div className="product-form">
        <input
          type="text"
          placeholder="Producto o Servicio"
          value={nuevoProducto.descripcion}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={nuevoProducto.cantidad}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: parseInt(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Precio Unitario"
          value={nuevoProducto.precioUnitario}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precioUnitario: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Precio Total"
          value={(nuevoProducto.cantidad * nuevoProducto.precioUnitario).toFixed(2)}
          disabled
        />
        <input
          type="checkbox"
          checked={nuevoProducto.grabaIva}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, grabaIva: e.target.checked })}
        />
        Graba IVA
        <button className="add-button" onClick={agregarProducto}>+</button>
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
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.descripcion}</td>
              <td>{producto.cantidad}</td>
              <td>${producto.precioUnitario.toFixed(2)}</td>
              <td>${(producto.cantidad * producto.precioUnitario).toFixed(2)}</td>
              <td>{producto.grabaIva ? "Sí" : "No"}</td>
              <td>
                <button className="delete-button" onClick={() => eliminarProducto(producto.id)}>🗑️</button>
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
        <button className="save-button" onClick={() => guardarVenta(false)}>Guardar Venta</button>
        <button className="facturar-button" onClick={() => guardarVenta(true)}>Facturar SRI</button>
        <button className="cancelar-button"onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default CrearVenta;


