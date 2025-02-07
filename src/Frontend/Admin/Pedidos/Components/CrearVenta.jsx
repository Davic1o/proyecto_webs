import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../../Facturacion/Components/CrearVenta"

const CrearVenta = ({onCancel, pedido}) => {
  const [cliente, setCliente] = useState("");
  const [nombre,setNombre]=useState("")
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciRuc, setCiRuc] = useState("");
  const [telefono, setTelefono] = useState("");
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    descripcion: "",
    cantidad: 1,
    precio: 0,
    grabaIVA: false,
  });
  const [factura,setFactura]=useState("")
  const token =localStorage.getItem('token');
  useEffect(() => {
    
      if (pedido) {
        
        axios.get(`http://localhost:8000/users/byID/${pedido.cliente_id}`, {headers: {Authorization: `Bearer ${token}`}})
          .then(res=>{
            const clientePedido=res.data.data
            console.log("este es el cliente:" ,clientePedido)
            setCliente(res.data.data)
            
            setNombre(clientePedido.nombre)
            setCiRuc(clientePedido.RUC)
            setEmail(clientePedido.email)
            setDireccion(clientePedido.direccion)
            setTelefono(clientePedido.telefono)
          })
          .catch(error=>console.log(error))
      }
    }, [pedido,token]);

  const calcularTotales = () => {
    const subtotal15 = productos.reduce(
      (sum, p) => sum + (p.grabaIVA ? p.cantidad * p.precio : 0),
      0
    );
    const subtotal0 = productos.reduce(
      (sum, p) => sum + (!p.grabaIVA ? p.cantidad * p.precio : 0),
      0
    );
    const iva = subtotal15 * 0.15;
    const total = subtotal15 + subtotal0 + iva;
    return { subtotal15, subtotal0, iva, total };
  };
  const generarNumeroFacturacion=()=> {
    // Prefijo personalizado para identificar el sistema o la empresa
    const prefijo = "FAC";
  
    // Fecha en formato corto (año, mes, día)
    const fecha = new Date();
    const anio = fecha.getFullYear().toString().slice(-2);
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const dia = fecha.getDate().toString().padStart(2, "0");
  
    // Número aleatorio único
    const numeroUnico = Math.floor(1000 + Math.random() * 9000); // 4 dígitos aleatorios
  
    // Combinar partes para crear el número de facturación
    return `${prefijo}-${anio}${mes}${dia}-${numeroUnico}`;
  }
  const agregarProducto = () => {
    if (
      nuevoProducto.nombreServicio.trim() === "" ||
      nuevoProducto.cantidad <= 0 ||
      nuevoProducto.precio <= 0
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
      { ...nuevoProducto },
    ]);
    setNuevoProducto({ nombreServicio: "", cantidad: 1, precio: 0, grabaIVA: false });
    
  };

  const eliminarProducto = (productoE) => {
    setProductos(productos.filter((producto) => producto !== productoE));
  };

  const guardarVenta = (facturar = false) => {


    if (!nombre || !ciRuc || !email || !telefono || !direccion) {
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
    const nroFactura=generarNumeroFacturacion()
    const fecha=new Date()
    console.log(nombre)

    const facturaGenerada = {
      nombre,
      direccion,
      telefono,
      RUC: ciRuc,
      email,
      nroFactura,
      fecha,
      cliente_id: cliente._id,
      total: calcularTotales().total
};
  console.log("esta es la factura",factura)
    axios.post(`http://localhost:8000/facturas/`,facturaGenerada,{headers: {Authorization: `Bearer ${token}`}})
          .then(res=>{
            productos.forEach(servicio=>{
              axios.post(`http://localhost:8000/servicios/`,{
                nombreServicio: servicio.nombreServicio,
                cantidad: servicio.cantidad,
                precio: servicio.precio,
                grabaIVA: servicio.grabaIVA,
                factura_id: res.data.data._id
              },{headers: {Authorization: `Bearer ${token}`}})
              .then(res=>{
                Swal.fire({
                  icon: "success",
                  title: "Venta registrada",
                  text: facturar
                    ? "La venta se ha facturado correctamente al SRI."
                    : "La venta se ha guardado correctamente.",
                });
              })
              .catch(err=>console.log(err))
            })
          })
          .catch(error=>console.log(error))
    

    // Reinicia los datos después de guardar
    
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
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
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
          value={nuevoProducto.nombreServicio}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombreServicio: e.target.value })}
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
          value={nuevoProducto.precio}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Precio Total"
          value={(nuevoProducto.cantidad * nuevoProducto.precio).toFixed(2)}
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
            <tr key={producto._id}>
              <td>{producto.nombreServicio}</td>
              <td>{producto.cantidad}</td>
              <td>${producto.precio.toFixed(2)}</td>
              <td>${(producto.cantidad * producto.precio).toFixed(2)}</td>
              <td>{producto.grabaIva ? "Sí" : "No"}</td>
              <td>
                <button className="delete-button" onClick={() => eliminarProducto(producto)}>🗑️</button>
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