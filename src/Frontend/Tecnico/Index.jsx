import React, { useState } from 'react';
import AppLayout from './Pedidos/Containers/Layout.jsx';
import Table from './Pedidos/Components/Table.jsx';

export default function Index() {
  // Gestionamos el estado de los pedidos
  const [pedidos, SetPedidos] = useState([
    { pedido: "Pe-uio-00000001", requerimiento: "Requerimiento de cambio de interruptor", rol: "Terminado" },
    { pedido: "Pe-gye-00000002", requerimiento: "puesta a tierra en edificio renacimiento", rol: "Solicitado" },
    { pedido: "Pe-cue-00000001", requerimiento: "cambio de cableado interno", rol: "En desarrollo" },
    { pedido: "Pe-ibr-00003546", requerimiento: "instalacion de salida 220", rol: "Terminado" }
  ]);

  return (
    <div className="section-container">
      <AppLayout>
        <Table pedidos={pedidos} SetPedidos={SetPedidos} />
      </AppLayout>
    </div>
  );
}
