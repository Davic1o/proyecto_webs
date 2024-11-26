import React from 'react'
import AppLayout from '../Containers/Layout.jsx';
import Table from './Components/Table.jsx';

export default function Index() {

  const ventas =  [
    { cliente: "David Vega", factura: "001-002-000000989", valor: "$ 324,60", estado: "Autorizado" },
    { cliente: "David Vega", factura: "001-002-000000984", valor: "$ 324,60", estado: "Finalizado" },
    { cliente: "David Vega", factura: "001-002-000000978", valor: "$ 324,60", estado: "Autorizado" },
    { cliente: "David Vega", factura: "001-002-000000956", valor: "$ 324,60", estado: "Finalizado" },
  ]

  return (
    <div className="section-container">
    <AppLayout>
    <Table ventas={ventas} />
    </AppLayout>
      </div>
  )
};

