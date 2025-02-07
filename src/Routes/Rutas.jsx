// Rutas.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../Frontend/Login/Index';
import Home from '../Frontend/Landing/Home';
import Register from '../Frontend/Register/Index';
import AdminUser from '../Frontend/Admin/Users/Index';
import AdminPedidos from '../Frontend/Admin/Pedidos/Index';
import TecnicoPedidos from '../Frontend/Tecnico/Index';
import ClientePedidos from '../Frontend/Cliente/Index';
import ClienteFacturacion from '../Frontend/Cliente/Facturacion'
import AdminFacturacion from '../Frontend/Admin/Facturacion/Index';

import Nosotros from '../Frontend/Landing/Nosotros';
import Contacto from '../Frontend/Landing/Contacto';

export default function Rutas() {

  return (
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Nosotros" element={<Nosotros />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Admin-User" element={<AdminUser />} />
          <Route path="/Admin-Pedidos" element={<AdminPedidos />} />
          <Route path="/Admin-Facturacion" element={<AdminFacturacion />} />
          <Route path="/Tecnico-Pedidos/" element={<TecnicoPedidos />} />
          <Route path="/Cliente-Pedidos/" element={<ClientePedidos />} />
          <Route path="/Cliente-Facturacion/" element={<ClienteFacturacion />} />
        </Routes>
      )
    }
    


