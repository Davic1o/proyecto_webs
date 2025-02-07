// Rutas.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../Frontend/Login/Index';
import Home from '../Frontend/Landing/Index';
import Register from '../Frontend/Register/Index';
import AdminUser from '../Frontend/Admin/Users/Index';
import AdminPedidos from '../Frontend/Admin/Pedidos/Index';
import TecnicoPedidos from '../Frontend/Tecnico/Index';
import ClientePedidos from '../Frontend/Cliente/Index';
import ClienteFacturacion from '../Frontend/Cliente/Facturacion'
import AdminFacturacion from '../Frontend/Admin/Facturacion/Index';
import Loading from '../Components/Loading'; 

export default function Rutas() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Cuando cambia la ubicación, mostramos el loading
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false); // Simula que la vista se carga después de 1 segundo
    }, 1000); // Ajusta el tiempo según lo que necesites

    return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta antes
  }, [location]); // Detecta el cambio de ubicación

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Admin-User" element={<AdminUser />} />
          <Route path="/Admin-Pedidos" element={<AdminPedidos />} />
          <Route path="/Admin-Facturacion" element={<AdminFacturacion />} />
          <Route path="/Tecnico-Pedidos/" element={<TecnicoPedidos />} />
          <Route path="/Cliente-Pedidos/" element={<ClientePedidos />} />
          <Route path="/Cliente-Facturacion/" element={<ClienteFacturacion />} />
        </Routes>
      )}
    </div>
  );
}
