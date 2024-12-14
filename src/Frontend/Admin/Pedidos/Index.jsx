import React, { useState } from 'react';
import AppLayout from '../Containers/Layout.jsx';
import Table from './Components/Table.jsx';
import '../Users/Components/Table.css';

export default function Index() {
  // Gestionamos el estado de los usuarios
  const [pedidos, setPedidos] = useState([
    {id:1, cliente: "David Vega", tecnico: "David Vega", trabajo: "Aprobado" },
    {id:2, cliente: "Ana López", tecnico: "David Vega",  trabajo: "Aprobado" },
    {id:3, cliente: "Carlos Pérez", tecnico: "David Vega",  trabajo: "Rechazado" },
    {id:4, cliente: "María Ruiz", tecnico: "David Vega",  trabajo: "Rechazado" }
  ]);

  return (
    <div className="section-container">
      <AppLayout>
        <Table pedidos={pedidos} setPedidos={setPedidos} />
      </AppLayout>
    </div>
  );
}
















